import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { DollarSign, Users, Download, Send, Settings, CheckCircle } from "lucide-react";

export default function Payroll() {
  const [activeTab, setActiveTab] = useState("payroll-runs");
  const [showPayrollSettings, setShowPayrollSettings] = useState(false);

  const payrollRuns = [
    {
      id: 1,
      period: "Jan 1-15, 2024",
      employees: 3,
      totalGrossPay: 4500,
      totalNetPay: 3650,
      status: "paid",
      paymentDate: "2024-01-16",
    },
    {
      id: 2,
      period: "Jan 16-31, 2024",
      employees: 3,
      totalGrossPay: 4800,
      totalNetPay: 3900,
      status: "processed",
      paymentDate: "2024-02-01",
    },
    {
      id: 3,
      period: "Feb 1-15, 2024",
      employees: 3,
      totalGrossPay: 4650,
      totalNetPay: 3775,
      status: "draft",
      paymentDate: null,
    },
  ];

  const employeePayroll = [
    {
      id: 1,
      name: "John Smith",
      regularHours: 80,
      overtimeHours: 5,
      regularPay: 1600,
      overtimePay: 150,
      grossPay: 1750,
      taxes: 280,
      deductions: 50,
      netPay: 1420,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      regularHours: 80,
      overtimeHours: 0,
      regularPay: 1600,
      overtimePay: 0,
      grossPay: 1600,
      taxes: 256,
      deductions: 0,
      netPay: 1344,
    },
    {
      id: 3,
      name: "Mike Davis",
      regularHours: 80,
      overtimeHours: 8,
      regularPay: 1600,
      overtimePay: 240,
      grossPay: 1840,
      taxes: 294,
      deductions: 75,
      netPay: 1471,
    },
  ];

  const handleProcessPayroll = () => {
    toast.success("Payroll processed successfully");
  };

  const handleSendPayroll = () => {
    toast.success("Payroll sent to ADP/Gusto");
  };

  const handleDownloadReport = () => {
    toast.success("Payroll report downloaded");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <DollarSign className="h-8 w-8 text-green-600" />
          Payroll Management
        </h1>
        <p className="text-muted-foreground mt-2">Process payroll and integrate with ADP/Gusto</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="payroll-runs">Payroll Runs</TabsTrigger>
          <TabsTrigger value="employee-payroll">Employee Payroll</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Payroll Runs Tab */}
        <TabsContent value="payroll-runs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Payroll Runs</h2>
            <Button onClick={handleProcessPayroll}>+ New Payroll Run</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Payroll (This Year)</p>
                <p className="text-3xl font-bold mt-2">$28,950</p>
                <p className="text-xs text-green-600 mt-2">Across 6 payroll runs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Average Payroll</p>
                <p className="text-3xl font-bold mt-2">$4,825</p>
                <p className="text-xs text-blue-600 mt-2">Per payroll run</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Taxes Withheld</p>
                <p className="text-3xl font-bold mt-2">$4,650</p>
                <p className="text-xs text-orange-600 mt-2">Federal, state, FICA</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Payroll Runs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payrollRuns.map((run) => (
                  <div key={run.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold">{run.period}</p>
                        <p className="text-sm text-muted-foreground">{run.employees} employees</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        run.status === "paid" ? "bg-green-100 text-green-800" :
                        run.status === "processed" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {run.status.charAt(0).toUpperCase() + run.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Gross Pay</p>
                        <p className="font-bold">${run.totalGrossPay.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Net Pay</p>
                        <p className="font-bold">${run.totalNetPay.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Payment Date</p>
                        <p className="font-bold">{run.paymentDate || "Pending"}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      {run.status === "draft" && (
                        <Button size="sm" className="flex-1">
                          Process
                        </Button>
                      )}
                      {run.status === "processed" && (
                        <Button size="sm" className="flex-1" onClick={handleSendPayroll}>
                          <Send className="h-4 w-4 mr-2" />
                          Send to ADP
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employee Payroll Tab */}
        <TabsContent value="employee-payroll" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Employee Payroll Details</h2>
            <Button onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Employee</th>
                      <th className="text-right py-3 px-4 font-medium">Regular Hours</th>
                      <th className="text-right py-3 px-4 font-medium">OT Hours</th>
                      <th className="text-right py-3 px-4 font-medium">Gross Pay</th>
                      <th className="text-right py-3 px-4 font-medium">Taxes & Deductions</th>
                      <th className="text-right py-3 px-4 font-medium">Net Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeePayroll.map((emp) => (
                      <tr key={emp.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{emp.name}</td>
                        <td className="text-right py-3 px-4">{emp.regularHours}</td>
                        <td className="text-right py-3 px-4">{emp.overtimeHours}</td>
                        <td className="text-right py-3 px-4 font-bold">${emp.grossPay.toLocaleString()}</td>
                        <td className="text-right py-3 px-4">${(emp.taxes + emp.deductions).toLocaleString()}</td>
                        <td className="text-right py-3 px-4 font-bold text-green-600">${emp.netPay.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Tax Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Summary (Current Payroll)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-muted-foreground">Federal Tax</p>
                  <p className="text-2xl font-bold mt-1">$830</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-muted-foreground">State Tax</p>
                  <p className="text-2xl font-bold mt-1">$310</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm text-muted-foreground">Social Security</p>
                  <p className="text-2xl font-bold mt-1">$295</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-muted-foreground">Medicare</p>
                  <p className="text-2xl font-bold mt-1">$110</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">ADP Integration</p>
                    <p className="text-sm text-muted-foreground">Sync payroll data with ADP</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Connected
                  </span>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">Gusto Integration</p>
                    <p className="text-sm text-muted-foreground">Sync payroll data with Gusto</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Connect
                  </Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">Direct Deposit Setup</p>
                    <p className="text-sm text-muted-foreground">Configure direct deposit for employees</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Federal Tax Rate (%)</Label>
                  <Input type="number" placeholder="12" defaultValue="12" />
                </div>
                <div>
                  <Label>State Tax Rate (%)</Label>
                  <Input type="number" placeholder="5" defaultValue="5" />
                </div>
                <div>
                  <Label>Social Security Rate (%)</Label>
                  <Input type="number" placeholder="6.2" defaultValue="6.2" />
                </div>
                <div>
                  <Label>Medicare Rate (%)</Label>
                  <Input type="number" placeholder="1.45" defaultValue="1.45" />
                </div>
              </div>
              <Button>Save Tax Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
