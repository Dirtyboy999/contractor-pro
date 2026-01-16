import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from "recharts";
import { Zap, TrendingUp, AlertTriangle, CheckCircle, Brain } from "lucide-react";
import { useState } from "react";

export default function AIInsights() {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  const forecastData = [
    { month: "Jan", actual: 12500, predicted: 12000 },
    { month: "Feb", actual: 15800, predicted: 15200 },
    { month: "Mar", actual: 18200, predicted: 18500 },
    { month: "Apr", actual: 21500, predicted: 21000 },
    { month: "May", actual: 19800, predicted: 20500 },
    { month: "Jun", actual: 24300, predicted: 23800 },
    { month: "Jul", predicted: 26500 },
    { month: "Aug", predicted: 28200 },
    { month: "Sep", predicted: 29800 },
  ];

  const clientHealthData = [
    { name: "Sarah Johnson", score: 95, trend: "up", status: "Excellent" },
    { name: "Michael Chen", score: 82, trend: "stable", status: "Good" },
    { name: "Emily Rodriguez", score: 68, trend: "down", status: "At Risk" },
    { name: "David Martinez", score: 75, trend: "up", status: "Good" },
  ];

  const paymentPredictions = [
    { client: "Sarah Johnson", dueDate: "2024-02-15", probability: 95, status: "Will Pay On Time" },
    { client: "Michael Chen", dueDate: "2024-02-10", probability: 72, status: "Likely to Pay Late" },
    { client: "Emily Rodriguez", dueDate: "2024-02-20", probability: 45, status: "High Risk" },
  ];

  const recommendations = [
    {
      id: 1,
      title: "Increase Pricing",
      description: "Your profit margin is 76%, which is above industry average. Consider raising rates by 5-10%.",
      impact: "Potential +$2,400/month",
      icon: TrendingUp,
      color: "bg-green-50 border-green-200",
    },
    {
      id: 2,
      title: "Follow Up on Overdue Invoice",
      description: "INV-1001 from Emily Rodriguez is 5 days overdue. AI suggests a personalized follow-up message.",
      impact: "Recover $3,200",
      icon: AlertTriangle,
      color: "bg-red-50 border-red-200",
    },
    {
      id: 3,
      title: "Optimize Project Scheduling",
      description: "Based on your time tracking, you can complete projects 15% faster by reordering tasks.",
      impact: "Save 6.4 hours/month",
      icon: Zap,
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: 4,
      title: "Upsell Opportunity",
      description: "Sarah Johnson has completed 12 projects. She's a prime candidate for a maintenance contract.",
      impact: "Recurring $1,500/month",
      icon: CheckCircle,
      color: "bg-purple-50 border-purple-200",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Brain className="h-8 w-8 text-purple-600" />
          AI Insights & Predictions
        </h1>
        <p className="text-muted-foreground mt-2">AI-powered analytics to grow your business</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Predicted Revenue (Next 3 Months)</p>
            <p className="text-3xl font-bold mt-2">$84,500</p>
            <p className="text-sm text-green-600 mt-2">↑ 18% growth projected</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Payment Health Score</p>
            <p className="text-3xl font-bold mt-2">78/100</p>
            <p className="text-sm text-orange-600 mt-2">1 client at risk</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Efficiency Score</p>
            <p className="text-3xl font-bold mt-2">84/100</p>
            <p className="text-sm text-green-600 mt-2">Better than 92% of contractors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Recommended Actions</p>
            <p className="text-3xl font-bold mt-2">4</p>
            <p className="text-sm text-blue-600 mt-2">Worth $7,100/month</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>6-Month Revenue Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual Revenue" />
              <Line type="monotone" dataKey="predicted" stroke="#a78bfa" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Health Scores */}
        <Card>
          <CardHeader>
            <CardTitle>Client Health Scores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {clientHealthData.map((client) => (
              <div key={client.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.status}</p>
                </div>
                <div className="text-right">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        client.score >= 80 ? "bg-green-500" : client.score >= 70 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${client.score}%` }}
                    />
                  </div>
                  <p className="text-sm font-bold mt-1">{client.score}/100</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Predictions */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Predictions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentPredictions.map((pred) => (
              <div key={pred.client} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm">{pred.client}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    pred.probability >= 80 ? "bg-green-100 text-green-800" :
                    pred.probability >= 60 ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {pred.probability}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Due: {pred.dueDate}</p>
                <p className="text-sm font-medium">{pred.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec) => {
              const Icon = rec.icon;
              return (
                <div key={rec.id} className={`p-4 border rounded-lg ${rec.color}`}>
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold">{rec.title}</p>
                      <p className="text-sm text-gray-700 mt-1">{rec.description}</p>
                      <p className="text-sm font-semibold mt-2">{rec.impact}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="font-medium text-sm">Best Time to Invoice</p>
            <p className="text-xs text-gray-700 mt-1">Send invoices on Tuesdays at 10 AM for 23% faster payment</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="font-medium text-sm">Optimal Project Duration</p>
            <p className="text-xs text-gray-700 mt-1">Your average project takes 8 days. Consider quoting 7 days for faster turnaround.</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="font-medium text-sm">Revenue Opportunity</p>
            <p className="text-xs text-gray-700 mt-1">You have capacity for 2 more projects this month. Estimated revenue: +$5,000</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
