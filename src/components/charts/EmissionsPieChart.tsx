import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { EmissionCategory } from '@/types/carbon';

interface EmissionsPieChartProps {
  data: EmissionCategory[];
}

const COLORS = {
  transportation: '#059669',
  homeEnergy: '#0891b2',
  lifestyle: '#0e7490'
};

const EmissionsPieChart: React.FC<EmissionsPieChartProps> = ({ data }) => {
  const chartData = data.map(category => ({
    name: category.name,
    value: Math.round(category.emissions),
    percentage: Math.round(category.percentage),
    icon: category.icon
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{data.payload.icon}</span>
            <span className="font-semibold">{data.payload.name}</span>
          </div>
          <div className="space-y-1 text-sm">
            <div>{data.value.toLocaleString()} kg CO₂</div>
            <div>{data.payload.percentage}% of total</div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, icon }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        className="text-2xl" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {icon}
      </text>
    );
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[data[index].id as keyof typeof COLORS]} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry: any) => (
              <span style={{ color: entry.color }}>
                {entry.payload.icon} {value} ({entry.payload.percentage}%)
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmissionsPieChart;