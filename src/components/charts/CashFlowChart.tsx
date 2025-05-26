
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { month: "Jan", income: 3200, expenses: 1800, net: 1400 },
  { month: "Fév", income: 3800, expenses: 2100, net: 1700 },
  { month: "Mar", income: 4200, expenses: 2300, net: 1900 },
  { month: "Avr", income: 3900, expenses: 2000, net: 1900 },
  { month: "Mai", income: 4500, expenses: 2400, net: 2100 },
  { month: "Jun", income: 4100, expenses: 2200, net: 1900 },
];

export function CashFlowChart() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Évolution de la trésorerie</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [`${value}€`, '']}
            labelFormatter={(label) => `Mois: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="income" 
            stroke="#10b981" 
            strokeWidth={3}
            name="Revenus"
          />
          <Line 
            type="monotone" 
            dataKey="expenses" 
            stroke="#f59e0b" 
            strokeWidth={3}
            name="Dépenses"
          />
          <Line 
            type="monotone" 
            dataKey="net" 
            stroke="#3b82f6" 
            strokeWidth={3}
            name="Net"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
