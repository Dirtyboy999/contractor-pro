import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

export default function JobCosting() {
  const projectCosts = [
    {
      id: 1,
      name: "Kitchen Renovation",
      estimatedTotal: 15000,
      actualTotal: 14200,
      laborEstimate: 8000,
      laborActual: 7800,
      materialEstimate: 5000,
      materialActual: 5200,
      equipmentEstimate: 2000,
      equipmentActual: 1200,
      profitMargin: 800,
      profitMarginPercent: 5.3,
      status: "completed",
    },
    {
      id: 2,
      name: "Bathroom Remodel",
      estimatedTotal: 8500,
      actualTotal: 8900,
      laborEstimate: 4500,
      laborActual: 4800,
      materialEstimate: 3000,
      materialActual: 3200,
      equipmentEstimate: 1000,
      equipmentActual: 900,
      profitMargin: -400,
      profitMarginPercent: -4.7,
      status: "completed",
    },
    {
      id: 3,
      name: "Deck Installation",
      estimatedTotal: 12000,
      actualTotal: 11500,
      laborEstimate: 6000,
      laborActual: 5800,
      materialEstimate: 5000,
      materialActual: 4900,
      equipmentEstimate: 1000,
      equipmentActual: 800,
      profitMargin: 500,
      profitMarginPercent: 4.2,
      status: "in-progress",
    },
  ];

  const costBreakdown = [
    { name: "Labor", value: 18400, color: "#3b82f6" },
    { name: "Materials", value: 13300, color: "#10b981" },
    { name: "Equipment", value: 2900, color: "#f59e0b" },
  ];

  const profitabilityTrend = [
    { month: "Jan", profit: 2400, revenue: 15000, cost: 12600 },
    { month: "Feb", profit: 1800, revenue: 14000, cost: 12200 },
    { month: "Mar", profit: 3200, revenue: 18000, cost: 14800 },
    { month: "Apr", profit: 2900, revenue: 16500, cost: 13600 },
    { month: "May", profit: 4100, revenue: 20000, cost: 15900 },
    { month: "Jun", profit: 3600, revenue: 19000, cost: 15400 },
  ];

  const costComparison = [
    { project: "Kitchen", estimated: 15000, actual: 14200, variance: 800 },
    { project: "Bathroom", estimated: 8500, actual: 8900, variance: -400 },
    { project: "Deck", estimated: 12000, actual: 11500, variance: 500 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          Job Costing & Profitability
        </h1>
        <p className="text-muted-foreground mt-2">Track actual costs vs estimates and analyze project profitability</p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-3xl font-bold mt-2">$37,600</p>
            <p className="text-xs text-green-600 mt-2">From 3 projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Costs</p>
            <p className="text-3xl font-bold mt-2">$34,600</p>
            <p className="text-xs text-orange-600 mt-2">Labor, materials, equipment</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Profit</p>
            <p className="text-3xl font-bold mt-2 text-green-600">$3,000</p>
            <p className="text-xs text-green-600 mt-2">8% average margin</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Variance</p>
            <p className="text-3xl font-bold mt-2">+$900</p>
            <p className="text-xs text-green-600 mt-2">Under budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Profitability Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Profitability Trend (6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={profitabilityTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} name="Profit" />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} name="Cost" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown (All Projects)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={costBreakdown} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: $${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Estimated vs Actual */}
        <Card>
          <CardHeader>
            <CardTitle>Estimated vs Actual Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="project" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="estimated" fill="#3b82f6" name="Estimated" />
                <Bar dataKey="actual" fill="#10b981" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Profitability Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectCosts.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold">{project.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {project.status === "completed" ? "Completed" : "In Progress"}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-bold ${
                    project.profitMarginPercent >= 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {project.profitMarginPercent >= 0 ? "+" : ""}{project.profitMarginPercent}%
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Estimated</p>
                    <p className="font-bold">${project.estimatedTotal.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Actual</p>
                    <p className="font-bold">${project.actualTotal.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Profit</p>
                    <p className={`font-bold ${project.profitMargin >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${project.profitMargin.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Variance</p>
                    <p className="font-bold text-blue-600">${(project.estimatedTotal - project.actualTotal).toLocaleString()}</p>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                  <div className="p-2 bg-blue-50 rounded">
                    <p className="text-muted-foreground">Labor</p>
                    <p className="font-bold">Est: ${project.laborEstimate} | Act: ${project.laborActual}</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <p className="text-muted-foreground">Materials</p>
                    <p className="font-bold">Est: ${project.materialEstimate} | Act: ${project.materialActual}</p>
                  </div>
                  <div className="p-2 bg-orange-50 rounded">
                    <p className="text-muted-foreground">Equipment</p>
                    <p className="font-bold">Est: ${project.equipmentEstimate} | Act: ${project.equipmentActual}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Adjust Costs
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Profitability Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-white rounded border border-yellow-200">
            <p className="font-bold text-sm">Bathroom Remodel - Below Margin</p>
            <p className="text-sm text-gray-700 mt-1">This project came in $400 over budget. Material costs exceeded estimate by $200. Consider reviewing supplier pricing.</p>
          </div>
          <div className="p-3 bg-white rounded border border-yellow-200">
            <p className="font-bold text-sm">Labor Efficiency Opportunity</p>
            <p className="text-sm text-gray-700 mt-1">Kitchen project completed 2 hours under estimate. Apply this efficiency to future similar projects to improve margins.</p>
          </div>
          <div className="p-3 bg-white rounded border border-yellow-200">
            <p className="font-bold text-sm">Equipment Cost Reduction</p>
            <p className="text-sm text-gray-700 mt-1">Average equipment costs are 20% below estimates. Consider adjusting future quotes to reflect actual equipment needs.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
