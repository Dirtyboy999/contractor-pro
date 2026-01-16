import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, DollarSign, LogOut, Download } from "lucide-react";

export default function AnalyticsDashboard() {
  const revenueData = [
    { month: "Jan", revenue: 45000, target: 50000 },
    { month: "Feb", revenue: 52000, target: 50000 },
    { month: "Mar", revenue: 48000, target: 50000 },
    { month: "Apr", revenue: 61000, target: 50000 },
    { month: "May", revenue: 55000, target: 50000 },
    { month: "Jun", revenue: 67000, target: 50000 },
  ];

  const userGrowthData = [
    { week: "Week 1", signups: 45, active: 120 },
    { week: "Week 2", signups: 52, active: 165 },
    { week: "Week 3", signups: 48, active: 198 },
    { week: "Week 4", signups: 61, active: 245 },
    { week: "Week 5", signups: 55, active: 285 },
    { week: "Week 6", signups: 67, active: 340 },
  ];

  const churnData = [
    { name: "Retained", value: 92, fill: "#10b981" },
    { name: "Churned", value: 8, fill: "#ef4444" },
  ];

  const metrics = [
    {
      title: "Total Revenue",
      value: "$328,000",
      change: "+12.5%",
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
    },
    {
      title: "Active Users",
      value: "340",
      change: "+28.3%",
      icon: <Users className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Churn Rate",
      value: "8%",
      change: "-2.1%",
      icon: <LogOut className="h-6 w-6 text-red-600" />,
    },
    {
      title: "Growth Rate",
      value: "+45%",
      change: "YoY",
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Track business metrics, user growth, and revenue trends
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                {metric.icon}
              </div>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-xs text-green-600 mt-1">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Actual Revenue" />
              <Line type="monotone" dataKey="target" stroke="#9ca3af" name="Target" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="signups" fill="#3b82f6" name="New Signups" />
                <Bar dataKey="active" fill="#10b981" name="Active Users" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Churn Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Retention Rate</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={churnData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {churnData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-bold text-blue-900">📈 Strong Growth</p>
            <p className="text-sm text-blue-800">Revenue increased 12.5% this month, exceeding targets by $17,000.</p>
          </div>
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-bold text-green-900">✓ Low Churn</p>
            <p className="text-sm text-green-800">Churn rate improved to 8%, down from 10% last month. Retention strategies working well.</p>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm font-bold text-purple-900">🚀 User Acquisition</p>
            <p className="text-sm text-purple-800">Active users grew 28.3% this period. Referral program driving 40% of new signups.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
