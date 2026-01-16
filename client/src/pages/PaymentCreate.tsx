import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function PaymentCreate() {
  const [, navigate] = useLocation();
  const { data: invoices } = trpc.invoices.list.useQuery();
  const createPaymentMutation = trpc.payments.create.useMutation();

  const [formData, setFormData] = useState({
    invoiceId: "",
    amount: "",
    paymentMethod: "card" as const,
    transactionId: "",
    notes: "",
  });

  const selectedInvoice = invoices?.find(inv => inv.id === parseInt(formData.invoiceId));

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.invoiceId) {
      toast.error("Please select an invoice");
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      await createPaymentMutation.mutateAsync({
        invoiceId: parseInt(formData.invoiceId),
        amount: formData.amount,
        paymentMethod: formData.paymentMethod,
        transactionId: formData.transactionId,
        notes: formData.notes,
      });

      toast.success("Payment recorded successfully");
      navigate("/payments");
    } catch (error) {
      toast.error("Failed to record payment");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Record Payment</h1>
        <p className="text-muted-foreground mt-2">Record a payment received from a client</p>
      </div>

      <form onSubmit={handleCreatePayment} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="invoice">Invoice *</Label>
              <Select value={formData.invoiceId} onValueChange={(value) => setFormData({ ...formData, invoiceId: value })}>
                <SelectTrigger id="invoice">
                  <SelectValue placeholder="Select an invoice" />
                </SelectTrigger>
                <SelectContent>
                  {invoices?.map((invoice) => (
                    <SelectItem key={invoice.id} value={invoice.id.toString()}>
                      {invoice.invoiceNumber} - ${parseFloat(invoice.totalAmount.toString()).toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedInvoice && (
                <p className="text-sm text-muted-foreground mt-2">
                  Outstanding: ${parseFloat(selectedInvoice.totalAmount.toString()).toFixed(2)}
                </p>
              )}
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
              />
            </div>

            <div>
              <Label htmlFor="paymentMethod">Payment Method *</Label>
              <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value as any })}>
                <SelectTrigger id="paymentMethod">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="echeck">eCheck</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input
                id="transactionId"
                value={formData.transactionId}
                onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                placeholder="e.g., CHK-12345 or TXN-67890"
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes about this payment"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" size="lg" disabled={createPaymentMutation.isPending}>
            {createPaymentMutation.isPending ? "Recording..." : "Record Payment"}
          </Button>
          <Button type="button" onClick={() => navigate("/payments")} variant="outline" size="lg">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
