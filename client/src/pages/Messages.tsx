import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Send, Search, Paperclip } from "lucide-react";

export default function Messages() {
  const [selectedClient, setSelectedClient] = useState<number | null>(1);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const mockClients = [
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com", unread: 2 },
    { id: 2, name: "Michael Chen", email: "michael@example.com", unread: 0 },
    { id: 3, name: "Emily Rodriguez", email: "emily@example.com", unread: 1 },
    { id: 4, name: "David Martinez", email: "david@example.com", unread: 0 },
  ];

  const mockMessages = [
    {
      id: 1,
      clientId: 1,
      from: "Sarah Johnson",
      content: "Hi! Can you provide an update on the kitchen renovation project?",
      timestamp: "2024-01-15 10:30 AM",
      isRead: true,
    },
    {
      id: 2,
      clientId: 1,
      from: "You",
      content: "Of course! We're on schedule. The tile work should be completed by Friday.",
      timestamp: "2024-01-15 11:00 AM",
      isRead: true,
    },
    {
      id: 3,
      clientId: 1,
      from: "Sarah Johnson",
      content: "Great! Looking forward to seeing the results.",
      timestamp: "2024-01-15 11:15 AM",
      isRead: false,
    },
  ];

  const currentClient = mockClients.find((c) => c.id === selectedClient);
  const clientMessages = mockMessages.filter((m) => m.clientId === selectedClient);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    toast.success("Message sent to " + currentClient?.name);
    setMessageText("");
  };

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground mt-2">Communicate with your clients</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Client List */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedClient === client.id ? "bg-blue-100 border-blue-300 border" : "hover:bg-accent border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.email}</p>
                  </div>
                  {client.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {client.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="md:col-span-2 flex flex-col h-96 border rounded-lg bg-white">
          {/* Header */}
          <div className="p-4 border-b bg-gray-50">
            <p className="font-bold">{currentClient?.name}</p>
            <p className="text-sm text-muted-foreground">{currentClient?.email}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {clientMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "You" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.from === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.from === "You" ? "text-blue-100" : "text-gray-600"}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-gray-50">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Button type="button" size="icon" variant="outline">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
                className="resize-none h-10"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Recent Conversations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockClients.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent">
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-muted-foreground">Last message: 2 hours ago</p>
                </div>
                {client.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {client.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
