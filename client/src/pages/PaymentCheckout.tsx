import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, DollarSign, Landmark } from "lucide-react";

export default function PaymentCheckout() {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    amount: "2500",
    invoiceNumber: "INV-1002",
    clientName: "Michael Chen",
    email: "michael@example.com",
  });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(`Payment of $${formData.amount} processed successfully via ${paymentMethod}`);
      setFormData({
        amount: "2500",
        invoiceNumber: "INV-1002",
        clientName: "Michael Chen",
        email: "michael@example.com",
      });
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Checkout</h1>
        <p className="text-muted-foreground mt-2">Complete your payment securely</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Invoice</p>
            <p className="text-2xl font-bold">{formData.invoiceNumber}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Client</p>
            <p className="text-2xl font-bold">{formData.clientName}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Amount Due</p>
            <p className="text-2xl font-bold">${formData.amount}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-4">
              {/* Stripe Option */}
              <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                <RadioGroupItem value="stripe" id="stripe" />
                <Label htmlFor="stripe" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Credit/Debit Card (Stripe)</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
                    </div>
                  </div>
                </Label>
              </div>

              {/* PayPal Option */}
              <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    <div>
                      <p className="font-medium">PayPal</p>
                      <p className="text-sm text-muted-foreground">Fast and secure PayPal payments</p>
                    </div>
                  </div>
                </Label>
              </div>

              {/* Chime Option */}
              <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                <RadioGroupItem value="chime" id="chime" />
                <Label htmlFor="chime" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Landmark className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Chime</p>
                      <p className="text-sm text-muted-foreground">Mobile banking and debit card</p>
                    </div>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {paymentMethod === "stripe" && (
              <>
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input id="cardName" placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="4242 4242 4242 4242" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required />
                  </div>
                </div>
              </>
            )}

            {paymentMethod === "paypal" && (
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-blue-900">
                  You will be redirected to PayPal to complete your payment securely.
                </p>
              </div>
            )}

            {paymentMethod === "chime" && (
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-sm text-green-900">
                  Enter your Chime debit card details or use your mobile app to authorize this payment.
                </p>
              </div>
            )}

            <div className="pt-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Amount to Pay:</span>
                <span className="text-2xl font-bold">${formData.amount}</span>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                {isProcessing ? "Processing..." : `Pay $${formData.amount} with ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Your payment information is encrypted and secure. We never store your full card details.</p>
      </div>
    </div>
  );
}
