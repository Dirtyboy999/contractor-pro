import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, TrendingUp, Zap, DollarSign, Globe } from "lucide-react";

export default function ResellerProgram() {
  const resellerTiers = [
    {
      name: "Starter",
      commission: "20%",
      monthlyTarget: "$0",
      features: [
        "White-label branding",
        "Custom domain",
        "Up to 10 contractors",
        "Basic support",
        "Monthly payouts",
      ],
      price: "Free to join",
    },
    {
      name: "Professional",
      commission: "30%",
      monthlyTarget: "$5,000",
      features: [
        "Everything in Starter",
        "Up to 100 contractors",
        "Priority support",
        "Marketing materials",
        "Co-branded landing page",
        "Weekly check-ins",
      ],
      price: "$99/month",
      popular: true,
    },
    {
      name: "Enterprise",
      commission: "40%",
      monthlyTarget: "$20,000",
      features: [
        "Everything in Professional",
        "Unlimited contractors",
        "Dedicated account manager",
        "Custom features",
        "API access",
        "White-label mobile app",
        "Revenue sharing",
      ],
      price: "Custom",
    },
  ];

  const resellerStats = [
    { label: "Active Resellers", value: "2,340+", icon: Users },
    { label: "Total Revenue Generated", value: "$8.2M+", icon: DollarSign },
    { label: "Average Commission", value: "$4,200/month", icon: TrendingUp },
    { label: "Countries Served", value: "45+", icon: Globe },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-2">White-Label Reseller Program</h1>
        <p className="text-lg opacity-90">
          Earn recurring revenue by reselling ContractorPro under your own brand
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {resellerStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className="h-8 w-8 text-blue-600 opacity-50" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-500" />
            How the Reseller Program Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: 1,
                title: "Sign Up",
                description: "Join the reseller program and choose your tier",
              },
              {
                step: 2,
                title: "Customize",
                description: "White-label with your logo, colors, and domain",
              },
              {
                step: 3,
                title: "Sell",
                description: "Recruit contractors and earn recurring commissions",
              },
              {
                step: 4,
                title: "Earn",
                description: "Get paid monthly for every active contractor",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <p className="font-bold mb-2">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Tiers */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Reseller Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resellerTiers.map((tier, i) => (
            <Card
              key={i}
              className={`relative ${tier.popular ? "border-2 border-blue-600 shadow-lg" : ""}`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-blue-600">{tier.commission}</p>
                  <p className="text-sm text-muted-foreground">Commission Rate</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-muted-foreground mb-1">Monthly Target</p>
                  <p className="text-lg font-bold">{tier.monthlyTarget}</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-muted-foreground mb-2">Includes:</p>
                  <ul className="space-y-2">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full" size="lg">
                  Get Started
                </Button>

                <p className="text-xs text-center text-muted-foreground">{tier.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Commission Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            Earnings Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                contractors: 10,
                avgRevenue: "$290/month per contractor",
                commission: "20%",
                monthlyEarnings: "$580",
                annualEarnings: "$6,960",
              },
              {
                contractors: 50,
                avgRevenue: "$290/month per contractor",
                commission: "30%",
                monthlyEarnings: "$4,350",
                annualEarnings: "$52,200",
              },
              {
                contractors: 100,
                avgRevenue: "$290/month per contractor",
                commission: "40%",
                monthlyEarnings: "$11,600",
                annualEarnings: "$139,200",
              },
            ].map((example, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg border">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Contractors</p>
                    <p className="font-bold">{example.contractors}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Avg Revenue</p>
                    <p className="font-bold text-sm">{example.avgRevenue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Commission</p>
                    <p className="font-bold">{example.commission}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Monthly</p>
                    <p className="font-bold text-green-600">${example.monthlyEarnings}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Annual</p>
                    <p className="font-bold text-green-600">${example.annualEarnings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle>Why Become a Reseller?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Recurring revenue from each contractor",
              "No development or support costs",
              "Full white-label customization",
              "Marketing materials provided",
              "Dedicated account manager",
              "API access for integrations",
              "Co-branded landing page",
              "Revenue sharing at scale",
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg">✓</span>
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold mb-2">Ready to Start Earning?</h3>
          <p className="mb-4 opacity-90">
            Join 2,340+ resellers generating millions in recurring revenue. Apply now and start
            building your business.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Apply to Reseller Program
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
