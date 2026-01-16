import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, TrendingUp, DollarSign, Users, Share2, Download, BarChart3 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AffiliateProgram() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const affiliateLink = "https://contractorpro.com/ref/contractor-123";
  const commissionRate = 30; // 30% recurring commission

  const stats = [
    { label: "Total Referrals", value: "12", icon: "👥" },
    { label: "Active Affiliates", value: "8", icon: "🎯" },
    { label: "Lifetime Earnings", value: "$4,320", icon: "💰" },
    { label: "Conversion Rate", value: "18%", icon: "📈" },
  ];

  const recentReferrals = [
    {
      id: 1,
      name: "ABC Plumbing",
      email: "john@abcplumbing.com",
      plan: "Pro",
      status: "Active",
      joinDate: "2024-01-15",
      earnings: "$59/month",
    },
    {
      id: 2,
      name: "Chen Electric",
      email: "mike@chenelectric.com",
      plan: "Elite",
      status: "Active",
      joinDate: "2024-01-10",
      earnings: "$29/month",
    },
    {
      id: 3,
      name: "Rodriguez Landscaping",
      email: "lisa@rodriguezlandscape.com",
      plan: "Pro",
      status: "Active",
      joinDate: "2024-01-05",
      earnings: "$59/month",
    },
    {
      id: 4,
      name: "Wilson HVAC",
      email: "james@wilsonhvac.com",
      plan: "Basic",
      status: "Pending",
      joinDate: "2024-01-20",
      earnings: "$0/month",
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    toast.success("Affiliate link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const earningsData = [
    { month: "Nov", earnings: 300 },
    { month: "Dec", earnings: 650 },
    { month: "Jan", earnings: 1200 },
    { month: "Feb", earnings: 1800 },
    { month: "Mar", earnings: 2400 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Affiliate Program</h1>
        <p className="text-muted-foreground mt-2">
          Earn recurring commissions by referring contractors to ContractorPro
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <p className="text-2xl mb-2">{stat.icon}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Affiliate Link */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle>Your Affiliate Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-700">
            Share this link with contractors. You'll earn 30% recurring commission for every referral that signs up.
          </p>
          <div className="flex gap-2">
            <Input value={affiliateLink} readOnly className="bg-white" />
            <Button onClick={handleCopyLink} variant="outline" className="gap-2">
              <Copy className="h-4 w-4" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <div className="p-3 bg-blue-100 border border-blue-300 rounded text-sm text-blue-900">
            💡 Tip: Share your link on social media, in contractor groups, and on your website to maximize referrals.
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <Button
          variant={activeTab === "overview" ? "default" : "ghost"}
          onClick={() => setActiveTab("overview")}
          className="rounded-none border-b-2"
        >
          Overview
        </Button>
        <Button
          variant={activeTab === "referrals" ? "default" : "ghost"}
          onClick={() => setActiveTab("referrals")}
          className="rounded-none border-b-2"
        >
          Referrals
        </Button>
        <Button
          variant={activeTab === "earnings" ? "default" : "ghost"}
          onClick={() => setActiveTab("earnings")}
          className="rounded-none border-b-2"
        >
          Earnings
        </Button>
        <Button
          variant={activeTab === "materials" ? "default" : "ghost"}
          onClick={() => setActiveTab("materials")}
          className="rounded-none border-b-2"
        >
          Marketing Materials
        </Button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="text-3xl">1️⃣</div>
                <div>
                  <p className="font-bold">Share Your Link</p>
                  <p className="text-sm text-muted-foreground">
                    Share your unique affiliate link with contractors you know.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">2️⃣</div>
                <div>
                  <p className="font-bold">They Sign Up</p>
                  <p className="text-sm text-muted-foreground">
                    When they click your link and sign up, they're attributed to you.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">3️⃣</div>
                <div>
                  <p className="font-bold">You Earn Commission</p>
                  <p className="text-sm text-muted-foreground">
                    Earn 30% of their monthly subscription for as long as they're a customer.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">4️⃣</div>
                <div>
                  <p className="font-bold">Get Paid</p>
                  <p className="text-sm text-muted-foreground">
                    Commissions are paid monthly via PayPal, Stripe, or bank transfer.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commission Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="font-bold text-lg">30%</p>
                  <p className="text-sm text-muted-foreground">Recurring Commission</p>
                  <p className="text-xs text-gray-600 mt-2">Earn 30% of every referral's monthly subscription</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="font-bold text-lg">Lifetime</p>
                  <p className="text-sm text-muted-foreground">Recurring Revenue</p>
                  <p className="text-xs text-gray-600 mt-2">Keep earning as long as they're a customer</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="font-bold text-lg">Unlimited</p>
                  <p className="text-sm text-muted-foreground">Referrals</p>
                  <p className="text-xs text-gray-600 mt-2">No cap on how many you can refer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example Earnings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>1 Pro referral ($59/month)</span>
                <span className="font-bold">$17.70/month</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>5 Elite referrals ($29/month each)</span>
                <span className="font-bold">$43.50/month</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-200">
                <span className="font-bold">10 referrals (mixed plans)</span>
                <span className="font-bold text-lg">$147/month</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Referrals Tab */}
      {activeTab === "referrals" && (
        <Card>
          <CardHeader>
            <CardTitle>Your Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Company</th>
                    <th className="text-left py-2 px-2">Plan</th>
                    <th className="text-left py-2 px-2">Status</th>
                    <th className="text-left py-2 px-2">Join Date</th>
                    <th className="text-left py-2 px-2">Monthly Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReferrals.map((referral) => (
                    <tr key={referral.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <p className="font-bold">{referral.name}</p>
                        <p className="text-xs text-muted-foreground">{referral.email}</p>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant="outline">{referral.plan}</Badge>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={referral.status === "Active" ? "default" : "secondary"}>
                          {referral.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">{referral.joinDate}</td>
                      <td className="py-3 px-2 font-bold">{referral.earnings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Earnings Tab */}
      {activeTab === "earnings" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold">$2,400</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Last Month</p>
                    <p className="text-2xl font-bold">$1,800</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Lifetime</p>
                    <p className="text-2xl font-bold">$4,320</p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-bold text-green-900 mb-2">💰 Next Payout</p>
                  <p className="text-lg font-bold text-green-900">$2,400</p>
                  <p className="text-xs text-green-800">Scheduled for March 1st via PayPal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Earnings Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {earningsData.map((data, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-bold">{data.month}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-green-600 h-full"
                        style={{ width: `${(data.earnings / 2400) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-20 text-right font-bold">${data.earnings}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Marketing Materials Tab */}
      {activeTab === "materials" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Use these materials to promote ContractorPro and attract referrals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border">
                  <CardContent className="pt-6">
                    <p className="font-bold mb-2">Email Template</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ready-to-send email you can customize and send to your network.
                    </p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="pt-6">
                    <p className="font-bold mb-2">Social Media Posts</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Pre-written posts for LinkedIn, Facebook, and Twitter.
                    </p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="pt-6">
                    <p className="font-bold mb-2">Banner Ads</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      300x250 and 728x90 banner ads for your website.
                    </p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="pt-6">
                    <p className="font-bold mb-2">Pitch Deck</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Presentation slides highlighting ContractorPro benefits.
                    </p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <p className="font-bold mb-2">Need Custom Materials?</p>
              <p className="text-sm text-muted-foreground mb-4">
                Our marketing team can create custom materials tailored to your audience.
              </p>
              <Button>Request Custom Materials</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
