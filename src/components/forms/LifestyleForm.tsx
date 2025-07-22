import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Utensils, ShoppingBag, Recycle } from 'lucide-react';
import { LifestyleData } from '@/types/carbon';

interface LifestyleFormProps {
  data: LifestyleData;
  onChange: (data: Partial<LifestyleData>) => void;
}

const LifestyleForm: React.FC<LifestyleFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Utensils className="h-16 w-16 mx-auto text-eco-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Diet & Lifestyle</h3>
        <p className="text-gray-600">
          Your consumption habits and lifestyle choices
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Diet */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Diet & Food
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="diet">Meat consumption level</Label>
              <Select
                value={data.meatConsumption}
                onValueChange={(value: any) => onChange({ meatConsumption: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High (meat daily)</SelectItem>
                  <SelectItem value="medium">Medium (meat few times/week)</SelectItem>
                  <SelectItem value="low">Low (meat occasionally)</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                Beef and lamb have the highest carbon footprint
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Shopping */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Shopping Habits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="shopping">Shopping frequency</Label>
              <Select
                value={data.shoppingHabits}
                onValueChange={(value: any) => onChange({ shoppingHabits: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High (frequent new purchases)</SelectItem>
                  <SelectItem value="medium">Medium (moderate consumption)</SelectItem>
                  <SelectItem value="low">Low (buy only necessities)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                Consider clothes, electronics, furniture, etc.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Practices */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Recycle className="h-5 w-5" />
            Environmental Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="recycling">Regular recycling</Label>
              <p className="text-sm text-gray-500">
                Do you regularly recycle paper, plastic, glass, and metal?
              </p>
            </div>
            <Switch
              id="recycling"
              checked={data.recycling}
              onCheckedChange={(checked) => onChange({ recycling: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="composting">Composting</Label>
              <p className="text-sm text-gray-500">
                Do you compost food scraps and organic waste?
              </p>
            </div>
            <Switch
              id="composting"
              checked={data.composting}
              onCheckedChange={(checked) => onChange({ composting: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="wasteReduction">Waste reduction efforts</Label>
              <p className="text-sm text-gray-500">
                Do you actively try to reduce waste (reusable bags, containers, etc.)?
              </p>
            </div>
            <Switch
              id="wasteReduction"
              checked={data.wasteReduction}
              onCheckedChange={(checked) => onChange({ wasteReduction: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LifestyleForm;