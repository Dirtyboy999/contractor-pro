import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Star, TrendingUp, Users, Zap } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function LandingPage() {
  const testimonials = [
    {
      name: "Mike Johnson",
      company: "Johnson Plumbing",
      text: "ContractorPro saved us 10+ hours per week on invoicing and payments. Our cash flow improved immediately.",
      rating: 5,
    },
    {
      name: "Sarah Williams",
      company: "Elite Roofing",
      text: "The employee geofencing and time tracking features are game-changers. We know exactly where our crew is and how long they work.",
      rating: 5,
    },
    {
      name: "David Martinez",
      company: "Martinez Construction",
      text: "Customer financing through ContractorPro increased our closing rate by 30%. Clients love the flexible payment options.",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "Smart Invoicing",
      description: "Create professional invoices in seconds with AI-powered descriptions and automatic calculations",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      title: "Real-Time Analytics",
      description: "Track revenue, profitability, and cash flow with AI insights and predictive forecasting",
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Employee Tracking",
      description: "GPS geofencing automatically clocks employees in/out and tracks hours on job sites",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-orange-600" />,
      title: "Customer Financing",
      description: "Get paid instantly while customers finance their projects through Affirm, Klarna, or LendingClub",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">ContractorPro</div>
          <nav className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600">Pricing</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600">Testimonials</a>
          </nav>
          <Button asChild>
            <a href={getLoginUrl()}>Sign In</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
          Contractor Management Made Simple
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Manage invoices, bids, payments, and your entire team from one platform. Get paid faster, work smarter, scale bigger.
        </p>
        <div className="flex gap-4 justify-center mb-12">
          <Button size="lg" asChild>
            <a href={getLoginUrl()}>Start Free 14-Day Trial</a>
          </Button>
          <Button size="lg" variant="outline">Watch Demo</Button>
        </div>
        <div className="text-sm text-gray-600">
          ✓ No credit card required • ✓ Full Pro access • ✓ Cancel anytime
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Powerful Features for Growing Contractors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Why Contractors Choose ContractorPro</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">50%</div>
            <p className="text-gray-700">Faster invoicing and billing</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">30%</div>
            <p className="text-gray-700">Increase in closing rates with financing</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">10+</div>
            <p className="text-gray-700">Hours saved per week on admin</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Affordable Pricing for Every Contractor</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Basic", price: "$9", features: ["Unlimited invoices", "Client management", "Basic reports"] },
              { name: "Elite", price: "$29", features: ["Everything in Basic", "Payments", "Time tracking", "Employee tracking"], highlight: true },
              { name: "Pro", price: "$59", features: ["Everything in Elite", "Payroll", "AI insights", "Customer financing"] },
            ].map((plan, i) => (
              <Card key={i} className={plan.highlight ? "ring-2 ring-blue-500 md:scale-105" : ""}>
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mt-2">{plan.price}<span className="text-lg text-gray-600">/mo</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.highlight ? "default" : "outline"} asChild>
                    <a href={getLoginUrl()}>Start Free Trial</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">What Contractors Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Contracting Business?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of contractors already using ContractorPro to streamline their operations and grow their revenue.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href={getLoginUrl()}>Start Your Free 14-Day Trial <ArrowRight className="ml-2 h-5 w-5" /></a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">ContractorPro</h4>
              <p className="text-sm">The all-in-one platform for contractor management.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="/pricing" className="hover:text-white">Plans</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 ContractorPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
