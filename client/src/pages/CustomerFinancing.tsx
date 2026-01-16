import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CustomerFinancing() {
  const [selectedPartner, setSelectedPartner] = useState("affirm");
  const [selectedTerm, setSelectedTerm] = useState("24");

  const financingApplications = [
    {
      id: 1,
      invoiceId: "INV-001",
      amount: 5000,
      partner: "Affirm",
      status: "approved",
      monthlyPayment: 208.33,
      term: 24,
      approvedDate: "2024-01-10",
    },
    {
      id: 2,
      invoiceId: "INV-002",
      amount: 8500,
      partner: "Klarna",
      status: "pending",
      monthlyPayment: 354.17,
      term: 24,
      appliedDate: "2024-01-15",
    },
    {
      id: 3,
      invoiceId: "INV-003",
      amount: 3200,
      partner: "LendingClub",
      status: "approved",
      monthlyPayment: 133.33,
      term: 24,
      approvedDate: "2024-01-05",
    },
  ];

  const calculateMonthlyPayment = (amount: number, term: number) => {
    const monthlyRate = 0.08 / 12; // Approximate 8% APR
    return (amount * (monthlyRate * Math.pow(1 + monthlyRate, term))) / (Math.pow(1 + monthlyRate, term) - 1);
  };

  const handleApplyForFinancing = () => {
    toast.success(`Application submitted to ${selectedPartner}!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CreditCard className="h-8 w-8 text-green-600" />
          Customer Financing
        </h1>
        <p className="text-muted-foreground mt-2">
          Apply for financing to pay for your invoices with flexible payment plans
        </p>
      </div>

      <Tabs defaultValue="apply" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="apply">Apply for Financing</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
        </TabsList>

        {/* Apply for Financing */}
        <TabsContent value="apply" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Financing Partner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={selectedPartner} onValueChange={setSelectedPartner}>
                <div className="space-y-3">
                  {/* Affirm */}
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="affirm" id="affirm" />
                    <Label htmlFor="affirm" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-bold">Affirm</p>
                        <p className="text-sm text-muted-foreground">
                          Flexible payment plans starting at 3 months, 0% APR available
                        </p>
                      </div>
                    </Label>
                  </div>

                  {/* Klarna */}
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="klarna" id="klarna" />
                    <Label htmlFor="klarna" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-bold">Klarna</p>
                        <p className="text-sm text-muted-foreground">
                          Buy now, pay later with 4 interest-free payments
                        </p>
                      </div>
                    </Label>
                  </div>

                  {/* LendingClub */}
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="lendingClub" id="lendingClub" />
                    <Label htmlFor="lendingClub" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-bold">LendingClub</p>
                        <p className="text-sm text-muted-foreground">
                          Personal loans up to $50,000 with fixed rates
                        </p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="amount">Financing Amount</Label>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold">$</span>
                  <Input id="amount" type="number" placeholder="5000" defaultValue="5000" />
                </div>
              </div>

              <div>
                <Label htmlFor="term">Payment Term</Label>
                <RadioGroup value={selectedTerm} onValueChange={setSelectedTerm}>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {[3, 6, 12, 24].map((term) => (
                      <div key={term} className="flex items-center space-x-2">
                        <RadioGroupItem value={term.toString()} id={`term-${term}`} />
                        <Label htmlFor={`term-${term}`} className="cursor-pointer">
                          {term} mo
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-bold mb-2">Estimated Monthly Payment:</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${calculateMonthlyPayment(5000, parseInt(selectedTerm)).toFixed(2)}/month
                </p>
                <p className="text-xs text-gray-700 mt-2">
                  Based on $5,000 at estimated 8% APR. Actual rate may vary based on creditworthiness.
                </p>
              </div>

              <Button onClick={handleApplyForFinancing} className="w-full">
                Apply for Financing
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Applications */}
        <TabsContent value="applications" className="space-y-4">
          <div className="space-y-3">
            {financingApplications.map((app) => (
              <Card key={app.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-bold text-lg">Invoice {app.invoiceId}</p>
                      <p className="text-sm text-muted-foreground">{app.partner} Financing</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {app.status === "approved" && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="text-sm font-bold">Approved</span>
                        </div>
                      )}
                      {app.status === "pending" && (
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Clock className="h-5 w-5" />
                          <span className="text-sm font-bold">Pending</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Financing Amount</p>
                      <p className="font-bold text-lg">${app.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Monthly Payment</p>
                      <p className="font-bold text-lg">${app.monthlyPayment.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Term</p>
                      <p className="font-bold text-lg">{app.term} months</p>
                    </div>
                  </div>

                  {app.status === "approved" && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700 mb-3">
                      ✓ Financing approved! Contractor has been paid. You can now start making monthly payments.
                    </div>
                  )}

                  {app.status === "pending" && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700 mb-3">
                      ⏳ Your financing application is being reviewed. You'll receive an update within 24-48 hours.
                    </div>
                  )}

                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
