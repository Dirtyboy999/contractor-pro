import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, MessageSquare, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Testimonials() {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({ name: "", company: "", title: "", message: "" });

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "Johnson Plumbing",
      title: "Owner",
      rating: 5,
      message:
        "ContractorPro has transformed how I manage my business. I went from using spreadsheets to having a complete system in just one day. My invoicing time has been cut in half!",
      avatar: "👩‍💼",
      verified: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      company: "Chen Electric",
      title: "Owner",
      rating: 5,
      message:
        "The employee geofencing feature alone is worth the subscription. I can now track my team's location and hours automatically. No more disputes about time worked!",
      avatar: "👨‍💼",
      verified: true,
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      company: "Rodriguez Landscaping",
      title: "Manager",
      rating: 5,
      message:
        "Customer financing is a game-changer. My average project size has increased 40% since I started offering financing options. Highly recommend!",
      avatar: "👩‍🔬",
      verified: true,
    },
    {
      id: 4,
      name: "James Wilson",
      company: "Wilson HVAC",
      title: "Owner",
      rating: 5,
      message:
        "The AI assistant saves me hours every week. It generates professional invoice descriptions and bid proposals in seconds. This is the future of contracting!",
      avatar: "👨‍🏫",
      verified: true,
    },
    {
      id: 5,
      name: "Emma Davis",
      company: "Davis Construction",
      title: "Owner",
      rating: 5,
      message:
        "Finally, a platform designed for contractors by people who understand the business. The pricing is fair, the features are powerful, and the support is amazing.",
      avatar: "👩‍🎨",
      verified: true,
    },
    {
      id: 6,
      name: "David Martinez",
      company: "Martinez Roofing",
      title: "Owner",
      rating: 5,
      message:
        "I've tried Joist and other platforms. ContractorPro is superior in every way - better features, lower cost, and better customer service. Switched and never looked back!",
      avatar: "👨‍💻",
      verified: true,
    },
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.company || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Thank you for your review! It will be published after moderation.");
    setShowForm(false);
    setFormData({ name: "", company: "", title: "", message: "" });
    setRating(5);
  };

  const stats = [
    { label: "Active Users", value: "340+", icon: "👥" },
    { label: "Average Rating", value: "4.9/5", icon: "⭐" },
    { label: "Success Rate", value: "98%", icon: "✓" },
    { label: "Revenue Increase", value: "+45%", icon: "📈" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Customer Testimonials</h1>
        <p className="text-muted-foreground mt-2">
          See what contractors are saying about ContractorPro
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <p className="text-3xl mb-2">{stat.icon}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submit Review Button */}
      {!showForm && (
        <Button onClick={() => setShowForm(true)} size="lg" className="w-full">
          <MessageSquare className="h-4 w-4 mr-2" />
          Share Your Review
        </Button>
      )}

      {/* Review Form */}
      {showForm && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle>Share Your Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Your Company"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="title">Your Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Owner, Manager, etc."
                className="mt-2"
              />
            </div>

            <div>
              <Label>Rating</Label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRating(r)}
                    className={`text-2xl transition-transform ${rating >= r ? "scale-125" : "opacity-50"}`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="message">Your Review</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your experience with ContractorPro..."
                className="mt-2 h-24"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmit} className="flex-1">
                Submit Review
              </Button>
              <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div className="flex-1">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
                {testimonial.verified && (
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    ✓ Verified
                  </div>
                )}
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700">{testimonial.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
        <CardContent className="pt-6 text-center">
          <h3 className="text-xl font-bold mb-2">Join 340+ Contractors Using ContractorPro</h3>
          <p className="mb-4 opacity-90">Start your 14-day free trial today. No credit card required.</p>
          <Button variant="secondary" size="lg">
            Start Free Trial
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
