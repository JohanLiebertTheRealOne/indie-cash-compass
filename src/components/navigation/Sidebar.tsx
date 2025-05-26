
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  DollarSign, 
  Receipt, 
  Calculator, 
  FileText, 
  Settings,
  Menu,
  X
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Revenus", href: "/revenus", icon: DollarSign },
  { name: "Dépenses", href: "/depenses", icon: Receipt },
  { name: "Fiscalité", href: "/fiscalite", icon: Calculator },
  { name: "Factures", href: "/factures", icon: FileText },
  { name: "Paramètres", href: "/parametres", icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-blue-600">GigFinance</h1>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className={cn(
              "w-full justify-start",
              isCollapsed ? "px-2" : "px-4"
            )}
          >
            <item.icon className="h-5 w-5" />
            {!isCollapsed && (
              <span className="ml-3">{item.name}</span>
            )}
          </Button>
        ))}
      </nav>
    </div>
  );
}
