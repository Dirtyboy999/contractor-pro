import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Download, Zap, Lock, Wifi, Bell } from "lucide-react";

export default function MobileApp() {
  const mobileFeatures = [
    {
      title: "Offline Functionality",
      description: "Work without internet connection - data syncs when online",
      icon: "📱",
      benefits: [
        "Create invoices offline",
        "Track time without connection",
        "View project details anywhere",
        "Auto-sync when online",
      ],
    },
    {
      title: "Geofencing Time Tracking",
      description: "Automatic clock in/out when arriving at job sites",
      icon: "📍",
      benefits: [
        "Accurate time tracking",
        "No manual clock in/out",
        "GPS location verification",
        "Crew accountability",
      ],
    },
    {
      title: "Push Notifications",
      description: "Real-time alerts for invoices, payments, and messages",
      icon: "🔔",
      benefits: [
        "Never miss a payment",
        "Instant client messages",
        "Project updates",
        "Customizable alerts",
      ],
    },
    {
      title: "Biometric Authentication",
      description: "Secure login with fingerprint or face recognition",
      icon: "🔐",
      benefits: [
        "Fast, secure access",
        "No password needed",
        "Protect sensitive data",
        "Enterprise security",
      ],
    },
  ];

  const platforms = [
    {
      name: "iOS",
      status: "Available Now",
      icon: "🍎",
      rating: "4.8/5",
      reviews: "2,340 reviews",
      link: "#",
    },
    {
      name: "Android",
      status: "Available Now",
      icon: "🤖",
      rating: "4.7/5",
      reviews: "1,890 reviews",
      link: "#",
    },
    {
      name: "Web PWA",
      status: "Available Now",
      icon: "🌐",
      rating: "4.9/5",
      reviews: "3,120 reviews",
      link: "#",
    },
  ];

  const screenshots = [
    {
      title: "Dashboard",
      description: "View key metrics and quick actions at a glance",
      image: "📊",
    },
    {
      title: "Time Tracking",
      description: "Clock in/out with one tap, automatic geofencing",
      image: "⏱️",
    },
    {
      title: "Invoices",
      description: "Create and send invoices directly from your phone",
      image: "📄",
    },
    {
      title: "Messages",
      description: "Communicate with clients and team in real-time",
      image: "💬",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg">
        <div className="flex items-center gap-4">
          <Smartphone className="h-16 w-16" />
          <div>
            <h1 className="text-4xl font-bold">ContractorPro Mobile App</h1>
            <p className="text-lg opacity-90 mt-2">
              Manage your business from anywhere, anytime
            </p>
          </div>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map((platform, i) => (
          <Card key={i} className="text-center">
            <CardContent className="pt-6">
              <p className="text-4xl mb-2">{platform.icon}</p>
              <p className="font-bold text-lg mb-1">{platform.name}</p>
              <Badge className="mb-3">{platform.status}</Badge>
              <div className="mb-4">
                <p className="text-sm font-bold text-yellow-600">{platform.rating}</p>
                <p className="text-xs text-muted-foreground">{platform.reviews}</p>
              </div>
              <Button className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Features */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Mobile Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mobileFeatures.map((feature, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span>{feature.icon}</span>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Screenshots */}
      <div>
        <h2 className="text-2xl font-bold mb-4">App Screenshots</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {screenshots.map((screenshot, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-6xl mb-3">{screenshot.image}</p>
                  <p className="font-bold text-sm mb-1">{screenshot.title}</p>
                  <p className="text-xs text-muted-foreground">{screenshot.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* PWA Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Progressive Web App (PWA)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Use ContractorPro as a web app with native app features. Install directly to your
            home screen without app store downloads.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded border">
              <p className="font-bold text-sm mb-1">💾 Offline Access</p>
              <p className="text-xs text-muted-foreground">
                Work without internet, sync when online
              </p>
            </div>
            <div className="p-3 bg-white rounded border">
              <p className="font-bold text-sm mb-1">⚡ Lightning Fast</p>
              <p className="text-xs text-muted-foreground">
                Instant loading and smooth performance
              </p>
            </div>
            <div className="p-3 bg-white rounded border">
              <p className="font-bold text-sm mb-1">🔔 Notifications</p>
              <p className="text-xs text-muted-foreground">
                Push notifications like native apps
              </p>
            </div>
          </div>
          <Button className="gap-2">
            <span>➕</span>
            Install as App
          </Button>
        </CardContent>
      </Card>

      {/* Compatibility */}
      <Card>
        <CardHeader>
          <CardTitle>Device Compatibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-bold mb-3">iOS</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  iPhone 12 and newer
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  iPad (5th generation and newer)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  iOS 14 or later
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-3">Android</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Android 8.0 or later
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Most modern Android phones
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Tablets supported
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold mb-2">Download Now</h3>
          <p className="mb-4 opacity-90">
            Get the mobile app and manage your contracting business on the go.
          </p>
          <div className="flex gap-3">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 gap-2">
              <span>🍎</span>
              App Store
            </Button>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 gap-2">
              <span>🤖</span>
              Play Store
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
