
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Upload, Check } from "lucide-react";

interface ExpenseFormProps {
  onSubmit: (expense: any) => void;
}

export function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    receipt: null as File | null
  });

  const [isProcessingOCR, setIsProcessingOCR] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFormData(prev => ({ ...prev, receipt: file }));
    setIsProcessingOCR(true);

    // Simulation OCR
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        amount: "24.99",
        description: "Essence - Station Shell",
        category: "transport"
      }));
      setIsProcessingOCR(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Ajouter une dépense</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="amount">Montant (€)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0.00"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Catégorie</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="materiel">Matériel</SelectItem>
                <SelectItem value="formation">Formation</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="bureau">Bureau</SelectItem>
                <SelectItem value="autres">Autres</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Description de la dépense"
            required
          />
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Reçu / Facture</Label>
          <div className="flex gap-2">
            <label className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button type="button" variant="outline" className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                Prendre une photo
              </Button>
            </label>
            
            <label className="flex-1">
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button type="button" variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </label>
          </div>
          
          {isProcessingOCR && (
            <div className="text-sm text-blue-600 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Analyse du reçu en cours...
            </div>
          )}
          
          {formData.receipt && !isProcessingOCR && (
            <div className="text-sm text-green-600 flex items-center">
              <Check className="h-4 w-4 mr-2" />
              Reçu analysé et données extraites
            </div>
          )}
        </div>

        <Button type="submit" className="w-full">
          Ajouter la dépense
        </Button>
      </form>
    </Card>
  );
}
