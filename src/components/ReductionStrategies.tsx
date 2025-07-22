import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingDown } from 'lucide-react';
import { ReductionStrategy } from '@/types/carbon';

interface ReductionStrategiesProps {
  strategies: ReductionStrategy[];
}

const ReductionStrategies: React.FC<ReductionStrategiesProps> = ({ strategies }) => {
  const totalPotentialReduction = strategies.reduce((sum, strategy) => sum + strategy.potentialReduction, 0);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-eco-100 text-eco-800';
      case 'medium': return 'bg-ocean-100 text-ocean-800';
      case 'hard': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transportation': return '🚗';
      case 'homeEnergy': return '🏠';
      case 'lifestyle': return '🍽️';
      default: return '💡';
    }
  };

  return (
    <Card className="glass-effect">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-eco-600" />
          <div>
            <CardTitle className="text-2xl">Reduction Strategies</CardTitle>
            <p className="text-gray-600 mt-1">
              Personalized recommendations to reduce your carbon footprint
            </p>
          </div>
        </div>
        <div className="bg-eco-50 rounded-lg p-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-5 w-5 text-eco-600" />
            <span className="font-semibold text-eco-800">Potential Impact</span>
          </div>
          <div className="text-2xl font-bold text-eco-800 mb-1">
            {totalPotentialReduction.toLocaleString()} kg CO₂/year
          </div>
          <p className="text-sm text-eco-700">
            Implementing all strategies could reduce your footprint significantly
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {strategies.map((strategy) => (
            <Card key={strategy.id} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl">{strategy.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{strategy.title}</h3>
                      <span className="text-sm">
                        {getCategoryIcon(strategy.category)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">
                      {strategy.description}
                    </p>

                    <div className="flex gap-2 mb-3">
                      <Badge className={getImpactColor(strategy.impact)}>
                        {strategy.impact} impact
                      </Badge>
                      <Badge className={getDifficultyColor(strategy.difficulty)}>
                        {strategy.difficulty}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Potential reduction</span>
                        <span className="font-semibold text-eco-700">
                          {strategy.potentialReduction} kg CO₂/year
                        </span>
                      </div>
                      <Progress 
                        value={(strategy.potentialReduction / Math.max(...strategies.map(s => s.potentialReduction))) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReductionStrategies;