
import { useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { CashFlowChart } from "@/components/charts/CashFlowChart";
import { ExpenseForm } from "@/components/forms/ExpenseForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Receipt, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  FileText,
  Bell
} from "lucide-react";

const Index = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const handleAddExpense = (expense: any) => {
    console.log("Nouvelle dépense:", expense);
    setShowExpenseForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Bienvenue sur votre tableau de bord financier</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button onClick={() => setShowExpenseForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une dépense
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <DashboardCard
            title="Revenus ce mois"
            value="4 100€"
            subtitle="vs mois dernier"
            icon={<DollarSign />}
            trend={{ value: 12.5, isPositive: true }}
            className="border-l-4 border-l-green-500"
          />
          
          <DashboardCard
            title="Dépenses ce mois"
            value="2 200€"
            subtitle="vs mois dernier"
            icon={<Receipt />}
            trend={{ value: 8.2, isPositive: false }}
            className="border-l-4 border-l-orange-500"
          />
          
          <DashboardCard
            title="Bénéfice net"
            value="1 900€"
            subtitle="Marge: 46.3%"
            icon={<TrendingUp />}
            trend={{ value: 15.3, isPositive: true }}
            className="border-l-4 border-l-blue-500"
          />
          
          <DashboardCard
            title="Estimation fiscale"
            value="580€"
            subtitle="À provisionner"
            icon={<AlertTriangle />}
            className="border-l-4 border-l-red-500"
          />
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CashFlowChart />
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
            <div className="space-y-3">
              {[
                { type: "income", amount: 45.50, description: "Course Uber - 14h30", time: "Il y a 2h" },
                { type: "expense", amount: 24.99, description: "Essence - Station Shell", time: "Il y a 4h" },
                { type: "income", amount: 32.00, description: "Livraison Deliveroo", time: "Hier" },
                { type: "expense", amount: 15.90, description: "Parking centre-ville", time: "Hier" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.type === 'income' ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <div>
                      <p className="font-medium">{item.description}</p>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                  </div>
                  <div className={`font-semibold ${item.type === 'income' ? 'text-green-600' : 'text-orange-600'}`}>
                    {item.type === 'income' ? '+' : '-'}{item.amount}€
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Alerts & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <Bell className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Rappels fiscaux</h3>
            </div>
            <p className="text-blue-800 mb-3">Déclaration TVA due dans 5 jours</p>
            <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
              Voir les détails
            </Button>
          </Card>

          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Facturation</h3>
            </div>
            <p className="text-green-800 mb-3">3 factures en attente d'envoi</p>
            <Button size="sm" variant="outline" className="border-green-300 text-green-700">
              Générer les factures
            </Button>
          </Card>

          <Card className="p-6 bg-orange-50 border-orange-200">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-orange-900">Objectifs</h3>
            </div>
            <p className="text-orange-800 mb-3">82% de l'objectif mensuel atteint</p>
            <Button size="sm" variant="outline" className="border-orange-300 text-orange-700">
              Voir les détails
            </Button>
          </Card>
        </div>

        {/* Expense Form Modal */}
        {showExpenseForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Nouvelle dépense</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowExpenseForm(false)}
                >
                  ×
                </Button>
              </div>
              <ExpenseForm onSubmit={handleAddExpense} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
