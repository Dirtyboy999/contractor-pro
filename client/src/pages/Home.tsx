import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, BarChart3, Users, Zap, Clock } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">ContractorPro</div>
          <Button asChild>
            <a href={getLoginUrl()}>Sign In</a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Manage Your Contracting Business Like a Pro
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Invoices, bids, scheduling, payments, and team management all in one powerful platform
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <a href={getLoginUrl()}>Get Started Free</a>
          </Button>
          <Button size="lg" variant="outline">
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Invoicing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Create and send professional invoices in seconds</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Smart crew assignment and route optimization</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Team Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Manage crew members and track performance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Accept payments and track cash flow</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ContractorPro?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Save 5+ hours per week on administrative tasks",
              "Increase revenue with better project management",
              "Reduce scheduling conflicts with smart assignment",
              "Get paid faster with online payment options",
              "Track crew utilization and productivity",
              "Make data-driven business decisions",
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-8 opacity-90">Join hundreds of contractors using ContractorPro</p>
          <Button size="lg" variant="secondary" asChild>
            <a href={getLoginUrl()}>
              Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 ContractorPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
