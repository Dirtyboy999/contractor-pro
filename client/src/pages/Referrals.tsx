import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Mail, Share2, Gift, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Referrals() {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);

  const referralCode = "CONTRACTOR2024";
  const referralLink = `https://contractorpro.com/signup?ref=${referralCode}`;

  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalRewardMonths: 12,
    rewardMonthsRemaining: 3,
  };

  const referrals = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      status: "active",
      signupDate: "2024-01-15",
      plan: "Pro",
      rewardMonths: 1,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      status: "active",
      signupDate: "2024-01-20",
      plan: "Elite",
      rewardMonths: 1,
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike@example.com",
      status: "active",
      signupDate: "2024-02-01",
      plan: "Pro",
      rewardMonths: 1,
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@example.com",
      status: "pending",
      signupDate: "2024-02-10",
      plan: "Basic",
      rewardMonths: 0,
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareEmail = () => {
    const subject = "Check out ContractorPro - Manage your contracting business";
    const body = `I've been using ContractorPro and it's transformed how I manage my contracting business. You get a free month when you sign up with my referral link: ${referralLink}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Gift className="h-8 w-8 text-green-600" />
          Referral Program
        </h1>
        <p className="text-muted-foreground mt-2">Earn free months by referring contractors to ContractorPro</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="referrals">My Referrals</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Referrals</p>
                <p className="text-3xl font-bold mt-2">{referralStats.totalReferrals}</p>
                <p className="text-xs text-green-600 mt-2">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Active Referrals</p>
                <p className="text-3xl font-bold mt-2">{referralStats.activeReferrals}</p>
                <p className="text-xs text-blue-600 mt-2">Currently paying</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Reward Months</p>
                <p className="text-3xl font-bold mt-2">{referralStats.totalRewardMonths}</p>
                <p className="text-xs text-purple-600 mt-2">Earned so far</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Remaining Rewards</p>
                <p className="text-3xl font-bold mt-2">{referralStats.rewardMonthsRemaining}</p>
                <p className="text-xs text-orange-600 mt-2">Free months left</p>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle>How the Referral Program Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                  1
                </div>
                <div>
                  <p className="font-bold">Share Your Link</p>
                  <p className="text-sm text-muted-foreground">Copy your unique referral link and share it with contractors you know</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                  2
                </div>
                <div>
                  <p className="font-bold">They Sign Up</p>
                  <p className="text-sm text-muted-foreground">They click your link and sign up for a paid ContractorPro plan</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                  3
                </div>
                <div>
                  <p className="font-bold">You Both Get Rewarded</p>
                  <p className="text-sm text-muted-foreground">You get 1 free month, and they get 1 free month of their chosen plan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referral Link */}
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Link</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input value={referralLink} readOnly className="flex-1" />
                <Button onClick={handleCopyLink} size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button onClick={handleShareEmail} variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Share via Email
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on Social
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Referrals Tab */}
        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {referrals.map((referral) => (
                  <div key={referral.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold">{referral.name}</p>
                        <p className="text-sm text-muted-foreground">{referral.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        referral.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Signup Date</p>
                        <p className="font-bold">{referral.signupDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Plan</p>
                        <p className="font-bold">{referral.plan}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Reward Months</p>
                        <p className="font-bold">{referral.rewardMonths}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Rewards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Free Months Earned</p>
                <p className="text-4xl font-bold text-green-600 mt-2">{referralStats.totalRewardMonths}</p>
                <p className="text-sm text-gray-700 mt-2">Worth ${referralStats.totalRewardMonths * 59} in Pro plan value</p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-muted-foreground">Rewards Applied to Your Account</p>
                <p className="text-2xl font-bold text-blue-600 mt-2">{referralStats.totalRewardMonths - referralStats.rewardMonthsRemaining} months</p>
                <p className="text-sm text-gray-700 mt-2">Automatically applied to your subscription</p>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-muted-foreground">Remaining Rewards</p>
                <p className="text-2xl font-bold text-orange-600 mt-2">{referralStats.rewardMonthsRemaining} months</p>
                <p className="text-sm text-gray-700 mt-2">Will be applied to your next billing cycle</p>
              </div>
            </CardContent>
          </Card>

          {/* Reward History */}
          <Card>
            <CardHeader>
              <CardTitle>Reward History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 border-b">
                  <span>Referral from John Smith</span>
                  <span className="font-bold text-green-600">+1 month</span>
                </div>
                <div className="flex justify-between p-2 border-b">
                  <span>Referral from Sarah Johnson</span>
                  <span className="font-bold text-green-600">+1 month</span>
                </div>
                <div className="flex justify-between p-2 border-b">
                  <span>Referral from Mike Davis</span>
                  <span className="font-bold text-green-600">+1 month</span>
                </div>
                <div className="flex justify-between p-2">
                  <span>Applied to subscription (Jan 2024)</span>
                  <span className="font-bold text-blue-600">-3 months</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
