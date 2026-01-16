import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, TrendingUp } from "lucide-react";

export default function ExpenseTracking() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    taxDeductible: true,
  });

  const mockExpenses = [
    {
      id: 1,
      category: "Equipment",
      description: "Power drill and bits",
      amount: 250,
      date: "2024-01-15",
      taxDeductible: true,
      profitImpact: -250,
    },
    {
      id: 2,
      category: "Materials",
      description: "Lumber and hardware",
      amount: 1200,
      date: "2024-01-10",
      taxDeductible: true,
      profitImpact: -1200,
    },
    {
      id: 3,
      category: "Transportation",
      description: "Gas and vehicle maintenance",
      amount: 350,
      date: "2024-01-08",
      taxDeductible: true,
      profitImpact: -350,
    },
    {
      id: 4,
      category: "Office",
      description: "Software subscription",
      amount: 99,
      date: "2024-01-05",
      taxDeductible: true,
      profitImpact: -99,
    },
    {
      id: 5,
      category: "Insurance",
      description: "Business liability insurance",
      amount: 450,
      date: "2024-01-01",
      taxDeductible: true,
      profitImpact: -450,
    },
  ];

  const categories = ["Equipment", "Materials", "Transportation", "Office", "Insurance", "Utilities", "Marketing", "Other"];

  const totalExpenses = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const taxDeductibleExpenses = mockExpenses.filter((exp) => exp.taxDeductible).reduce((sum, exp) => sum + exp.amount, 0);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Expense added successfully");
    setShowForm(false);
    setFormData({
      category: "",
      description: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      taxDeductible: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Expense Tracking</h1>
          <p className="text-muted-foreground mt-2">Track and manage business expenses</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-3xl font-bold mt-2">${totalExpenses}</p>
            <p className="text-sm text-red-600 mt-2">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Tax Deductible</p>
            <p className="text-3xl font-bold mt-2">${taxDeductibleExpenses}</p>
            <p className="text-sm text-green-600 mt-2">{Math.round((taxDeductibleExpenses / totalExpenses) * 100)}% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Profit Impact</p>
            <p className="text-3xl font-bold mt-2 text-red-600">-${totalExpenses}</p>
            <p className="text-sm text-muted-foreground mt-2">Reduces net profit</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Expense Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="What was this expense for?"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="taxDeductible"
                  checked={formData.taxDeductible}
                  onChange={(e) => setFormData({ ...formData, taxDeductible: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="taxDeductible" className="cursor-pointer">
                  Tax Deductible
                </Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Add Expense</Button>
                <Button type="button" onClick={() => setShowForm(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Expenses List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="font-medium">{expense.category}</p>
                      <p className="text-sm text-muted-foreground">{expense.description}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right mr-4">
                  <p className="font-bold text-red-600">${expense.amount}</p>
                  <p className="text-xs text-muted-foreground">{expense.date}</p>
                  {expense.taxDeductible && <p className="text-xs text-green-600">Tax Deductible</p>}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
