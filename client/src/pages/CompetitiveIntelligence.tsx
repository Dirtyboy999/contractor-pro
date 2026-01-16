import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertCircle, Target, Zap, Download } from "lucide-react";

export default function CompetitiveIntelligence() {
  const marketInsights = [
    {
      category: "Pricing Strategy",
      insight: "Contractors in your area are charging 12% more for similar services",
      recommendation: "Consider raising your prices by 8-10% to stay competitive",
      impact: "Potential +$18,000/year revenue increase",
      action: "Analyze Pricing",
    },
    {
      category: "Market Demand",
      insight: "HVAC services have 40% higher demand this season",
      recommendation: "Allocate more resources to HVAC projects",
      impact: "Capture +$45,000 in additional revenue",
      action: "View Opportunities",
    },
    {
      category: "Competitor Activity",
      insight: "3 new competitors entered your market this month",
      recommendation: "Increase marketing spend by 15% to maintain market share",
      impact: "Retain current customer base",
      action: "Review Competitors",
    },
    {
      category: "Seasonal Trends",
      insight: "Q2 historically has 35% higher project volume",
      recommendation: "Hire temporary staff now to prepare",
      impact: "Avoid project delays and customer dissatisfaction",
      action: "Plan Resources",
    },
  ];

  const competitorComparison = [
    {
      metric: "Average Invoice Value",
      you: "$8,450",
      competitor1: "$6,200",
      competitor2: "$7,100",
      advantage: "You",
    },
    {
      metric: "Customer Satisfaction",
      you: "4.7/5",
      competitor1: "4.1/5",
      competitor2: "4.3/5",
      advantage: "You",
    },
    {
      metric: "Payment Collection Time",
      you: "12 days",
      competitor1: "18 days",
      competitor2: "15 days",
      advantage: "You",
    },
    {
      metric: "Project Completion Rate",
      you: "98%",
      competitor1: "92%",
      competitor2: "94%",
      advantage: "You",
    },
    {
      metric: "Average Project Margin",
      you: "32%",
      competitor1: "24%",
      competitor2: "28%",
      advantage: "You",
    },
  ];

  const pricingRecommendations = [
    {
      service: "Plumbing - Basic Repair",
      currentPrice: "$150",
      recommendedPrice: "$165",
      increase: "+10%",
      marketRate: "$160-$180",
      confidence: "High",
    },
    {
      service: "Electrical - Panel Upgrade",
      currentPrice: "$2,500",
      recommendedPrice: "$2,750",
      increase: "+10%",
      marketRate: "$2,700-$3,200",
      confidence: "High",
    },
    {
      service: "HVAC - Full System Install",
      currentPrice: "$8,000",
      recommendedPrice: "$8,800",
      increase: "+10%",
      marketRate: "$8,500-$10,000",
      confidence: "Medium",
    },
    {
      service: "Landscaping - Hardscape",
      currentPrice: "$5,000",
      recommendedPrice: "$5,250",
      increase: "+5%",
      marketRate: "$4,800-$6,500",
      confidence: "Medium",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Competitive Intelligence</h1>
        <p className="text-muted-foreground mt-2">
          Market insights, competitor analysis, and pricing optimization
        </p>
      </div>

      {/* Market Insights */}
      <div>
        <h2 className="text-xl font-bold mb-4">Market Insights & Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketInsights.map((item, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-500" />
                  {item.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                  <p className="text-sm font-bold text-blue-900 mb-1">💡 Insight</p>
                  <p className="text-sm">{item.insight}</p>
                </div>

                <div className="bg-green-50 border border-green-200 p-3 rounded">
                  <p className="text-sm font-bold text-green-900 mb-1">✓ Recommendation</p>
                  <p className="text-sm">{item.recommendation}</p>
                </div>

                <div className="bg-purple-50 border border-purple-200 p-3 rounded">
                  <p className="text-sm font-bold text-purple-900 mb-1">📈 Impact</p>
                  <p className="text-sm">{item.impact}</p>
                </div>

                <Button size="sm" className="w-full">
                  {item.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Competitor Comparison */}
      <div>
        <h2 className="text-xl font-bold mb-4">How You Compare to Competitors</h2>
        <Card className="overflow-x-auto">
          <CardContent className="pt-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-bold">Metric</th>
                  <th className="text-center py-2 px-3 font-bold text-blue-600">You</th>
                  <th className="text-center py-2 px-3 font-bold text-gray-600">Competitor 1</th>
                  <th className="text-center py-2 px-3 font-bold text-gray-600">Competitor 2</th>
                  <th className="text-center py-2 px-3 font-bold">Advantage</th>
                </tr>
              </thead>
              <tbody>
                {competitorComparison.map((row, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-3 font-bold">{row.metric}</td>
                    <td className="text-center py-3 px-3 text-blue-600 font-bold">{row.you}</td>
                    <td className="text-center py-3 px-3 text-gray-600">{row.competitor1}</td>
                    <td className="text-center py-3 px-3 text-gray-600">{row.competitor2}</td>
                    <td className="text-center py-3 px-3">
                      <Badge className="bg-green-100 text-green-800">{row.advantage}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Recommendations */}
      <div>
        <h2 className="text-xl font-bold mb-4">Pricing Optimization Recommendations</h2>
        <div className="space-y-3">
          {pricingRecommendations.map((item, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div className="md:col-span-2">
                    <p className="font-bold">{item.service}</p>
                    <p className="text-xs text-muted-foreground">Market: {item.marketRate}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Current</p>
                    <p className="font-bold text-lg">{item.currentPrice}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Recommended</p>
                    <p className="font-bold text-lg text-green-600">{item.recommendedPrice}</p>
                  </div>

                  <div className="text-center">
                    <Badge className="bg-green-100 text-green-800">{item.increase}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Confidence: {item.confidence}
                    </p>
                  </div>

                  <div>
                    <Button size="sm" className="w-full">
                      Apply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-green-50 border-green-200 mt-4">
          <CardContent className="pt-6">
            <p className="font-bold text-green-900 mb-2">💰 Revenue Impact</p>
            <p className="text-sm text-green-800 mb-4">
              If you apply these pricing recommendations, you could increase annual revenue by
              <span className="font-bold text-lg text-green-600"> +$42,000</span>
            </p>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download Full Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Growth Opportunities */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Growth Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-sm opacity-75 mb-1">Expand into</p>
              <p className="font-bold">Electrical Services</p>
              <p className="text-xs opacity-75 mt-1">+$65K potential revenue</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-sm opacity-75 mb-1">Increase team size</p>
              <p className="font-bold">Hire 2 more crew members</p>
              <p className="text-xs opacity-75 mt-1">+$120K potential revenue</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-sm opacity-75 mb-1">New market</p>
              <p className="font-bold">Expand to adjacent county</p>
              <p className="text-xs opacity-75 mt-1">+$180K potential revenue</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
