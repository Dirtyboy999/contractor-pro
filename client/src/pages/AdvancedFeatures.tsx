import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, TrendingUp, AlertCircle, Download, Plus } from "lucide-react";
import { useState } from "react";

export default function AdvancedFeatures() {
  const [activeTab, setActiveTab] = useState("contracts");

  const contractTemplates = [
    {
      id: 1,
      name: "Service Agreement",
      category: "General",
      uses: 1240,
      rating: 4.8,
      description: "Standard service agreement for all contractor types",
      sections: ["Scope", "Payment Terms", "Timeline", "Liability", "Warranty"],
      tags: ["general", "popular"],
    },
    {
      id: 2,
      name: "Plumbing Work Contract",
      category: "Specialized",
      uses: 890,
      rating: 4.9,
      description: "Specialized contract for plumbing services",
      sections: ["Scope", "Materials", "Permits", "Warranty", "Payment"],
      tags: ["plumbing", "specialized"],
    },
    {
      id: 3,
      name: "Electrical Work Contract",
      category: "Specialized",
      uses: 750,
      rating: 4.7,
      description: "Specialized contract for electrical services",
      sections: ["Scope", "Safety", "Permits", "Warranty", "Payment"],
      tags: ["electrical", "specialized"],
    },
    {
      id: 4,
      name: "HVAC Installation Contract",
      category: "Specialized",
      uses: 620,
      rating: 4.8,
      description: "Specialized contract for HVAC services",
      sections: ["Scope", "Equipment", "Warranty", "Maintenance", "Payment"],
      tags: ["hvac", "specialized"],
    },
  ];

  const complianceItems = [
    {
      id: 1,
      title: "Business License",
      status: "verified",
      expiryDate: "2025-12-31",
      daysUntilExpiry: 320,
      action: "Renew",
      importance: "critical",
    },
    {
      id: 2,
      title: "General Liability Insurance",
      status: "verified",
      expiryDate: "2025-06-30",
      daysUntilExpiry: 165,
      action: "Renew",
      importance: "critical",
    },
    {
      id: 3,
      title: "Workers' Compensation",
      status: "verified",
      expiryDate: "2025-03-15",
      daysUntilExpiry: 59,
      action: "Renew Soon",
      importance: "critical",
    },
    {
      id: 4,
      title: "Bonding",
      status: "verified",
      expiryDate: "2026-01-01",
      daysUntilExpiry: 352,
      action: "Renew",
      importance: "high",
    },
    {
      id: 5,
      title: "Tax ID Verification",
      status: "verified",
      expiryDate: null,
      daysUntilExpiry: null,
      action: "Verified",
      importance: "medium",
    },
  ];

  const benchmarkData = [
    {
      metric: "Average Invoice Value",
      yourValue: "$8,450",
      industryAverage: "$7,200",
      percentile: "72nd",
      trend: "up",
    },
    {
      metric: "Payment Collection Time",
      yourValue: "12 days",
      industryAverage: "18 days",
      percentile: "85th",
      trend: "up",
    },
    {
      metric: "Project Margin",
      yourValue: "32%",
      industryAverage: "28%",
      percentile: "68th",
      trend: "up",
    },
    {
      metric: "Customer Satisfaction",
      yourValue: "4.7/5",
      industryAverage: "4.2/5",
      percentile: "78th",
      trend: "up",
    },
    {
      metric: "Repeat Customer Rate",
      yourValue: "68%",
      industryAverage: "52%",
      percentile: "82nd",
      trend: "up",
    },
    {
      metric: "Revenue per Employee",
      yourValue: "$145K",
      industryAverage: "$120K",
      percentile: "71st",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Advanced Features</h1>
        <p className="text-muted-foreground mt-2">
          Smart contracts, compliance tracking, and industry benchmarking
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b overflow-x-auto">
        {[
          { id: "contracts", label: "Smart Contracts", icon: "📋" },
          { id: "compliance", label: "Compliance", icon: "✓" },
          { id: "benchmarking", label: "Benchmarking", icon: "📊" },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => setActiveTab(tab.id)}
            className="rounded-none border-b-2"
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Contracts Tab */}
      {activeTab === "contracts" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              Choose from 50+ professionally drafted contract templates
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Custom Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contractTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        {template.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">{template.category}</p>
                    </div>
                    <Badge>{template.uses} uses</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{template.description}</p>

                  <div>
                    <p className="text-xs font-bold mb-2">Sections Included:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.sections.map((section) => (
                        <Badge key={section} variant="outline" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold">{template.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Download className="h-4 w-4" />
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Compliance Tab */}
      {activeTab === "compliance" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <p className="text-2xl font-bold text-green-600">5/5</p>
                <p className="text-sm text-muted-foreground">Items Verified</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <p className="text-2xl font-bold text-blue-600">59 days</p>
                <p className="text-sm text-muted-foreground">Next Renewal</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="pt-6">
                <p className="text-2xl font-bold text-purple-600">100%</p>
                <p className="text-sm text-muted-foreground">Compliance Score</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            {complianceItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-bold">{item.title}</p>
                        {item.expiryDate && (
                          <p className="text-xs text-muted-foreground">
                            Expires: {new Date(item.expiryDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {item.daysUntilExpiry && (
                        <p className="text-sm font-bold text-orange-600">
                          {item.daysUntilExpiry} days
                        </p>
                      )}
                      <Button size="sm" variant="outline">
                        {item.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Renewal Reminders</p>
                <p className="text-sm text-muted-foreground">
                  We'll send you email reminders 30, 14, and 7 days before any compliance item
                  expires
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Benchmarking Tab */}
      {activeTab === "benchmarking" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Your Performance vs Industry</h3>
            <p className="opacity-90">
              See how your business compares to 2,340+ contractors in your industry
            </p>
          </div>

          <div className="space-y-3">
            {benchmarkData.map((item, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold">{item.metric}</p>
                    <Badge className="bg-blue-100 text-blue-800">{item.percentile} percentile</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Your Value</p>
                      <p className="text-lg font-bold text-blue-600">{item.yourValue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Industry Avg</p>
                      <p className="text-lg font-bold text-gray-600">{item.industryAverage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Difference</p>
                      <p className="text-lg font-bold text-green-600">
                        {item.trend === "up" ? "↑" : "↓"} Above Average
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min(parseInt(item.percentile) + 10, 100)}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0">
            <CardContent className="pt-6">
              <p className="text-xl font-bold mb-2">🎯 You're Outperforming 72% of Contractors</p>
              <p className="mb-4 opacity-90">
                Your business is above average in most key metrics. Keep up the great work!
              </p>
              <Button variant="secondary">View Detailed Report</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
