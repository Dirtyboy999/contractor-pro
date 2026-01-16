import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: "Basic",
      tier: "basic",
      monthlyPrice: 9,
      annualPrice: 90,
      description: "Perfect for solo contractors starting out",
      features: [
        { name: "Unlimited Invoices", included: true },
        { name: "Unlimited Clients", included: true },
        { name: "Basic Reports", included: true },
        { name: "Email Support", included: true },
        { name: "Payments (Stripe/PayPal)", included: false },
        { name: "Time Tracking", included: false },
        { name: "Employee Tracking", included: false },
        { name: "Payroll Integration", included: false },
        { name: "AI Insights", included: false },
        { name: "Advanced Analytics", included: false },
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Elite",
      tier: "elite",
      monthlyPrice: 29,
      annualPrice: 290,
      description: "For growing teams with more features",
      features: [
        { name: "Unlimited Invoices", included: true },
        { name: "Unlimited Clients", included: true },
        { name: "Basic Reports", included: true },
        { name: "Email Support", included: true },
        { name: "Payments (Stripe/PayPal)", included: true },
        { name: "Time Tracking", included: true },
        { name: "Employee Tracking", included: true },
        { name: "Payroll Integration", included: false },
        { name: "AI Insights", included: false },
        { name: "Advanced Analytics", included: false },
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Pro",
      tier: "pro",
      monthlyPrice: 59,
      annualPrice: 590,
      description: "Everything you need to scale your business",
      features: [
        { name: "Unlimited Invoices", included: true },
        { name: "Unlimited Clients", included: true },
        { name: "Basic Reports", included: true },
        { name: "Email Support", included: true },
        { name: "Payments (Stripe/PayPal)", included: true },
        { name: "Time Tracking", included: true },
        { name: "Employee Tracking", included: true },
        { name: "Payroll Integration", included: true },
        { name: "AI Insights", included: true },
        { name: "Advanced Analytics", included: true },
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
  ];

  const handleSelectPlan = (tier: string) => {
    toast.success(`Starting 14-day free trial of ${tier} plan`);
  };

  const getPrice = (plan: any) => {
    return billingPeriod === "monthly" ? plan.monthlyPrice : Math.round(plan.annualPrice / 12);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Affordable plans for contractors of all sizes. Start with a 14-day free trial of Pro to experience the full power of ContractorPro.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center items-center gap-4">
        <span className={`text-sm font-medium ${billingPeriod === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>
          Monthly
        </span>
        <button
          onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
          className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-300"
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
              billingPeriod === "annual" ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${billingPeriod === "annual" ? "text-foreground" : "text-muted-foreground"}`}>
          Annual
          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Save 17%</span>
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.tier}
            className={`relative flex flex-col ${
              plan.highlighted ? "ring-2 ring-blue-500 md:scale-105" : ""
            }`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  Most Popular
                </span>
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
            </CardHeader>

            <CardContent className="flex-1 space-y-6">
              {/* Pricing */}
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${getPrice(plan)}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                {billingPeriod === "annual" && (
                  <p className="text-xs text-green-600 mt-1">
                    Billed ${plan.annualPrice} annually
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => handleSelectPlan(plan.tier)}
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.cta}
              </Button>

              {/* Features List */}
              <div className="space-y-3 border-t pt-6">
                {plan.features.map((feature) => (
                  <div key={feature.name} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 flex-shrink-0" />
                    )}
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trial Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center max-w-2xl mx-auto">
        <h3 className="font-bold text-lg mb-2">14-Day Free Trial</h3>
        <p className="text-sm text-gray-700">
          Start with a full 14-day trial of our Pro plan. Experience all features with no credit card required. See why contractors choose ContractorPro.
        </p>
      </div>

      {/* Referral Program */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-8 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Earn Free Months with Referrals</h3>
        <p className="text-gray-700 mb-4">
          Refer a friend and both of you get a free month of service when they sign up with your referral link. Unlimited referrals = unlimited free months!
        </p>
        <Button className="bg-green-600 hover:bg-green-700">Get Your Referral Link</Button>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Can I change plans anytime?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Yes! Upgrade or downgrade your plan anytime. Changes take effect on your next billing cycle.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">What happens after my trial ends?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We'll remind you before your trial ends. Choose a plan to continue, or your account will pause. No surprise charges.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Do you offer discounts for annual billing?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Yes! Pay annually and save 17% compared to monthly billing. That's like getting 2 months free!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Is there a contract or commitment?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No contracts. Cancel anytime. We're confident you'll love ContractorPro, so we don't lock you in.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
