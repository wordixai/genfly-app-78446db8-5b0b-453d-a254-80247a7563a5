export interface EmissionCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  percentage: number;
  emissions: number;
}

export interface TransportationData {
  carMiles: number;
  fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric';
  publicTransportMiles: number;
  flightHours: number;
}

export interface HomeEnergyData {
  electricityKwh: number;
  naturalGasTherm: number;
  heatingOilGallons: number;
  propaneGallons: number;
  householdSize: number;
  homeSize: 'small' | 'medium' | 'large';
}

export interface LifestyleData {
  meatConsumption: 'high' | 'medium' | 'low' | 'vegetarian' | 'vegan';
  shoppingHabits: 'high' | 'medium' | 'low';
  wasteReduction: boolean;
  recycling: boolean;
  composting: boolean;
}

export interface CarbonFootprintData {
  transportation: TransportationData;
  homeEnergy: HomeEnergyData;
  lifestyle: LifestyleData;
}

export interface CarbonResult {
  totalEmissions: number;
  categories: EmissionCategory[];
  comparisonData: {
    nationalAverage: number;
    globalAverage: number;
  };
}

export interface ReductionStrategy {
  id: string;
  category: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  potentialReduction: number;
  icon: string;
}