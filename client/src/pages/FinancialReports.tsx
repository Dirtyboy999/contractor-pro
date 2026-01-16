import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FinancialReports() {
  const [timeRange, setTimeRange] = useState("month");

  const revenueData = [
    { month: "Jan", revenue: 12500, expenses: 3200, profit: 9300 },
    { month: "Feb", revenue: 15800, expenses: 4100, profit: 11700 },
    { month: "Mar", revenue: 18200, expenses: 3800, profit: 14400 },
    { month: "Apr", revenue: 21500, expenses: 5200, profit: 16300 },
    { month: "May", revenue: 19800, expenses: 4500, profit: 15300 },
    { month: "Jun", revenue: 24300, expenses: 5800, profit: 18500 },
  ];

  const paymentMethodData = [
    { name: "Stripe", value: 45000, percentage: 45 },
    { name: "PayPal", value: 32000, percentage: 32 },
    { name: "Chime", value: 15000, percentage: 15 },
    { name: "Cash", value: 8000, percentage: 8 },
  ];

  const clientRevenueData = [
    { client: "Sarah Johnson", revenue: 28500, invoices: 12, avgInvoice: 2375 },
    { client: "Michael Chen", revenue: 24200, invoices: 8, avgInvoice: 3025 },
    { client: "Emily Rodriguez", revenue: 19800, invoices: 6, avgInvoice: 3300 },
    { client: "David Martinez", revenue: 15600, invoices: 5, avgInvoice: 3120 },
    { client: "Lisa Anderson", revenue: 12400, invoices: 4, avgInvoice: 3100 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  const handleExport = () => {
    toast.success("Financial report exported as PDF");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Reports</h1>
          <p className="text-muted-foreground mt-2">Comprehensive business analytics and insights</p>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Time Range Filter */}
      <div className="flex gap-2">
        {["week", "month", "quarter", "year"].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? "default" : "outline"}
            onClick={() => setTimeRange(range)}
            className="capitalize"
          >
            {range}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-3xl font-bold mt-2">$112,100</p>
            <p className="text-sm text-green-600 mt-2">↑ 12% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-3xl font-bold mt-2">$26,600</p>
            <p className="text-sm text-red-600 mt-2">↑ 8% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Net Profit</p>
            <p className="text-3xl font-bold mt-2">$85,500</p>
            <p className="text-sm text-green-600 mt-2">↑ 14% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Profit Margin</p>
            <p className="text-3xl font-bold mt-2">76.3%</p>
            <p className="text-sm text-green-600 mt-2">↑ 2.1% from last period</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue vs Expenses Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              <Bar dataKey="profit" fill="#10b981" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cash Flow Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Cash Flow Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Methods Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Client */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Client</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientRevenueData.map((client) => (
              <div key={client.client} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{client.client}</p>
                  <p className="text-sm text-muted-foreground">{client.invoices} invoices • Avg: ${client.avgInvoice}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${client.revenue}</p>
                  <p className="text-sm text-green-600">+{Math.round((client.revenue / 112100) * 100)}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
