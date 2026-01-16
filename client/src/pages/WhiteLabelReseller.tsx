import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Settings, BarChart3, Users, Zap, DollarSign } from "lucide-react";

export default function WhiteLabelReseller() {
  const resellerFeatures = [
    {
      title: "Custom Branding",
      description: "White-label the platform with your own logo, colors, and domain",
      icon: "🎨",
      benefits: [
        "Custom domain (e.g., yourcompany.com)",
        "Logo and color customization",
        "Branded email templates",
        "Custom help center",
      ],
    },
    {
      title: "Reseller Dashboard",
      description: "Manage all your clients and revenue from one dashboard",
      icon: "📊",
      benefits: [
        "Client management",
        "Revenue tracking",
        "Usage analytics",
        "Performance metrics",
      ],
    },
    {
      title: "Commission Tracking",
      description: "Automatic commission calculation and payment tracking",
      icon: "💰",
      benefits: [
        "Recurring commission tracking",
        "Flexible commission rates",
        "Automated payouts",
        "Detailed reporting",
      ],
    },
    {
      title: "Multi-Tenant Architecture",
      description: "Isolated environments for each of your clients",
      icon: "🏢",
      benefits: [
        "Data isolation",
        "Separate billing",
        "Client customization",
        "Scalable infrastructure",
      ],
    },
  ];

  const pricingTiers = [
    {
      name: "Reseller Starter",
      price: "$299",
      period: "/month",
      clients: "Up to 10 clients",
      commission: "30% recurring",
      features: [
        "White-label branding",
        "Custom domain",
        "Reseller dashboard",
        "Commission tracking",
        "Email support",
        "Monthly payouts",
      ],
    },
    {
      name: "Reseller Pro",
      price: "$799",
      period: "/month",
      clients: "Up to 50 clients",
      commission: "35% recurring",
      features: [
        "Everything in Starter",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
        "API access",
        "Weekly payouts",
        "Dedicated account manager",
      ],
      highlighted: true,
    },
    {
      name: "Reseller Enterprise",
      price: "Custom",
      period: "pricing",
      clients: "Unlimited clients",
      commission: "40% recurring",
      features: [
        "Everything in Pro",
        "Custom features",
        "White-glove onboarding",
        "24/7 phone support",
        "Custom SLA",
        "Real-time payouts",
        "Dedicated engineering",
      ],
    },
  ];

  const resellers = [
    {
      name: "TechVision Agency",
      clients: 47,
      revenue: "$12,400/mo",
      since: "6 months",
      status: "Active",
    },
    {
      name: "BuildRight Solutions",
      clients: 23,
      revenue: "$5,800/mo",
      since: "3 months",
      status: "Active",
    },
    {
      name: "ProContractors Inc",
      clients: 89,
      revenue: "$28,300/mo",
      since: "1 year",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg">
        <div className="flex items-center gap-4">
          <Globe className="h-16 w-16" />
          <div>
            <h1 className="text-4xl font-bold">White-Label Reseller Program</h1>
            <p className="text-lg opacity-90 mt-2">
              Resell ContractorPro under your own brand and earn recurring commissions
            </p>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Reseller Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resellerFeatures.map((feature, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">{feature.icon}</span>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pricing Tiers */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Reseller Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingTiers.map((tier, i) => (
            <Card
              key={i}
              className={`relative ${
                tier.highlighted ? "border-2 border-blue-500 shadow-lg" : ""
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <div className="mt-2">
                  <p className="text-3xl font-bold">{tier.price}</p>
                  <p className="text-sm text-muted-foreground">{tier.period}</p>
                  <p className="text-sm font-semibold mt-2 text-blue-600">{tier.clients}</p>
                  <p className="text-sm text-muted-foreground">{tier.commission}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={tier.highlighted ? "default" : "outline"}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Resellers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Active Resellers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {resellers.map((reseller, i) => (
              <div key={i} className="p-4 border rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold">{reseller.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Partner since {reseller.since} ago
                    </p>
                  </div>
                  <Badge>{reseller.status}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Clients</p>
                    <p className="text-sm font-bold">{reseller.clients}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Monthly Revenue</p>
                    <p className="text-sm font-bold text-green-600">{reseller.revenue}</p>
                  </div>
                  <div className="text-right">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Average Monthly Revenue</p>
                <p className="text-3xl font-bold text-green-600">$15,500</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Resellers</p>
                <p className="text-3xl font-bold text-blue-600">47</p>
              </div>
              <Users className="h-8 w-8 text-blue-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Reseller Clients</p>
                <p className="text-3xl font-bold text-purple-600">1,240</p>
              </div>
              <Zap className="h-8 w-8 text-purple-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onboarding Process */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Reseller Onboarding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <p className="font-bold">Apply for Reseller Program</p>
                <p className="text-sm text-muted-foreground">
                  Submit your application and business information
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <p className="font-bold">Account Setup</p>
                <p className="text-sm text-muted-foreground">
                  We set up your white-label instance and custom domain
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <p className="font-bold">Branding Configuration</p>
                <p className="text-sm text-muted-foreground">
                  Customize logo, colors, and domain settings
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <p className="font-bold">Start Selling</p>
                <p className="text-sm text-muted-foreground">
                  Begin reselling and earning recurring commissions
                </p>
              </div>
            </div>

            <Button className="w-full gap-2 mt-4">
              <span>🚀</span>
              Apply for Reseller Program
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
