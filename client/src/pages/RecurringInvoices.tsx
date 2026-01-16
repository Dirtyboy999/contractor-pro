import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Pause, Trash2, Play } from "lucide-react";

export default function RecurringInvoices() {
  const [, navigate] = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientId: "",
    title: "",
    amount: "",
    frequency: "monthly",
    dueDay: "15",
    maxOccurrences: "",
  });

  const mockRecurringInvoices = [
    {
      id: 1,
      title: "Monthly Maintenance",
      clientName: "Sarah Johnson",
      amount: 1500,
      frequency: "monthly",
      status: "active",
      nextDate: "2024-02-15",
      occurrences: 5,
    },
    {
      id: 2,
      title: "Quarterly Consultation",
      clientName: "Michael Chen",
      amount: 2500,
      frequency: "quarterly",
      status: "active",
      nextDate: "2024-03-01",
      occurrences: 2,
    },
    {
      id: 3,
      title: "Annual Support",
      clientName: "Emily Rodriguez",
      amount: 5000,
      frequency: "yearly",
      status: "paused",
      nextDate: "2024-12-01",
      occurrences: 1,
    },
  ];

  const handleCreateRecurring = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Recurring invoice created successfully");
    setShowForm(false);
    setFormData({
      clientId: "",
      title: "",
      amount: "",
      frequency: "monthly",
      dueDay: "15",
      maxOccurrences: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Recurring Invoices</h1>
          <p className="text-muted-foreground mt-2">Manage automatic recurring billing</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          New Recurring Invoice
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Recurring Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateRecurring} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Invoice Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Monthly Maintenance"
                    required
                  />
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
                  <Label htmlFor="frequency">Frequency *</Label>
                  <Select value={formData.frequency} onValueChange={(value) => setFormData({ ...formData, frequency: value })}>
                    <SelectTrigger id="frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dueDay">Due Day of Month</Label>
                  <Input
                    id="dueDay"
                    type="number"
                    min="1"
                    max="31"
                    value={formData.dueDay}
                    onChange={(e) => setFormData({ ...formData, dueDay: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="maxOccurrences">Max Occurrences (optional)</Label>
                  <Input
                    id="maxOccurrences"
                    type="number"
                    min="1"
                    value={formData.maxOccurrences}
                    onChange={(e) => setFormData({ ...formData, maxOccurrences: e.target.value })}
                    placeholder="Leave blank for unlimited"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Create Recurring Invoice</Button>
                <Button type="button" onClick={() => setShowForm(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {mockRecurringInvoices.map((recurring) => (
          <Card key={recurring.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-bold text-lg">{recurring.title}</p>
                      <p className="text-sm text-muted-foreground">{recurring.clientName}</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Amount</p>
                      <p className="font-medium">${recurring.amount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Frequency</p>
                      <p className="font-medium capitalize">{recurring.frequency}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Invoice</p>
                      <p className="font-medium">{recurring.nextDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Occurrences</p>
                      <p className="font-medium">{recurring.occurrences}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className={`px-3 py-1 rounded text-xs font-medium ${
                    recurring.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {recurring.status}
                  </span>

                  <div className="flex gap-2">
                    {recurring.status === "active" ? (
                      <Button size="sm" variant="outline">
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
