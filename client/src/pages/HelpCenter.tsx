import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Play, HelpCircle, MessageCircle, Mail } from "lucide-react";
import { useState } from "react";

export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const articles = [
    {
      id: 1,
      title: "Getting Started with ContractorPro",
      category: "getting-started",
      views: 2400,
      helpful: 98,
      excerpt: "Learn the basics of setting up your account and creating your first invoice.",
    },
    {
      id: 2,
      title: "How to Create and Send Invoices",
      category: "invoicing",
      views: 3200,
      helpful: 99,
      excerpt: "Step-by-step guide to creating professional invoices and sending them to clients.",
    },
    {
      id: 3,
      title: "Setting Up Payment Methods",
      category: "payments",
      views: 1800,
      helpful: 97,
      excerpt: "Connect Stripe, PayPal, Chime, and other payment methods to your account.",
    },
    {
      id: 4,
      title: "Managing Your Team and Employees",
      category: "team",
      views: 1600,
      helpful: 96,
      excerpt: "Add team members, set permissions, and manage employee tracking.",
    },
    {
      id: 5,
      title: "Using AI Assistant Features",
      category: "ai",
      views: 2100,
      helpful: 99,
      excerpt: "Leverage AI to generate invoice descriptions, bids, and client communications.",
    },
    {
      id: 6,
      title: "Employee Geofencing Setup",
      category: "team",
      views: 1400,
      helpful: 98,
      excerpt: "Set up geofences for job sites and track employee location and hours.",
    },
    {
      id: 7,
      title: "Understanding Your Analytics",
      category: "analytics",
      views: 900,
      helpful: 95,
      excerpt: "Interpret revenue trends, user growth, and business metrics.",
    },
    {
      id: 8,
      title: "Integrating with QuickBooks",
      category: "integrations",
      views: 1200,
      helpful: 97,
      excerpt: "Sync your invoices and payments with QuickBooks for accounting.",
    },
  ];

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, ACH bank transfers, eCheck, Chime, and more. You can enable any combination of these.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes! You can cancel your subscription anytime with no penalties. Your data will remain accessible for 30 days.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "Yes! We offer a 14-day free trial of our Pro plan with all features included. No credit card required.",
    },
    {
      question: "How does the referral program work?",
      answer:
        "When someone signs up with your referral link, you both get a free month of service. Unlimited referrals = unlimited free months!",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. We use bank-level encryption, regular security audits, and comply with GDPR and SOC 2 standards.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Yes. You can export all your data as CSV or JSON anytime. You own your data.",
    },
  ];

  const categories = [
    { id: "all", label: "All Articles" },
    { id: "getting-started", label: "Getting Started" },
    { id: "invoicing", label: "Invoicing" },
    { id: "payments", label: "Payments" },
    { id: "team", label: "Team & Employees" },
    { id: "ai", label: "AI Features" },
    { id: "analytics", label: "Analytics" },
    { id: "integrations", label: "Integrations" },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">Help Center</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Find answers, tutorials, and support resources
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search articles, tutorials, FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg cursor-pointer">
          <CardContent className="pt-6 text-center">
            <Play className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="font-bold">Video Tutorials</p>
            <p className="text-sm text-muted-foreground">Learn by watching</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg cursor-pointer">
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="font-bold">Documentation</p>
            <p className="text-sm text-muted-foreground">Detailed guides</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg cursor-pointer">
          <CardContent className="pt-6 text-center">
            <HelpCircle className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="font-bold">FAQs</p>
            <p className="text-sm text-muted-foreground">Common questions</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg cursor-pointer">
          <CardContent className="pt-6 text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="font-bold">Contact Support</p>
            <p className="text-sm text-muted-foreground">Get help fast</p>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.id)}
            size="sm"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Articles */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold">Knowledge Base</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg cursor-pointer transition-shadow">
              <CardContent className="pt-6">
                <p className="font-bold text-lg mb-2">{article.title}</p>
                <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>👁️ {article.views} views</span>
                  <span>👍 {article.helpful}% helpful</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <p className="font-bold mb-2">{faq.question}</p>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-bold text-lg mb-2">Can't find what you're looking for?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Our support team is here to help. Get a response within 24 hours.
          </p>
          <div className="flex gap-2">
            <Button className="gap-2">
              <Mail className="h-4 w-4" />
              Email Support
            </Button>
            <Button variant="outline">Live Chat</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
