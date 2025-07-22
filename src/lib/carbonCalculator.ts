import { CarbonFootprintData, CarbonResult, EmissionCategory } from '../types/carbon';

// Emission factors (kg CO2 per unit)
const EMISSION_FACTORS = {
  // Transportation (kg CO2 per mile)
  gasoline: 0.89,
  diesel: 1.02,
  hybrid: 0.55,
  electric: 0.15,
  publicTransport: 0.33,
  flight: 0.82, // kg CO2 per mile (estimated from flight hours)
  
  // Energy (kg CO2 per unit)
  electricity: 0.92, // per kWh
  naturalGas: 5.3, // per therm
  heatingOil: 10.15, // per gallon
  propane: 5.75, // per gallon
  
  // Lifestyle (annual kg CO2)
  diet: {
    high: 1800,
    medium: 1200,
    low: 800,
    vegetarian: 600,
    vegan: 400
  },
  shopping: {
    high: 2400,
    medium: 1200,
    low: 600
  }
};

export function calculateCarbonFootprint(data: CarbonFootprintData): CarbonResult {
  // Transportation calculations
  const carEmissions = data.transportation.carMiles * EMISSION_FACTORS[data.transportation.fuelType];
  const publicTransportEmissions = data.transportation.publicTransportMiles * EMISSION_FACTORS.publicTransport;
  const flightEmissions = data.transportation.flightHours * 600 * EMISSION_FACTORS.flight; // approximate miles per flight hour
  const totalTransportation = carEmissions + publicTransportEmissions + flightEmissions;

  // Home energy calculations
  const electricityEmissions = data.homeEnergy.electricityKwh * EMISSION_FACTORS.electricity;
  const gasEmissions = data.homeEnergy.naturalGasTherm * EMISSION_FACTORS.naturalGas;
  const oilEmissions = data.homeEnergy.heatingOilGallons * EMISSION_FACTORS.heatingOil;
  const propaneEmissions = data.homeEnergy.propaneGallons * EMISSION_FACTORS.propane;
  
  // Adjust for household size
  const householdAdjustment = data.homeEnergy.householdSize > 1 ? data.homeEnergy.householdSize * 0.7 : 1;
  const totalHomeEnergy = (electricityEmissions + gasEmissions + oilEmissions + propaneEmissions) / householdAdjustment;

  // Lifestyle calculations
  const dietEmissions = EMISSION_FACTORS.diet[data.lifestyle.meatConsumption];
  const shoppingEmissions = EMISSION_FACTORS.shopping[data.lifestyle.shoppingHabits];
  
  // Apply reduction factors
  let lifestyleReduction = 1;
  if (data.lifestyle.wasteReduction) lifestyleReduction -= 0.1;
  if (data.lifestyle.recycling) lifestyleReduction -= 0.05;
  if (data.lifestyle.composting) lifestyleReduction -= 0.05;
  
  const totalLifestyle = (dietEmissions + shoppingEmissions) * lifestyleReduction;

  // Calculate totals
  const totalEmissions = totalTransportation + totalHomeEnergy + totalLifestyle;
  
  const categories: EmissionCategory[] = [
    {
      id: 'transportation',
      name: 'Transportation',
      icon: '🚗',
      description: 'Car, public transport, and flights',
      emissions: totalTransportation,
      percentage: (totalTransportation / totalEmissions) * 100
    },
    {
      id: 'homeEnergy',
      name: 'Home Energy',
      icon: '🏠',
      description: 'Electricity, gas, and heating',
      emissions: totalHomeEnergy,
      percentage: (totalHomeEnergy / totalEmissions) * 100
    },
    {
      id: 'lifestyle',
      name: 'Diet & Lifestyle',
      icon: '🍽️',
      description: 'Food choices and consumption',
      emissions: totalLifestyle,
      percentage: (totalLifestyle / totalEmissions) * 100
    }
  ];

  return {
    totalEmissions,
    categories,
    comparisonData: {
      nationalAverage: 16000, // US average kg CO2 per year
      globalAverage: 4800 // Global average kg CO2 per year
    }
  };
}

export function getCarbonFootprintLevel(emissions: number): {
  level: string;
  color: string;
  message: string;
} {
  if (emissions < 5000) {
    return {
      level: 'Excellent',
      color: 'text-eco-600',
      message: 'Your carbon footprint is well below the global average!'
    };
  } else if (emissions < 10000) {
    return {
      level: 'Good',
      color: 'text-eco-500',
      message: 'Your footprint is below the national average, but there\'s room for improvement.'
    };
  } else if (emissions < 20000) {
    return {
      level: 'Average',
      color: 'text-orange-500',
      message: 'Your footprint is around the national average. Consider reducing emissions.'
    };
  } else {
    return {
      level: 'High',
      color: 'text-red-500',
      message: 'Your footprint is above average. Significant reduction strategies needed.'
    };
  }
}