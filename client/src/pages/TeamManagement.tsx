import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, Shield, Eye, Pencil } from "lucide-react";

export default function TeamManagement() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "viewer",
  });

  const mockTeamMembers = [
    {
      id: 1,
      email: "you@example.com",
      name: "Your Name",
      role: "admin",
      joinedDate: "2024-01-01",
      status: "active",
    },
    {
      id: 2,
      email: "john@example.com",
      name: "John Smith",
      role: "manager",
      joinedDate: "2024-01-10",
      status: "active",
    },
    {
      id: 3,
      email: "jane@example.com",
      name: "Jane Doe",
      role: "editor",
      joinedDate: "2024-01-12",
      status: "active",
    },
    {
      id: 4,
      email: "bob@example.com",
      name: "Bob Johnson",
      role: "viewer",
      joinedDate: "2024-01-15",
      status: "active",
    },
  ];

  const rolePermissions = {
    admin: ["View all", "Create", "Edit", "Delete", "Manage team", "Settings"],
    manager: ["View all", "Create", "Edit", "Delete"],
    editor: ["View all", "Create", "Edit"],
    viewer: ["View all"],
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${formData.name} added to team as ${formData.role}`);
    setShowForm(false);
    setFormData({
      email: "",
      name: "",
      role: "viewer",
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4 text-red-600" />;
      case "manager":
        return <Shield className="h-4 w-4 text-orange-600" />;
      case "editor":
        return <Pencil className="h-4 w-4 text-blue-600" />;
      case "viewer":
        return <Eye className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground mt-2">Manage team members and permissions</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Add Member Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Team Member</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="member@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="role">Role *</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Permissions for {formData.role}:</p>
                <div className="flex flex-wrap gap-2">
                  {rolePermissions[formData.role as keyof typeof rolePermissions]?.map((perm) => (
                    <span key={perm} className="bg-blue-200 text-blue-900 text-xs px-2 py-1 rounded">
                      {perm}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Add Member</Button>
                <Button type="button" onClick={() => setShowForm(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({mockTeamMembers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTeamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mr-4">
                  <div className="flex items-center gap-2">
                    {getRoleIcon(member.role)}
                    <span className="text-sm font-medium capitalize bg-gray-100 px-3 py-1 rounded">
                      {member.role}
                    </span>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">Joined {member.joinedDate}</p>
                    <p className="text-green-600 font-medium">Active</p>
                  </div>
                </div>

                {member.id !== 1 && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(rolePermissions).map(([role, permissions]) => (
              <div key={role} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  {getRoleIcon(role)}
                  <h3 className="font-bold capitalize">{role}</h3>
                </div>
                <ul className="space-y-2">
                  {permissions.map((perm) => (
                    <li key={perm} className="text-sm flex items-center gap-2">
                      <span className="text-green-600">✓</span> {perm}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
