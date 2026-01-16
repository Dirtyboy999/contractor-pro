import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, BarChart3, Users, Lock, Smartphone, Cpu, Lightbulb } from "lucide-react";

export default function CompetitiveAdvantage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Predictive analytics for revenue forecasting, client health scoring, and payment predictions",
      benefit: "Make data-driven decisions instantly",
      color: "bg-purple-50 border-purple-200",
    },
    {
      icon: Zap,
      title: "Smart Automation",
      description: "Automated workflows, scheduling optimization, and intelligent task assignment",
      benefit: "Save 10+ hours per week on admin tasks",
      color: "bg-yellow-50 border-yellow-200",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time dashboards, custom reports, and business intelligence",
      benefit: "Understand your business at a glance",
      color: "bg-blue-50 border-blue-200",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Real-time collaboration, role-based permissions, and activity tracking",
      benefit: "Scale your team without losing control",
      color: "bg-green-50 border-green-200",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "End-to-end encryption, role-based access, and compliance ready",
      benefit: "Protect your business data",
      color: "bg-red-50 border-red-200",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Fully responsive design, PWA support, and offline capabilities",
      benefit: "Work from anywhere, anytime",
      color: "bg-indigo-50 border-indigo-200",
    },
    {
      icon: Cpu,
      title: "API & Integrations",
      description: "REST API, webhooks, and third-party integrations (QuickBooks, Stripe, PayPal)",
      benefit: "Connect your entire tech stack",
      color: "bg-cyan-50 border-cyan-200",
    },
    {
      icon: Lightbulb,
      title: "Smart Recommendations",
      description: "AI-powered pricing suggestions, upsell opportunities, and efficiency tips",
      benefit: "Grow revenue without extra effort",
      color: "bg-orange-50 border-orange-200",
    },
  ];

  const comparisons = [
    {
      feature: "AI Predictions & Insights",
      us: true,
      joist: false,
      others: false,
    },
    {
      feature: "Bulk Actions & Automation",
      us: true,
      joist: false,
      others: false,
    },
    {
      feature: "Real-time Collaboration",
      us: true,
      joist: false,
      others: false,
    },
    {
      feature: "Advanced Scheduling",
      us: true,
      joist: true,
      others: false,
    },
    {
      feature: "Time Tracking",
      us: true,
      joist: true,
      others: true,
    },
    {
      feature: "Invoicing",
      us: true,
      joist: true,
      others: true,
    },
    {
      feature: "Estimates/Bids",
      us: true,
      joist: true,
      others: true,
    },
    {
      feature: "Payment Processing",
      us: true,
      joist: true,
      others: true,
    },
    {
      feature: "Client Portal",
      us: true,
      joist: true,
      others: true,
    },
    {
      feature: "Photo Gallery",
      us: true,
      joist: false,
      others: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Why ContractorPro is Different</h1>
        <p className="text-muted-foreground mt-2">The most advanced contractor management platform on the web</p>
      </div>

      {/* Key Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <Card key={idx} className={`border ${feature.color}`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Icon className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold">{feature.title}</p>
                    <p className="text-sm text-gray-700 mt-1">{feature.description}</p>
                    <p className="text-sm font-semibold text-green-600 mt-2">✓ {feature.benefit}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Competitive Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-bold">Feature</th>
                  <th className="text-center py-3 px-4 font-bold">ContractorPro</th>
                  <th className="text-center py-3 px-4 font-bold">Joist</th>
                  <th className="text-center py-3 px-4 font-bold">Others</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((comp, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{comp.feature}</td>
                    <td className="text-center py-3 px-4">
                      {comp.us ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-gray-300">✗</span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {comp.joist ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-gray-300">✗</span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {comp.others ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-gray-300">✗</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Unique Selling Points */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle>What Makes Us Unique</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <Badge className="mt-1">1</Badge>
            </div>
            <div>
              <p className="font-bold">AI That Learns Your Business</p>
              <p className="text-sm text-gray-700">Our AI studies your patterns and makes personalized recommendations to grow revenue and improve efficiency</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <Badge className="mt-1">2</Badge>
            </div>
            <div>
              <p className="font-bold">Predictive Intelligence</p>
              <p className="text-sm text-gray-700">Know which clients will pay on time, which invoices will be overdue, and where your revenue is heading</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <Badge className="mt-1">3</Badge>
            </div>
            <div>
              <p className="font-bold">Automation That Actually Works</p>
              <p className="text-sm text-gray-700">Smart workflows that adapt to your business, not rigid rules that slow you down</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <Badge className="mt-1">4</Badge>
            </div>
            <div>
              <p className="font-bold">Real-Time Collaboration</p>
              <p className="text-sm text-gray-700">Your team sees updates instantly, no more delays from email chains or manual syncing</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <Badge className="mt-1">5</Badge>
            </div>
            <div>
              <p className="font-bold">Everything You Need, Nothing You Don't</p>
              <p className="text-sm text-gray-700">Built specifically for contractors - not a generic business tool adapted for your industry</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ROI Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Your Potential ROI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-muted-foreground">Time Saved Per Week</p>
              <p className="text-3xl font-bold text-green-600 mt-2">10+ hours</p>
              <p className="text-xs text-gray-700 mt-2">On admin, invoicing, and follow-ups</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-muted-foreground">Revenue Increase</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">15-25%</p>
              <p className="text-xs text-gray-700 mt-2">From pricing optimization and upsells</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-muted-foreground">Payment Speed</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">2x Faster</p>
              <p className="text-xs text-gray-700 mt-2">With automated reminders and tracking</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
