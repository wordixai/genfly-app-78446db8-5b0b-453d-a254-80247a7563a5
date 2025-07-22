import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, TrendingDown, Globe, Flag } from 'lucide-react';
import { CarbonResult } from '@/types/carbon';
import { getCarbonFootprintLevel } from '@/lib/carbonCalculator';
import { getRecommendedStrategies } from '@/lib/reductionStrategies';
import EmissionsPieChart from './charts/EmissionsPieChart';
import ReductionStrategies from './ReductionStrategies';

interface ResultsDisplayProps {
  results: CarbonResult;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, onReset }) => {
  const { level, color, message } = getCarbonFootprintLevel(results.totalEmissions);
  const strategies = getRecommendedStrategies(results.totalEmissions, results.categories);

  return (
    <div className="min-h-screen bg-eco-gradient-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Your Carbon Footprint Results
            </h1>
            <p className="text-gray-600">
              Here's your environmental impact and ways to improve it
            </p>
          </div>
          <Button onClick={onReset} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Recalculate
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Main Results */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-xl">Annual Carbon Footprint</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-4xl font-bold text-gray-800">
                      {Math.round(results.totalEmissions).toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-600">kg CO₂ per year</div>
                  </div>
                  
                  <Badge className={`${color} text-lg px-4 py-2`}>
                    {level}
                  </Badge>
                  
                  <p className="text-gray-600 max-w-md mx-auto">
                    {message}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Comparison */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-xl">How You Compare</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flag className="h-5 w-5 text-blue-600" />
                      <span>US Average</span>
                    </div>
                    <span className="font-semibold">
                      {results.comparisonData.nationalAverage.toLocaleString()} kg CO₂
                    </span>
                  </div>
                  <Progress 
                    value={(results.totalEmissions / results.comparisonData.nationalAverage) * 100} 
                    className="h-3"
                  />
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    {results.totalEmissions < results.comparisonData.nationalAverage ? (
                      <>
                        <TrendingDown className="h-4 w-4 text-green-600" />
                        {Math.round(((results.comparisonData.nationalAverage - results.totalEmissions) / results.comparisonData.nationalAverage) * 100)}% below average
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-4 w-4 text-red-600" />
                        {Math.round(((results.totalEmissions - results.comparisonData.nationalAverage) / results.comparisonData.nationalAverage) * 100)}% above average
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-eco-600" />
                      <span>Global Average</span>
                    </div>
                    <span className="font-semibold">
                      {results.comparisonData.globalAverage.toLocaleString()} kg CO₂
                    </span>
                  </div>
                  <Progress 
                    value={(results.totalEmissions / results.comparisonData.globalAverage) * 100} 
                    className="h-3"
                  />
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    {results.totalEmissions < results.comparisonData.globalAverage ? (
                      <>
                        <TrendingDown className="h-4 w-4 text-green-600" />
                        {Math.round(((results.comparisonData.globalAverage - results.totalEmissions) / results.comparisonData.globalAverage) * 100)}% below average
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-4 w-4 text-red-600" />
                        {Math.round(((results.totalEmissions - results.comparisonData.globalAverage) / results.comparisonData.globalAverage) * 100)}% above average
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emission Breakdown */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-xl">Emissions Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.categories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{category.icon}</span>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            {Math.round(category.emissions).toLocaleString()} kg CO₂
                          </div>
                          <div className="text-sm text-gray-600">
                            {Math.round(category.percentage)}%
                          </div>
                        </div>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Pie Chart */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-xl">Visual Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <EmissionsPieChart data={results.categories} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reduction Strategies */}
        <div className="mt-12">
          <ReductionStrategies strategies={strategies} />
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;