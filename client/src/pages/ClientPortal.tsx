import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useRoute } from "wouter";
import { FileText, DollarSign, CheckCircle } from "lucide-react";

export default function ClientPortal() {
  const [match, params] = useRoute("/portal/:token");
  const token = params?.token || "";

  // In a real app, you would fetch client data using the token
  const mockInvoices = [
    { id: 1, number: "INV-1001", amount: 2500, status: "paid", dueDate: "2024-01-15" },
    { id: 2, number: "INV-1002", amount: 3200, status: "pending", dueDate: "2024-02-15" },
  ];

  const mockBids = [
    { id: 1, number: "EST-1001", amount: 5000, status: "accepted", validUntil: "2024-02-01" },
  ];

  if (!match) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Project Portal</h1>
          <p className="text-gray-600 mt-2">View your invoices, bids, and project progress</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockInvoices.length}</div>
              <p className="text-xs text-muted-foreground">Invoices sent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Amount Due</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,200</div>
              <p className="text-xs text-muted-foreground">Pending payment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accepted Bids</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockBids.filter(b => b.status === "accepted").length}</div>
              <p className="text-xs text-muted-foreground">Active projects</p>
            </CardContent>
          </Card>
        </div>

        {/* Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Your Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{invoice.number}</p>
                    <p className="text-sm text-muted-foreground">Due: {invoice.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${invoice.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      invoice.status === "paid" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bids */}
        <Card>
          <CardHeader>
            <CardTitle>Your Bids/Estimates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBids.map((bid) => (
                <div key={bid.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{bid.number}</p>
                    <p className="text-sm text-muted-foreground">Valid until: {bid.validUntil}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${bid.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      bid.status === "accepted" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {bid.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5"></div>
                  <div>
                    <p className="font-medium">Phase 1: Preparation</p>
                    <p className="text-sm text-muted-foreground">Completed - Site preparation and material delivery</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5"></div>
                  <div>
                    <p className="font-medium">Phase 2: Main Work</p>
                    <p className="text-sm text-muted-foreground">In Progress - Primary construction/installation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-gray-300 mt-1.5"></div>
                  <div>
                    <p className="font-medium">Phase 3: Finishing</p>
                    <p className="text-sm text-muted-foreground">Not Started - Final touches and cleanup</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Button */}
        <Button size="lg" className="w-full">
          Make Payment
        </Button>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground mt-8">
          <p>Questions? Contact us for support</p>
        </div>
      </div>
    </div>
  );
}
