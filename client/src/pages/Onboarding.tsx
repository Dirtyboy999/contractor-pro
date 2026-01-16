import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      id: 0,
      title: "Welcome to ContractorPro",
      description: "Let's set up your contractor business in 5 minutes",
      icon: "👋",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            ContractorPro helps you manage invoices, bids, payments, and your entire team from one platform.
          </p>
          <div className="space-y-2">
            <p className="font-bold">What you'll learn:</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✓ Create your first invoice</li>
              <li>✓ Add clients to your business</li>
              <li>✓ Set up payment methods</li>
              <li>✓ Send bids to customers</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: "Create Your First Invoice",
      description: "Learn how to create a professional invoice",
      icon: "📄",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Invoices are how you bill your clients. Let's create one together.
          </p>
          <div className="space-y-3">
            <div>
              <Label htmlFor="client">Select Client</Label>
              <Input id="client" placeholder="Choose a client..." className="mt-2" />
            </div>
            <div>
              <Label htmlFor="amount">Invoice Amount</Label>
              <Input id="amount" type="number" placeholder="$5,000" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="What work did you do?" className="mt-2" />
            </div>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
            💡 Tip: You can use AI to auto-generate invoice descriptions!
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Add Your First Client",
      description: "Build your client database",
      icon: "👥",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Clients are the people or businesses you work with. Add them to keep track of all your projects.
          </p>
          <div className="space-y-3">
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input id="clientName" placeholder="ABC Construction" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="contact@abcconstruction.com" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="(555) 123-4567" className="mt-2" />
            </div>
          </div>
          <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
            ✓ You can add unlimited clients on any plan!
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Set Up Payment Methods",
      description: "Enable online payments",
      icon: "💳",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Allow your clients to pay you online through multiple payment methods.
          </p>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <p className="font-bold">💳 Stripe</p>
              <p className="text-sm text-gray-600">Accept credit cards, debit cards</p>
            </div>
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <p className="font-bold">🅿️ PayPal</p>
              <p className="text-sm text-gray-600">Accept PayPal payments</p>
            </div>
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <p className="font-bold">🏦 Bank Transfer</p>
              <p className="text-sm text-gray-600">Direct bank transfers (ACH)</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Send Your First Bid",
      description: "Win more work with professional bids",
      icon: "📋",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Bids help you win new work by showing clients your pricing and scope.
          </p>
          <div className="space-y-3">
            <div>
              <Label htmlFor="bidClient">Client</Label>
              <Input id="bidClient" placeholder="Choose a client..." className="mt-2" />
            </div>
            <div>
              <Label htmlFor="bidAmount">Bid Amount</Label>
              <Input id="bidAmount" type="number" placeholder="$8,500" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="bidDescription">Project Description</Label>
              <Input id="bidDescription" placeholder="Describe the project scope..." className="mt-2" />
            </div>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded text-sm">
            🎯 Bids can be converted to invoices once accepted!
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: "You're All Set!",
      description: "Start managing your business",
      icon: "🎉",
      content: (
        <div className="space-y-4 text-center">
          <p className="text-lg font-bold text-gray-900">Congratulations!</p>
          <p className="text-gray-700">
            You've learned the basics of ContractorPro. Now it's time to start using it for your business.
          </p>
          <div className="space-y-2 text-left mt-4">
            <p className="font-bold">Next steps:</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✓ Add more clients</li>
              <li>✓ Create your first invoice</li>
              <li>✓ Set up employee tracking</li>
              <li>✓ Enable customer financing</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success("Onboarding complete! Welcome to ContractorPro!");
    }
  };

  const handleSkip = () => {
    toast.info("You can access this tutorial anytime from Settings");
  };

  const progress = ((completedSteps.length + 1) / steps.length) * 100;
  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </p>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip Tutorial
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{step.icon}</div>
              <div>
                <CardTitle className="text-2xl">{step.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>{step.content}</CardContent>
        </Card>

        {/* Steps Navigation */}
        <div className="flex gap-2 mb-8">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-colors ${
                i === currentStep
                  ? "bg-blue-600 text-white"
                  : completedSteps.includes(i)
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {completedSteps.includes(i) ? <CheckCircle className="h-4 w-4 mx-auto" /> : i + 1}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
              Back
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1 gap-2">
            {currentStep === steps.length - 1 ? "Complete" : "Next"}
            {currentStep < steps.length - 1 && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm font-bold text-yellow-900 flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4" />
            Pro Tip
          </p>
          <p className="text-sm text-yellow-800">
            {currentStep === 0 && "Complete this tutorial to unlock a $50 credit for SMS notifications!"}
            {currentStep === 1 && "Use AI to auto-generate invoice descriptions and save time."}
            {currentStep === 2 && "Import clients from CSV to save time if you have many clients."}
            {currentStep === 3 && "Stripe is the most popular payment method among contractors."}
            {currentStep === 4 && "Send bids with custom terms and payment plans to increase acceptance rates."}
            {currentStep === 5 && "Check out our blog for tips on growing your contracting business."}
          </p>
        </div>
      </div>
    </div>
  );
}
