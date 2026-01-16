import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function NotificationSettings() {
  const { data: preferences, isLoading } = trpc.notifications.getPreferences.useQuery();
  const updatePreferencesMutation = trpc.notifications.updatePreferences.useMutation();
  
  const [settings, setSettings] = useState({
    emailOnPaymentReceived: true,
    emailOnPaymentOverdue: true,
    emailOnBidViewed: true,
    emailOnBidDecision: true,
    emailOnInvoiceSent: false,
    inAppNotifications: true,
    paymentReminderDaysBefore: 2,
  });

  useEffect(() => {
    if (preferences) {
      setSettings({
        emailOnPaymentReceived: preferences.emailOnPaymentReceived ?? true,
        emailOnPaymentOverdue: preferences.emailOnPaymentOverdue ?? true,
        emailOnBidViewed: preferences.emailOnBidViewed ?? true,
        emailOnBidDecision: preferences.emailOnBidDecision ?? true,
        emailOnInvoiceSent: preferences.emailOnInvoiceSent ?? false,
        inAppNotifications: preferences.inAppNotifications ?? true,
        paymentReminderDaysBefore: preferences.paymentReminderDaysBefore ?? 2,
      });
    }
  }, [preferences]);

  const handleSave = async () => {
    try {
      await updatePreferencesMutation.mutateAsync(settings);
      toast.success("Notification settings updated successfully");
    } catch (error) {
      toast.error("Failed to update notification settings");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notification Settings</h1>
        <p className="text-muted-foreground mt-2">Customize how and when you receive notifications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Receive email alerts for important business events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Payment Received</Label>
              <p className="text-sm text-muted-foreground">Get notified when a payment is received</p>
            </div>
            <Switch
              checked={settings.emailOnPaymentReceived}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, emailOnPaymentReceived: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Payment Overdue</Label>
              <p className="text-sm text-muted-foreground">Get notified when an invoice becomes overdue</p>
            </div>
            <Switch
              checked={settings.emailOnPaymentOverdue}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, emailOnPaymentOverdue: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Bid Viewed</Label>
              <p className="text-sm text-muted-foreground">Get notified when a client views your bid</p>
            </div>
            <Switch
              checked={settings.emailOnBidViewed}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, emailOnBidViewed: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Bid Decision</Label>
              <p className="text-sm text-muted-foreground">Get notified when a bid is accepted or rejected</p>
            </div>
            <Switch
              checked={settings.emailOnBidDecision}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, emailOnBidDecision: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Invoice Sent</Label>
              <p className="text-sm text-muted-foreground">Get notified when an invoice is sent to a client</p>
            </div>
            <Switch
              checked={settings.emailOnInvoiceSent}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, emailOnInvoiceSent: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>In-App Notifications</CardTitle>
          <CardDescription>Receive notifications within the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Enable In-App Notifications</Label>
              <p className="text-sm text-muted-foreground">Show toast notifications for actions and events</p>
            </div>
            <Switch
              checked={settings.inAppNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, inAppNotifications: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Reminders</CardTitle>
          <CardDescription>Configure when you receive payment due reminders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="reminder-days">Days before due date to send reminder</Label>
            <Input
              id="reminder-days"
              type="number"
              min="1"
              max="30"
              value={settings.paymentReminderDaysBefore}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  paymentReminderDaysBefore: parseInt(e.target.value) || 2,
                })
              }
            />
            <p className="text-sm text-muted-foreground">
              You'll receive a reminder {settings.paymentReminderDaysBefore} day{settings.paymentReminderDaysBefore !== 1 ? "s" : ""} before an invoice is due
            </p>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} size="lg" disabled={updatePreferencesMutation.isPending}>
        {updatePreferencesMutation.isPending ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
}
