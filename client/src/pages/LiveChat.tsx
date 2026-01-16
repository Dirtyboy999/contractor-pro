import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Clock, CheckCircle, TrendingUp, Award } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LiveChat() {
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([
    { id: 1, sender: "support", text: "Hi! How can we help you today?", time: "2 min ago" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const caseStudies = [
    {
      id: 1,
      company: "Johnson Plumbing",
      owner: "Sarah Johnson",
      challenge: "Manual invoicing taking 8 hours/week",
      solution: "Implemented ContractorPro invoicing system",
      results: {
        timeReduction: "85%",
        revenueIncrease: "$45,000/year",
        clientSatisfaction: "98%",
      },
      testimonial:
        "ContractorPro transformed our business. We went from spreadsheets to a professional system in one day. My team loves it!",
      metrics: [
        { label: "Time Saved", value: "6.8 hrs/week" },
        { label: "Revenue Growth", value: "+$45K/year" },
        { label: "Client Satisfaction", value: "98%" },
        { label: "Payment Speed", value: "+3 days faster" },
      ],
    },
    {
      id: 2,
      company: "Chen Electric",
      owner: "Mike Chen",
      challenge: "No visibility into employee location and hours",
      solution: "Deployed geofencing and time tracking",
      results: {
        timeReduction: "12 hrs/week saved",
        revenueIncrease: "$78,000/year",
        clientSatisfaction: "99%",
      },
      testimonial:
        "The geofencing feature alone is worth the subscription. I can now track my team's location and hours automatically. No more disputes!",
      metrics: [
        { label: "Hours Tracked", value: "100% accurate" },
        { label: "Payroll Time", value: "-4 hrs/week" },
        { label: "Project Efficiency", value: "+32%" },
        { label: "Revenue per Employee", value: "+$18K/year" },
      ],
    },
    {
      id: 3,
      company: "Rodriguez Landscaping",
      owner: "Lisa Rodriguez",
      challenge: "Customers unable to afford large projects",
      solution: "Enabled customer financing options",
      results: {
        timeReduction: "0 hrs (no time impact)",
        revenueIncrease: "$156,000/year",
        clientSatisfaction: "97%",
      },
      testimonial:
        "Customer financing increased our average project size by 40%. We're now taking on jobs we couldn't before!",
      metrics: [
        { label: "Avg Project Size", value: "+40%" },
        { label: "Revenue Growth", value: "+$156K/year" },
        { label: "Customer Approval Rate", value: "87%" },
        { label: "New Customers", value: "+45%" },
      ],
    },
    {
      id: 4,
      company: "Wilson HVAC",
      owner: "James Wilson",
      challenge: "Spending 10 hours/week on proposals",
      solution: "Implemented AI-powered bid generation",
      results: {
        timeReduction: "90%",
        revenueIncrease: "$62,000/year",
        clientSatisfaction: "96%",
      },
      testimonial:
        "The AI assistant saves me hours every week. It generates professional proposals in seconds. This is the future!",
      metrics: [
        { label: "Proposal Time", value: "-9 hrs/week" },
        { label: "Win Rate", value: "+28%" },
        { label: "Revenue Increase", value: "+$62K/year" },
        { label: "Client Response Time", value: "-2 days" },
      ],
    },
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      { id: messages.length + 1, sender: "user", text: newMessage, time: "now" },
    ]);
    setNewMessage("");
    toast.success("Message sent!");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "support",
          text: "Thanks for your message! Our team will get back to you shortly.",
          time: "1 sec ago",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Support & Success Stories</h1>
        <p className="text-muted-foreground mt-2">
          Get help from our team and learn from contractor success stories
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <Button
          variant={activeTab === "chat" ? "default" : "ghost"}
          onClick={() => setActiveTab("chat")}
          className="rounded-none border-b-2"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Live Chat
        </Button>
        <Button
          variant={activeTab === "cases" ? "default" : "ghost"}
          onClick={() => setActiveTab("cases")}
          className="rounded-none border-b-2"
        >
          <Award className="h-4 w-4 mr-2" />
          Case Studies
        </Button>
      </div>

      {/* Chat Tab */}
      {activeTab === "chat" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Window */}
          <div className="lg:col-span-2">
            <Card className="h-96 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  Live Chat Support
                  <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Online
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="border-t p-4 flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Support Info */}
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <p className="font-bold">Response Time</p>
                </div>
                <p className="text-2xl font-bold">2 min</p>
                <p className="text-xs text-muted-foreground">Average response time</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="font-bold">Satisfaction</p>
                </div>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-xs text-muted-foreground">Customer satisfaction rate</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <p className="font-bold mb-2">📞 Need urgent help?</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Call our support team at 1-800-CONTRACTOR
                </p>
                <Button size="sm" className="w-full">
                  Schedule Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Case Studies Tab */}
      {activeTab === "cases" && (
        <div className="space-y-6">
          {caseStudies.map((study) => (
            <Card key={study.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{study.company}</CardTitle>
                    <p className="text-sm opacity-90 mt-1">Owner: {study.owner}</p>
                  </div>
                  <TrendingUp className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Challenge</p>
                    <p className="font-bold text-sm">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Solution</p>
                    <p className="font-bold text-sm">{study.solution}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue Impact</p>
                    <p className="font-bold text-lg text-green-600">{study.results.revenueIncrease}</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg italic">
                  "{study.testimonial}"
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0">
            <CardContent className="pt-6 text-center">
              <p className="text-xl font-bold mb-2">Your Success Story Could Be Next</p>
              <p className="mb-4 opacity-90">Join 340+ contractors already transforming their business</p>
              <Button variant="secondary" size="lg">
                Start Your Free Trial
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
