import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

interface LineItem {
  itemId?: number;
  description: string;
  quantity: number;
  unitPrice: number;
  section: string;
}

export default function InvoiceCreate() {
  const [, navigate] = useLocation();
  const { data: projects } = trpc.projects.list.useQuery();
  const { data: items } = trpc.items.list.useQuery();
  const createInvoiceMutation = trpc.invoices.create.useMutation();
  const addLineItemMutation = trpc.invoices.addLineItem.useMutation();

  const [formData, setFormData] = useState({
    projectId: "",
    title: "",
    dueDate: "",
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: "", quantity: 1, unitPrice: 0, section: "Services" },
  ]);

  const [currentInvoiceId, setCurrentInvoiceId] = useState<number | null>(null);

  const handleAddLineItem = () => {
    setLineItems([
      ...lineItems,
      { description: "", quantity: 1, unitPrice: 0, section: "Services" },
    ]);
  };

  const handleRemoveLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const handleLineItemChange = (index: number, field: keyof LineItem, value: any) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.1; // 10% tax
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.projectId) {
      toast.error("Please select a project");
      return;
    }

    if (lineItems.length === 0 || lineItems.some(item => !item.description)) {
      toast.error("Please add at least one line item");
      return;
    }

    try {
      const result = await createInvoiceMutation.mutateAsync({
        projectId: parseInt(formData.projectId),
        clientId: 0,
        title: formData.title || "Invoice",
        dueDate: formData.dueDate ? new Date(formData.dueDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      setCurrentInvoiceId(result.invoiceId);

      // Add line items
      for (const item of lineItems) {
        await addLineItemMutation.mutateAsync({
          invoiceId: result.invoiceId,
          itemId: item.itemId,
          description: item.description,
          quantity: item.quantity.toString(),
          unitPrice: item.unitPrice.toString(),
          section: item.section,
        });
      }

      toast.success("Invoice created successfully");
      navigate(`/invoices/${result.invoiceId}`);
    } catch (error) {
      toast.error("Failed to create invoice");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Invoice</h1>
        <p className="text-muted-foreground mt-2">Create a new invoice for a project</p>
      </div>

      <form onSubmit={handleCreateInvoice} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="project">Project *</Label>
              <Select value={formData.projectId} onValueChange={(value) => setFormData({ ...formData, projectId: value })}>
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects?.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Invoice Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Kitchen Renovation - Phase 1"
              />
            </div>

            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>


          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Line Items</CardTitle>
            <Button type="button" onClick={handleAddLineItem} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {lineItems.map((item, index) => (
              <div key={index} className="flex gap-4 items-end p-4 border rounded">
                <div className="flex-1">
                  <Label className="text-sm">Description *</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => handleLineItemChange(index, "description", e.target.value)}
                    placeholder="Item description"
                  />
                </div>
                <div className="w-24">
                  <Label className="text-sm">Qty</Label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={item.quantity}
                    onChange={(e) => handleLineItemChange(index, "quantity", parseFloat(e.target.value))}
                  />
                </div>
                <div className="w-32">
                  <Label className="text-sm">Unit Price</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleLineItemChange(index, "unitPrice", parseFloat(e.target.value))}
                  />
                </div>
                <div className="w-32">
                  <Label className="text-sm">Total</Label>
                  <div className="p-2 bg-muted rounded text-sm font-medium">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => handleRemoveLineItem(index)}
                  variant="ghost"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2 text-right">
              <div className="flex justify-end gap-4">
                <span>Subtotal:</span>
                <span className="w-32 font-medium">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-end gap-4">
                <span>Tax (10%):</span>
                <span className="w-32 font-medium">${calculateTax(calculateSubtotal()).toFixed(2)}</span>
              </div>
              <div className="flex justify-end gap-4 text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span className="w-32">${(calculateSubtotal() + calculateTax(calculateSubtotal())).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" size="lg" disabled={createInvoiceMutation.isPending}>
            {createInvoiceMutation.isPending ? "Creating..." : "Create Invoice"}
          </Button>
          <Button type="button" onClick={() => navigate("/invoices")} variant="outline" size="lg">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
