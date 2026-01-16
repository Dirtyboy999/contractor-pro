import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Download, Mail, Trash2, CheckCircle, FileText } from "lucide-react";

export default function BulkActions() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [actionType, setActionType] = useState<string>("");
  const [itemType, setItemType] = useState<string>("invoices");

  const mockInvoices = [
    { id: 1, number: "INV-1001", client: "Sarah Johnson", amount: 3200, status: "Sent", date: "2024-01-15" },
    { id: 2, number: "INV-1002", client: "Michael Chen", amount: 2800, status: "Sent", date: "2024-01-14" },
    { id: 3, number: "INV-1003", client: "Emily Rodriguez", amount: 4500, status: "Sent", date: "2024-01-13" },
    { id: 4, number: "INV-1004", client: "David Martinez", amount: 1900, status: "Draft", date: "2024-01-12" },
    { id: 5, number: "INV-1005", client: "Sarah Johnson", amount: 5200, status: "Sent", date: "2024-01-11" },
  ];

  const mockBids = [
    { id: 1, number: "BID-001", client: "Sarah Johnson", amount: 8500, status: "Sent", date: "2024-01-15" },
    { id: 2, number: "BID-002", client: "Michael Chen", amount: 6200, status: "Sent", date: "2024-01-14" },
    { id: 3, number: "BID-003", client: "Emily Rodriguez", amount: 12000, status: "Accepted", date: "2024-01-13" },
    { id: 4, number: "BID-004", client: "David Martinez", amount: 4800, status: "Draft", date: "2024-01-12" },
  ];

  const items = itemType === "invoices" ? mockInvoices : mockBids;

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.id));
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems(
      selectedItems.includes(id) ? selectedItems.filter((item) => item !== id) : [...selectedItems, id]
    );
  };

  const handleBulkAction = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item");
      return;
    }

    const count = selectedItems.length;
    const totalAmount = items
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.amount, 0);

    switch (actionType) {
      case "export":
        toast.success(`Exported ${count} ${itemType} as PDF (${totalAmount} total)`);
        break;
      case "email":
        toast.success(`Sending ${count} ${itemType} to clients...`);
        break;
      case "mark-sent":
        toast.success(`Marked ${count} ${itemType} as sent`);
        break;
      case "delete":
        toast.success(`Deleted ${count} ${itemType}`);
        setSelectedItems([]);
        break;
      default:
        toast.error("Please select an action");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bulk Actions</h1>
        <p className="text-muted-foreground mt-2">Perform actions on multiple items at once</p>
      </div>

      {/* Action Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Operations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Item Type</label>
              <Select value={itemType} onValueChange={setItemType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invoices">Invoices</SelectItem>
                  <SelectItem value="bids">Bids</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Action</label>
              <Select value={actionType} onValueChange={setActionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="export">Export as PDF</SelectItem>
                  <SelectItem value="email">Send via Email</SelectItem>
                  <SelectItem value="mark-sent">Mark as Sent</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={handleBulkAction} className="w-full" disabled={selectedItems.length === 0}>
                Execute ({selectedItems.length} selected)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {selectedItems.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Selected Items</p>
                <p className="text-2xl font-bold">{selectedItems.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold">
                  ${items
                    .filter((item) => selectedItems.includes(item.id))
                    .reduce((sum, item) => sum + item.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Amount</p>
                <p className="text-2xl font-bold">
                  ${Math.round(
                    items
                      .filter((item) => selectedItems.includes(item.id))
                      .reduce((sum, item) => sum + item.amount, 0) / selectedItems.length
                  )}
                </p>
              </div>
              <div className="flex items-end">
                <Button variant="outline" onClick={() => setSelectedItems([])}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{itemType === "invoices" ? "Invoices" : "Bids"}</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
            >
              {selectedItems.length === items.length ? "Deselect All" : "Select All"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3 px-4">
                    <Checkbox
                      checked={selectedItems.length === items.length && items.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Number</th>
                  <th className="text-left py-3 px-4 font-medium">Client</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleSelectItem(item.id)}
                      />
                    </td>
                    <td className="py-3 px-4 font-medium">{item.number}</td>
                    <td className="py-3 px-4">{item.client}</td>
                    <td className="py-3 px-4">${item.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.status === "Sent" ? "bg-blue-100 text-blue-800" :
                        item.status === "Accepted" ? "bg-green-100 text-green-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <Download className="h-5 w-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">Export All as PDF</p>
                <p className="text-xs text-muted-foreground">Download all invoices in one file</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <Mail className="h-5 w-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">Send Reminders</p>
                <p className="text-xs text-muted-foreground">Email payment reminders to clients</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <CheckCircle className="h-5 w-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">Mark as Paid</p>
                <p className="text-xs text-muted-foreground">Bulk update payment status</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <FileText className="h-5 w-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">Generate Report</p>
                <p className="text-xs text-muted-foreground">Create summary report</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
