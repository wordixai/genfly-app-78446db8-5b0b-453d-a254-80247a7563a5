import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, Zap, Flame, Users } from 'lucide-react';
import { HomeEnergyData } from '@/types/carbon';

interface HomeEnergyFormProps {
  data: HomeEnergyData;
  onChange: (data: Partial<HomeEnergyData>) => void;
}

const HomeEnergyForm: React.FC<HomeEnergyFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Home className="h-16 w-16 mx-auto text-eco-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Home Energy</h3>
        <p className="text-gray-600">
          Information about your home's energy consumption
        </p>
      </div>

      {/* Household Info */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Household Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="householdSize">Number of people in household</Label>
            <Input
              id="householdSize"
              type="number"
              min="1"
              value={data.householdSize || ''}
              onChange={(e) => onChange({ householdSize: Number(e.target.value) })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="homeSize">Home size</Label>
            <Select
              value={data.homeSize}
              onValueChange={(value: any) => onChange({ homeSize: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (< 1,500 sq ft)</SelectItem>
                <SelectItem value="medium">Medium (1,500-2,500 sq ft)</SelectItem>
                <SelectItem value="large">Large (> 2,500 sq ft)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Electricity */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Electricity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="electricity">Monthly kWh usage</Label>
              <Input
                id="electricity"
                type="number"
                value={data.electricityKwh || ''}
                onChange={(e) => onChange({ electricityKwh: Number(e.target.value) })}
                placeholder="e.g., 900"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Check your utility bill. US average: ~900 kWh/month
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Natural Gas */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Flame className="h-5 w-5" />
              Natural Gas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="naturalGas">Monthly therms</Label>
              <Input
                id="naturalGas"
                type="number"
                value={data.naturalGasTherm || ''}
                onChange={(e) => onChange({ naturalGasTherm: Number(e.target.value) })}
                placeholder="e.g., 75"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                For heating, cooking, hot water
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Heating Oil */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Heating Oil</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="heatingOil">Annual gallons</Label>
              <Input
                id="heatingOil"
                type="number"
                value={data.heatingOilGallons || ''}
                onChange={(e) => onChange({ heatingOilGallons: Number(e.target.value) })}
                placeholder="e.g., 800"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                If applicable (mainly northeastern US)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Propane */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Propane</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="propane">Annual gallons</Label>
              <Input
                id="propane"
                type="number"
                value={data.propaneGallons || ''}
                onChange={(e) => onChange({ propaneGallons: Number(e.target.value) })}
                placeholder="e.g., 200"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                For grills, heating, hot water
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeEnergyForm;