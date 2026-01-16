import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { GripHorizontal, X, Plus, TrendingUp, AlertCircle, Clock, DollarSign } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardCustom() {
  const [editMode, setEditMode] = useState(false);
  const [widgets, setWidgets] = useState([
    { id: 1, type: "revenue", title: "Revenue This Month", enabled: true },
    { id: 2, type: "pending", title: "Pending Invoices", enabled: true },
    { id: 3, type: "time", title: "Hours Tracked", enabled: true },
    { id: 4, type: "messages", title: "Unread Messages", enabled: true },
    { id: 5, type: "chart", title: "Revenue Trend", enabled: true },
    { id: 6, type: "alerts", title: "Important Alerts", enabled: true },
  ]);

  const availableWidgets = [
    { id: "revenue", name: "Revenue This Month", icon: DollarSign },
    { id: "pending", name: "Pending Invoices", icon: AlertCircle },
    { id: "time", name: "Hours Tracked", icon: Clock },
    { id: "messages", name: "Unread Messages", icon: TrendingUp },
    { id: "chart", name: "Revenue Trend", icon: BarChart },
    { id: "alerts", name: "Important Alerts", icon: AlertCircle },
    { id: "clients", name: "Top Clients", icon: TrendingUp },
    { id: "projects", name: "Active Projects", icon: TrendingUp },
  ];

  const revenueData = [
    { month: "Jan", revenue: 12500 },
    { month: "Feb", revenue: 15800 },
    { month: "Mar", revenue: 18200 },
    { month: "Apr", revenue: 21500 },
    { month: "May", revenue: 19800 },
    { month: "Jun", revenue: 24300 },
  ];

  const handleToggleWidget = (id: number) => {
    setWidgets(widgets.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w)));
  };

  const handleAddWidget = (widgetType: string) => {
    const newId = Math.max(...widgets.map((w) => w.id), 0) + 1;
    const widget = availableWidgets.find((w) => w.id === widgetType);
    if (widget) {
      setWidgets([...widgets, { id: newId, type: widgetType, title: widget.name, enabled: true }]);
      toast.success(`${widget.name} added to dashboard`);
    }
  };

  const handleRemoveWidget = (id: number) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  const handleSaveLayout = () => {
    setEditMode(false);
    toast.success("Dashboard layout saved");
  };

  const renderWidget = (widget: any) => {
    switch (widget.type) {
      case "revenue":
        return (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Revenue This Month</p>
              <p className="text-3xl font-bold mt-2">$24,300</p>
              <p className="text-sm text-green-600 mt-2">↑ 22% from last month</p>
            </CardContent>
          </Card>
        );
      case "pending":
        return (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Pending Invoices</p>
              <p className="text-3xl font-bold mt-2">$45,200</p>
              <p className="text-sm text-orange-600 mt-2">5 invoices awaiting payment</p>
            </CardContent>
          </Card>
        );
      case "time":
        return (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Hours Tracked This Week</p>
              <p className="text-3xl font-bold mt-2">42.5h</p>
              <p className="text-sm text-blue-600 mt-2">$3,187.50 billable</p>
            </CardContent>
          </Card>
        );
      case "messages":
        return (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Unread Messages</p>
              <p className="text-3xl font-bold mt-2">3</p>
              <p className="text-sm text-blue-600 mt-2">From 2 clients</p>
            </CardContent>
          </Card>
        );
      case "chart":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      case "alerts":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Important Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-2 bg-red-50 rounded border border-red-200">
                <p className="text-sm font-medium text-red-900">Overdue Invoice</p>
                <p className="text-xs text-red-700">INV-1001 is 5 days overdue</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-sm font-medium text-yellow-900">Payment Due Soon</p>
                <p className="text-xs text-yellow-700">INV-1005 due in 2 days</p>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Customize your dashboard with widgets</p>
        </div>
        <Button onClick={() => setEditMode(!editMode)} variant={editMode ? "destructive" : "default"}>
          {editMode ? "Done Editing" : "Customize"}
        </Button>
      </div>

      {editMode && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="font-medium mb-4">Add Widgets to Your Dashboard</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {availableWidgets.map((widget) => (
                <Button
                  key={widget.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddWidget(widget.id)}
                  className="justify-start"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {widget.name}
                </Button>
              ))}
            </div>
            <Button onClick={handleSaveLayout} className="mt-4 w-full">
              Save Dashboard Layout
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets
          .filter((w) => w.enabled)
          .map((widget) => (
            <div key={widget.id} className={`relative ${editMode ? "ring-2 ring-blue-300 rounded-lg" : ""}`}>
              {editMode && (
                <div className="absolute top-2 right-2 z-10 flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveWidget(widget.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              {editMode && (
                <div className="absolute top-2 left-2 z-10 cursor-grab active:cursor-grabbing">
                  <GripHorizontal className="h-4 w-4 text-gray-400" />
                </div>
              )}
              {renderWidget(widget)}
            </div>
          ))}
      </div>

      {/* Disabled Widgets */}
      {editMode && widgets.some((w) => !w.enabled) && (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-base">Disabled Widgets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {widgets
                .filter((w) => !w.enabled)
                .map((widget) => (
                  <div key={widget.id} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{widget.title}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleWidget(widget.id)}
                    >
                      Enable
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
