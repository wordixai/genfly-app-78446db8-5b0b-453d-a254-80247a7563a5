import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, Home, Utensils, Leaf } from 'lucide-react';
import { CarbonFootprintData, CarbonResult } from '@/types/carbon';
import { calculateCarbonFootprint } from '@/lib/carbonCalculator';
import TransportationForm from './forms/TransportationForm';
import HomeEnergyForm from './forms/HomeEnergyForm';
import LifestyleForm from './forms/LifestyleForm';
import ResultsDisplay from './ResultsDisplay';

const initialData: CarbonFootprintData = {
  transportation: {
    carMiles: 0,
    fuelType: 'gasoline',
    publicTransportMiles: 0,
    flightHours: 0
  },
  homeEnergy: {
    electricityKwh: 0,
    naturalGasTherm: 0,
    heatingOilGallons: 0,
    propaneGallons: 0,
    householdSize: 1,
    homeSize: 'medium'
  },
  lifestyle: {
    meatConsumption: 'medium',
    shoppingHabits: 'medium',
    wasteReduction: false,
    recycling: false,
    composting: false
  }
};

const CarbonCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('transportation');
  const [formData, setFormData] = useState<CarbonFootprintData>(initialData);
  const [results, setResults] = useState<CarbonResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const updateFormData = (section: keyof CarbonFootprintData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleCalculate = () => {
    const calculatedResults = calculateCarbonFootprint(formData);
    setResults(calculatedResults);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setFormData(initialData);
    setResults(null);
    setShowResults(false);
    setActiveTab('transportation');
  };

  if (showResults && results) {
    return <ResultsDisplay results={results} onReset={resetCalculator} />;
  }

  return (
    <div className="min-h-screen bg-eco-gradient-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-12 w-12 text-eco-600 mr-3 animate-float" />
            <h1 className="text-4xl font-bold text-gray-800">
              Carbon Footprint Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your personal carbon footprint and discover ways to reduce your environmental impact.
            Complete each section to get your personalized assessment.
          </p>
        </div>

        {/* Main Calculator */}
        <Card className="max-w-4xl mx-auto glass-effect">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-800">
              Calculate Your Carbon Footprint
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="transportation" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Transportation
                </TabsTrigger>
                <TabsTrigger value="homeEnergy" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home Energy
                </TabsTrigger>
                <TabsTrigger value="lifestyle" className="flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  Diet & Lifestyle
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transportation" className="space-y-6">
                <TransportationForm
                  data={formData.transportation}
                  onChange={(data) => updateFormData('transportation', data)}
                />
              </TabsContent>

              <TabsContent value="homeEnergy" className="space-y-6">
                <HomeEnergyForm
                  data={formData.homeEnergy}
                  onChange={(data) => updateFormData('homeEnergy', data)}
                />
              </TabsContent>

              <TabsContent value="lifestyle" className="space-y-6">
                <LifestyleForm
                  data={formData.lifestyle}
                  onChange={(data) => updateFormData('lifestyle', data)}
                />
              </TabsContent>
            </Tabs>

            {/* Navigation and Calculate */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <div className="flex gap-2">
                {activeTab !== 'transportation' && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (activeTab === 'homeEnergy') setActiveTab('transportation');
                      if (activeTab === 'lifestyle') setActiveTab('homeEnergy');
                    }}
                  >
                    Previous
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                {activeTab !== 'lifestyle' ? (
                  <Button
                    onClick={() => {
                      if (activeTab === 'transportation') setActiveTab('homeEnergy');
                      if (activeTab === 'homeEnergy') setActiveTab('lifestyle');
                    }}
                    className="bg-eco-gradient text-white"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleCalculate}
                    className="bg-eco-gradient text-white px-8"
                  >
                    Calculate My Footprint
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarbonCalculator;