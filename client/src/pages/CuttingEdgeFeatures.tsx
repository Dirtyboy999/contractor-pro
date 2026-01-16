import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Mic, Brain, Sparkles, Play, Lock } from "lucide-react";
import { useState } from "react";

export default function CuttingEdgeFeatures() {
  const [activeFeature, setActiveFeature] = useState("ar");

  const features = [
    {
      id: "ar",
      name: "AR Project Visualization",
      icon: "🏗️",
      status: "beta",
      description: "See your project in augmented reality before breaking ground",
      benefits: [
        "Visualize project scope in 3D",
        "Show clients exact placement and dimensions",
        "Reduce change orders and disputes",
        "Impress clients with professional presentation",
      ],
      howItWorks: [
        "Upload project photos or blueprints",
        "AI generates 3D model of project",
        "View in AR using phone camera",
        "Share with clients for approval",
      ],
      useCases: [
        "Kitchen remodels - see new layout in real space",
        "Landscaping - visualize new trees and hardscaping",
        "HVAC - show ductwork routing",
        "Electrical - visualize outlet and switch placement",
      ],
      demoUrl: "#",
    },
    {
      id: "voice",
      name: "Voice Commands",
      icon: "🎤",
      status: "beta",
      description: "Control your app hands-free while on the job site",
      benefits: [
        "Create invoices while working",
        "Log time without stopping",
        "Send messages without typing",
        "Stay focused on the job",
      ],
      howItWorks: [
        "Say 'Hey ContractorPro' to activate",
        "Give commands like 'Create invoice for $5,000'",
        "App executes commands and confirms",
        "Perfect for hands-on work",
      ],
      useCases: [
        "Clock in/out on job sites",
        "Create quick notes and photos",
        "Send status updates to clients",
        "Log expenses and materials used",
      ],
      demoUrl: "#",
    },
    {
      id: "predictive",
      name: "Predictive Analytics",
      icon: "🔮",
      status: "live",
      description: "AI predicts cash flow, project delays, and growth opportunities",
      benefits: [
        "Forecast revenue 3-6 months ahead",
        "Predict project delays before they happen",
        "Identify upsell opportunities",
        "Optimize pricing strategy",
      ],
      howItWorks: [
        "AI analyzes your historical data",
        "Identifies patterns and trends",
        "Generates predictions and recommendations",
        "Updates daily with new data",
      ],
      useCases: [
        "Predict cash flow for Q2 based on Q1 trends",
        "Alert when project is likely to go over budget",
        "Recommend price increases based on demand",
        "Identify best times to hire new employees",
      ],
      demoUrl: "#",
    },
    {
      id: "blockchain",
      name: "Blockchain Contracts",
      icon: "🔐",
      status: "coming",
      description: "Immutable smart contracts with automatic execution",
      benefits: [
        "Contracts cannot be disputed",
        "Automatic payment execution",
        "Transparent transaction history",
        "Legal protection",
      ],
      howItWorks: [
        "Create contract with blockchain",
        "Client signs digitally",
        "Contract stored on blockchain",
        "Automatic execution on completion",
      ],
      useCases: [
        "Large projects with milestone payments",
        "Multi-party contracts with subcontractors",
        "Payment disputes eliminated",
        "Instant payment settlement",
      ],
      demoUrl: "#",
    },
  ];

  const current = features.find((f) => f.id === activeFeature);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Cutting-Edge Features</h1>
        <p className="text-muted-foreground mt-2">
          AI-powered innovation that puts you ahead of the competition
        </p>
      </div>

      {/* Feature Selector */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {features.map((feature) => (
          <Button
            key={feature.id}
            variant={activeFeature === feature.id ? "default" : "outline"}
            onClick={() => setActiveFeature(feature.id)}
            className="h-auto flex-col items-start p-4 justify-start"
          >
            <span className="text-2xl mb-2">{feature.icon}</span>
            <span className="font-bold text-sm">{feature.name}</span>
            <Badge
              className="mt-2"
              variant={
                feature.status === "live"
                  ? "default"
                  : feature.status === "beta"
                    ? "secondary"
                    : "outline"
              }
            >
              {feature.status}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Feature Details */}
      {current && (
        <div className="space-y-6">
          {/* Main Card */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <span>{current.icon}</span>
                    {current.name}
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">{current.description}</p>
                </div>
                <Badge
                  className="text-lg px-3 py-1"
                  variant={
                    current.status === "live"
                      ? "default"
                      : current.status === "beta"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {current.status === "live" && "✓ Live"}
                  {current.status === "beta" && "🧪 Beta"}
                  {current.status === "coming" && "🔜 Coming Soon"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {current.status !== "coming" && (
                <Button size="lg" className="gap-2">
                  <Play className="h-4 w-4" />
                  Try Demo
                </Button>
              )}
              {current.status === "coming" && (
                <Button size="lg" disabled className="gap-2">
                  <Lock className="h-4 w-4" />
                  Coming Soon
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Key Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {current.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg">✓</span>
                    <p className="text-sm">{benefit}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {current.howItWorks.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <p className="text-sm pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Use Cases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                Real-World Use Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {current.useCases.map((useCase, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm font-bold text-blue-600 mb-1">Use Case {i + 1}</p>
                    <p className="text-sm">{useCase}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Competitive Advantage */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="pt-6">
              <p className="text-xl font-bold mb-2">🚀 Competitive Advantage</p>
              <p className="mb-4 opacity-90">
                These cutting-edge features are NOT available in Joist, ServiceTitan, or any other
                contractor app. You'll be years ahead of the competition.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold">3-5 years</p>
                  <p className="text-xs opacity-75">Ahead of competitors</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">40-60%</p>
                  <p className="text-xs opacity-75">More efficient</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">2x</p>
                  <p className="text-xs opacity-75">Better margins</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
