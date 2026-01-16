import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Phone, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SMSNotifications() {
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [invoiceNotifications, setInvoiceNotifications] = useState(true);
  const [bidNotifications, setBidNotifications] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 123-4567");

  const handleSaveSettings = () => {
    toast.success("SMS notification settings saved!");
  };

  const smsHistory = [
    {
      id: 1,
      type: "Payment Reminder",
      message: "Invoice INV-001 is due tomorrow. Pay now: link",
      recipient: "+1 (555) 123-4567",
      status: "delivered",
      date: "Jan 15, 2024 2:30 PM",
    },
    {
      id: 2,
      type: "Invoice Sent",
      message: "Invoice INV-001 sent for $5,000. View: link",
      recipient: "+1 (555) 123-4567",
      status: "delivered",
      date: "Jan 14, 2024 10:15 AM",
    },
    {
      id: 3,
      type: "Payment Received",
      message: "Payment of $5,000 received for INV-001. Thank you!",
      recipient: "+1 (555) 123-4567",
      status: "delivered",
      date: "Jan 10, 2024 3:45 PM",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="h-8 w-8 text-blue-600" />
          SMS Notifications
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage SMS notifications for invoices, payments, and project updates
        </p>
      </div>

      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SMS Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-bold">Enable SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive SMS updates for important business events
                  </p>
                </div>
                <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
              </div>

              {smsEnabled && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      SMS will be sent to this number. Standard message rates may apply.
                    </p>
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <p className="font-bold">Notification Types</p>

                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Payment Reminders</p>
                        <p className="text-sm text-muted-foreground">
                          Remind customers before invoices are due
                        </p>
                      </div>
                      <Switch checked={paymentReminders} onCheckedChange={setPaymentReminders} />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Invoice Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Notify when invoices are sent or viewed
                        </p>
                      </div>
                      <Switch checked={invoiceNotifications} onCheckedChange={setInvoiceNotifications} />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Bid Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Notify when bids are sent or accepted
                        </p>
                      </div>
                      <Switch checked={bidNotifications} onCheckedChange={setBidNotifications} />
                    </div>
                  </div>
                </div>
              )}

              <Button onClick={handleSaveSettings} className="w-full">
                Save SMS Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMS Credits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">Current Balance</p>
                  <p className="text-sm text-muted-foreground">SMS credits remaining</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">250</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                <p className="text-blue-900">
                  Each SMS costs 1 credit. Recharge automatically when balance is low.
                </p>
              </div>
              <Button variant="outline" className="w-full">
                Buy SMS Credits
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Payment Reminder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gray-50 rounded text-sm">
                  Invoice INV-001 is due tomorrow. Pay now: {"{payment_link}"}
                </div>
                <Button variant="outline" size="sm">Edit Template</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Invoice Sent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gray-50 rounded text-sm">
                  Invoice INV-001 sent for ${"{amount}"}. View: {"{invoice_link}"}
                </div>
                <Button variant="outline" size="sm">Edit Template</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Payment Received</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gray-50 rounded text-sm">
                  Payment of ${"{amount}"} received for INV-001. Thank you!
                </div>
                <Button variant="outline" size="sm">Edit Template</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Bid Sent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gray-50 rounded text-sm">
                  Bid BID-001 sent for ${"{amount}"}. View: {"{bid_link}"}
                </div>
                <Button variant="outline" size="sm">Edit Template</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SMS Delivery History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {smsHistory.map((sms) => (
                  <div key={sms.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold">{sms.type}</p>
                        <p className="text-sm text-muted-foreground">{sms.recipient}</p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs font-bold">Delivered</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{sms.message}</p>
                    <p className="text-xs text-muted-foreground">{sms.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
