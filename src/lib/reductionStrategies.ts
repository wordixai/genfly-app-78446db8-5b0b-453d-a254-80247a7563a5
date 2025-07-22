import { ReductionStrategy } from '../types/carbon';

export const reductionStrategies: ReductionStrategy[] = [
  // Transportation strategies
  {
    id: 'public-transport',
    category: 'transportation',
    title: 'Use Public Transportation',
    description: 'Replace car trips with bus, train, or subway when possible',
    impact: 'high',
    difficulty: 'easy',
    potentialReduction: 2300,
    icon: '🚌'
  },
  {
    id: 'bike-walk',
    category: 'transportation',
    title: 'Bike or Walk More',
    description: 'Replace short car trips with walking or cycling',
    impact: 'medium',
    difficulty: 'easy',
    potentialReduction: 1200,
    icon: '🚲'
  },
  {
    id: 'electric-vehicle',
    category: 'transportation',
    title: 'Switch to Electric Vehicle',
    description: 'Consider an electric or hybrid vehicle for your next car',
    impact: 'high',
    difficulty: 'hard',
    potentialReduction: 3500,
    icon: '⚡'
  },
  {
    id: 'reduce-flights',
    category: 'transportation',
    title: 'Reduce Air Travel',
    description: 'Choose virtual meetings or local vacations when possible',
    impact: 'high',
    difficulty: 'medium',
    potentialReduction: 2800,
    icon: '✈️'
  },
  
  // Home energy strategies
  {
    id: 'led-bulbs',
    category: 'homeEnergy',
    title: 'Switch to LED Bulbs',
    description: 'Replace incandescent bulbs with energy-efficient LEDs',
    impact: 'low',
    difficulty: 'easy',
    potentialReduction: 180,
    icon: '💡'
  },
  {
    id: 'smart-thermostat',
    category: 'homeEnergy',
    title: 'Install Smart Thermostat',
    description: 'Optimize heating and cooling with programmable controls',
    impact: 'medium',
    difficulty: 'medium',
    potentialReduction: 900,
    icon: '🌡️'
  },
  {
    id: 'insulation',
    category: 'homeEnergy',
    title: 'Improve Home Insulation',
    description: 'Add insulation to reduce heating and cooling needs',
    impact: 'high',
    difficulty: 'hard',
    potentialReduction: 1800,
    icon: '🏠'
  },
  {
    id: 'solar-panels',
    category: 'homeEnergy',
    title: 'Install Solar Panels',
    description: 'Generate clean electricity from solar energy',
    impact: 'high',
    difficulty: 'hard',
    potentialReduction: 4200,
    icon: '☀️'
  },
  {
    id: 'energy-efficient-appliances',
    category: 'homeEnergy',
    title: 'Energy Star Appliances',
    description: 'Choose ENERGY STAR certified appliances',
    impact: 'medium',
    difficulty: 'medium',
    potentialReduction: 650,
    icon: '📱'
  },
  
  // Lifestyle strategies
  {
    id: 'plant-based-diet',
    category: 'lifestyle',
    title: 'Eat More Plant-Based Meals',
    description: 'Reduce meat consumption, especially beef and lamb',
    impact: 'high',
    difficulty: 'medium',
    potentialReduction: 1400,
    icon: '🥬'
  },
  {
    id: 'local-seasonal-food',
    category: 'lifestyle',
    title: 'Buy Local & Seasonal',
    description: 'Choose locally grown, seasonal produce',
    impact: 'medium',
    difficulty: 'easy',
    potentialReduction: 420,
    icon: '🌱'
  },
  {
    id: 'reduce-food-waste',
    category: 'lifestyle',
    title: 'Reduce Food Waste',
    description: 'Plan meals and compost organic waste',
    impact: 'medium',
    difficulty: 'easy',
    potentialReduction: 380,
    icon: '🗑️'
  },
  {
    id: 'buy-less-stuff',
    category: 'lifestyle',
    title: 'Mindful Consumption',
    description: 'Buy only what you need and choose quality over quantity',
    impact: 'medium',
    difficulty: 'medium',
    potentialReduction: 800,
    icon: '🛍️'
  },
  {
    id: 'repair-reuse',
    category: 'lifestyle',
    title: 'Repair & Reuse',
    description: 'Fix items instead of replacing them',
    impact: 'low',
    difficulty: 'easy',
    potentialReduction: 240,
    icon: '🔧'
  }
];

export function getRecommendedStrategies(
  totalEmissions: number,
  categories: any[]
): ReductionStrategy[] {
  // Sort categories by emissions to prioritize improvements
  const sortedCategories = [...categories].sort((a, b) => b.emissions - a.emissions);
  
  const recommendations: ReductionStrategy[] = [];
  
  // Add strategies based on highest emission categories
  sortedCategories.forEach(category => {
    const categoryStrategies = reductionStrategies
      .filter(strategy => strategy.category === category.id)
      .sort((a, b) => {
        // Prioritize by impact and ease of implementation
        const impactScore = { high: 3, medium: 2, low: 1 };
        const difficultyScore = { easy: 3, medium: 2, hard: 1 };
        
        const scoreA = impactScore[a.impact] + difficultyScore[a.difficulty];
        const scoreB = impactScore[b.impact] + difficultyScore[b.difficulty];
        
        return scoreB - scoreA;
      });
    
    recommendations.push(...categoryStrategies.slice(0, 3)); // Top 3 per category
  });
  
  return recommendations.slice(0, 8); // Return top 8 recommendations
}