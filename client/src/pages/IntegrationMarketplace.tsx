import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function IntegrationMarketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>(["slack"]);

  const integrations = [
    {
      id: "quickbooks",
      name: "QuickBooks",
      category: "Accounting",
      description: "Sync invoices and payments directly to QuickBooks for seamless accounting",
      icon: "📊",
      status: "available",
      rating: 4.8,
      users: "2,400+",
      features: ["Invoice sync", "Payment tracking", "Expense sync", "Tax reporting"],
    },
    {
      id: "slack",
      name: "Slack",
      category: "Communication",
      description: "Get notifications for new invoices, payments, and client messages in Slack",
      icon: "💬",
      status: "connected",
      rating: 4.9,
      users: "1,800+",
      features: ["Invoice notifications", "Payment alerts", "Team messaging", "Custom workflows"],
    },
    {
      id: "zapier",
      name: "Zapier",
      category: "Automation",
      description: "Connect ContractorPro to 5,000+ apps with Zapier automation",
      icon: "⚡",
      status: "available",
      rating: 4.7,
      users: "3,200+",
      features: ["Workflow automation", "Data sync", "Conditional logic", "Multi-step actions"],
    },
    {
      id: "stripe",
      name: "Stripe",
      category: "Payments",
      description: "Accept credit card payments directly in ContractorPro",
      icon: "💳",
      status: "connected",
      rating: 4.9,
      users: "4,500+",
      features: ["Credit cards", "ACH transfers", "Recurring billing", "Invoicing"],
    },
    {
      id: "google-drive",
      name: "Google Drive",
      category: "Storage",
      description: "Store and access project documents in Google Drive",
      icon: "📁",
      status: "available",
      rating: 4.6,
      users: "1,200+",
      features: ["File storage", "Sharing", "Collaboration", "Version control"],
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      category: "Email Marketing",
      description: "Send email campaigns to your clients and contractors",
      icon: "📧",
      status: "available",
      rating: 4.5,
      users: "900+",
      features: ["Email campaigns", "Automation", "Templates", "Analytics"],
    },
    {
      id: "asana",
      name: "Asana",
      category: "Project Management",
      description: "Manage projects and tasks in Asana, synced with ContractorPro",
      icon: "✓",
      status: "available",
      rating: 4.7,
      users: "1,100+",
      features: ["Task management", "Timeline view", "Team collaboration", "Progress tracking"],
    },
    {
      id: "freshbooks",
      name: "FreshBooks",
      category: "Accounting",
      description: "Sync with FreshBooks for comprehensive accounting management",
      icon: "📈",
      status: "available",
      rating: 4.6,
      users: "850+",
      features: ["Invoice sync", "Expense tracking", "Reporting", "Tax prep"],
    },
  ];

  const filteredIntegrations = integrations.filter((int) =>
    int.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    int.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    const aConnected = connectedIntegrations.includes(a.id) ? 0 : 1;
    const bConnected = connectedIntegrations.includes(b.id) ? 0 : 1;
    return aConnected - bConnected;
  });

  const handleConnect = (id: string) => {
    if (connectedIntegrations.includes(id)) {
      setConnectedIntegrations(connectedIntegrations.filter((i) => i !== id));
      toast.success("Integration disconnected");
    } else {
      setConnectedIntegrations([...connectedIntegrations, id]);
      toast.success("Integration connected successfully!");
    }
  };

  const categories = ["All", ...Array.from(new Set(integrations.map((i) => i.category)))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Integration Marketplace</h1>
        <p className="text-muted-foreground mt-2">
          Connect ContractorPro with your favorite tools and services
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search integrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Connected Integrations Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm font-bold text-blue-900 mb-2">
            Connected Integrations: {connectedIntegrations.length}
          </p>
          <div className="flex flex-wrap gap-2">
            {connectedIntegrations.map((id) => {
              const int = integrations.find((i) => i.id === id);
              return (
                <Badge key={id} variant="secondary" className="bg-blue-100 text-blue-800">
                  {int?.icon} {int?.name}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id} className={connectedIntegrations.includes(integration.id) ? "ring-2 ring-green-500" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{integration.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {integration.category}
                    </Badge>
                  </div>
                </div>
                {connectedIntegrations.includes(integration.id) && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">{integration.description}</p>

              <div>
                <p className="text-xs font-bold text-gray-600 mb-2">Features:</p>
                <ul className="space-y-1">
                  {integration.features.map((feature, i) => (
                    <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                  {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>⭐ {integration.rating} ({integration.users} users)</span>
              </div>

              <Button
                onClick={() => handleConnect(integration.id)}
                variant={connectedIntegrations.includes(integration.id) ? "outline" : "default"}
                className="w-full"
              >
                {connectedIntegrations.includes(integration.id) ? "Disconnect" : "Connect"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coming Soon */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-4">
            We're constantly adding new integrations. Here's what's coming:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-gray-400">○</span> Microsoft Teams
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">○</span> HubSpot CRM
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">○</span> Xero Accounting
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">○</span> Wave Accounting
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Custom Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Need a Custom Integration?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-700">
            Our API allows you to build custom integrations with any service. Check out our developer documentation.
          </p>
          <Button variant="outline" className="gap-2">
            View API Documentation <ExternalLink className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
