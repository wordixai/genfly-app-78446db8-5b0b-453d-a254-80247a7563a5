import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, Bus, Plane } from 'lucide-react';
import { TransportationData } from '@/types/carbon';

interface TransportationFormProps {
  data: TransportationData;
  onChange: (data: Partial<TransportationData>) => void;
}

const TransportationForm: React.FC<TransportationFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Car className="h-16 w-16 mx-auto text-eco-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Transportation</h3>
        <p className="text-gray-600">
          Tell us about your daily commute and travel habits
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Car Usage */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Car className="h-5 w-5" />
              Personal Vehicle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="carMiles">Miles driven per year</Label>
              <Input
                id="carMiles"
                type="number"
                value={data.carMiles || ''}
                onChange={(e) => onChange({ carMiles: Number(e.target.value) })}
                placeholder="e.g., 12000"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Average US driver: ~13,500 miles/year
              </p>
            </div>

            <div>
              <Label htmlFor="fuelType">Fuel Type</Label>
              <Select
                value={data.fuelType}
                onValueChange={(value: any) => onChange({ fuelType: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gasoline">Gasoline</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Public Transportation */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bus className="h-5 w-5" />
              Public Transportation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="publicTransport">Miles per year on public transport</Label>
              <Input
                id="publicTransport"
                type="number"
                value={data.publicTransportMiles || ''}
                onChange={(e) => onChange({ publicTransportMiles: Number(e.target.value) })}
                placeholder="e.g., 2000"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Include bus, train, subway, etc.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Air Travel */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Air Travel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-md">
              <Label htmlFor="flights">Flight hours per year</Label>
              <Input
                id="flights"
                type="number"
                value={data.flightHours || ''}
                onChange={(e) => onChange({ flightHours: Number(e.target.value) })}
                placeholder="e.g., 24"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Round trip coast-to-coast: ~10 hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransportationForm;