import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, CreditCard, Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FinancingSettings() {
  const [financingEnabled, setFinancingEnabled] = useState(true);
  const [affirm, setAffirm] = useState(true);
  const [klarna, setKlarna] = useState(true);
  const [lendingClub, setLendingClub] = useState(true);
  const [minAmount, setMinAmount] = useState("500");
  const [maxAmount, setMaxAmount] = useState("50000");
  const [commission, setCommission] = useState("2.5");

  const handleSaveSettings = () => {
    toast.success("Financing settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CreditCard className="h-8 w-8 text-blue-600" />
          Customer Financing Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Enable customer financing options and manage lending partners
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="partners">Lending Partners</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enable Customer Financing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-bold">Allow customers to finance jobs</p>
                  <p className="text-sm text-muted-foreground">
                    Customers can apply for financing to pay for their invoices
                  </p>
                </div>
                <Switch checked={financingEnabled} onCheckedChange={setFinancingEnabled} />
              </div>

              {financingEnabled && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="minAmount">Minimum Financing Amount</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold">$</span>
                      <Input
                        id="minAmount"
                        type="number"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                        placeholder="500"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Customers can only finance invoices above this amount
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="maxAmount">Maximum Financing Amount</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold">$</span>
                      <Input
                        id="maxAmount"
                        type="number"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                        placeholder="50000"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Customers can finance up to this amount per invoice
                    </p>
                  </div>
                </div>
              )}

              <Button onClick={handleSaveSettings} className="w-full">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lending Partners */}
        <TabsContent value="partners" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Affirm */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Affirm</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Flexible payment plans starting at 3 months
                  </p>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Enable Affirm</span>
                    <Switch checked={affirm} onCheckedChange={setAffirm} />
                  </div>
                </div>
                {affirm && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                    ✓ Affirm is enabled and ready to use
                  </div>
                )}
                <Button variant="outline" className="w-full text-xs">
                  Configure Affirm
                </Button>
              </CardContent>
            </Card>

            {/* Klarna */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Klarna</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Buy now, pay later with flexible installments
                  </p>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Enable Klarna</span>
                    <Switch checked={klarna} onCheckedChange={setKlarna} />
                  </div>
                </div>
                {klarna && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                    ✓ Klarna is enabled and ready to use
                  </div>
                )}
                <Button variant="outline" className="w-full text-xs">
                  Configure Klarna
                </Button>
              </CardContent>
            </Card>

            {/* LendingClub */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">LendingClub</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Personal loans for larger projects
                  </p>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Enable LendingClub</span>
                    <Switch checked={lendingClub} onCheckedChange={setLendingClub} />
                  </div>
                </div>
                {lendingClub && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                    ✓ LendingClub is enabled and ready to use
                  </div>
                )}
                <Button variant="outline" className="w-full text-xs">
                  Configure LendingClub
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Commissions */}
        <TabsContent value="commissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="commission">Commission Percentage</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    id="commission"
                    type="number"
                    step="0.1"
                    value={commission}
                    onChange={(e) => setCommission(e.target.value)}
                    placeholder="2.5"
                  />
                  <span className="text-lg font-bold">%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  ContractorPro takes this percentage from each financing transaction
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-bold mb-2">Commission Example:</p>
                <p className="text-sm text-gray-700">
                  On a $10,000 financed job with {commission}% commission:
                </p>
                <p className="text-lg font-bold text-blue-600 mt-2">
                  ${(10000 * parseFloat(commission) / 100).toFixed(2)} commission
                </p>
              </div>

              <Button onClick={handleSaveSettings} className="w-full">
                Save Commission Settings
              </Button>
            </CardContent>
          </Card>

          {/* Commission History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Commission Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold">Financing ID: FIN-001234</p>
                      <p className="text-sm text-muted-foreground">Client: Acme Corp</p>
                    </div>
                    <span className="text-green-600 font-bold">+$250.00</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Paid on Jan 15, 2024</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold">Financing ID: FIN-001233</p>
                      <p className="text-sm text-muted-foreground">Client: Smith Enterprises</p>
                    </div>
                    <span className="text-green-600 font-bold">+$175.50</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Paid on Jan 10, 2024</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold">Financing ID: FIN-001232</p>
                      <p className="text-sm text-muted-foreground">Client: BuildRight LLC</p>
                    </div>
                    <span className="text-green-600 font-bold">+$325.00</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Paid on Jan 5, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
