import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";

import { Trash2, Check, CheckCheck } from "lucide-react";
import { toast } from "sonner";

const notificationTypeColors: Record<string, string> = {
  invoice_sent: "bg-blue-100 text-blue-800",
  invoice_viewed: "bg-blue-100 text-blue-800",
  payment_received: "bg-green-100 text-green-800",
  payment_due_reminder: "bg-yellow-100 text-yellow-800",
  payment_overdue: "bg-red-100 text-red-800",
  bid_sent: "bg-purple-100 text-purple-800",
  bid_viewed: "bg-purple-100 text-purple-800",
  bid_accepted: "bg-green-100 text-green-800",
  bid_rejected: "bg-red-100 text-red-800",
  bid_expired: "bg-orange-100 text-orange-800",
  project_created: "bg-indigo-100 text-indigo-800",
  project_completed: "bg-green-100 text-green-800",
  client_added: "bg-cyan-100 text-cyan-800",
  item_low_stock: "bg-orange-100 text-orange-800",
  system_alert: "bg-gray-100 text-gray-800",
};

export default function NotificationCenter() {
  const { data: notifications, isLoading, refetch } = trpc.notifications.list.useQuery({ limit: 50 });
  const { data: unreadCount } = trpc.notifications.unreadCount.useQuery();
  const markAsReadMutation = trpc.notifications.markAsRead.useMutation();
  const markAllAsReadMutation = trpc.notifications.markAllAsRead.useMutation();
  const deleteNotificationMutation = trpc.notifications.delete.useMutation();

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsReadMutation.mutateAsync({ id });
      refetch();
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsReadMutation.mutateAsync();
      refetch();
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all notifications as read");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNotificationMutation.mutateAsync({ id });
      refetch();
      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount && unreadCount.count > 0 && (
            <p className="text-muted-foreground mt-2">
              You have {unreadCount.count} unread notification{unreadCount.count !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        {unreadCount && unreadCount.count > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="outline">
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications && notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start justify-between p-4 border rounded-lg transition-colors ${
                    notification.isRead ? "bg-background" : "bg-muted"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <Badge className={notificationTypeColors[notification.type] || "bg-gray-100 text-gray-800"}>
                        {notification.type.replace(/_/g, " ")}
                      </Badge>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    {notification.message && (
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!notification.isRead && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No notifications yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
