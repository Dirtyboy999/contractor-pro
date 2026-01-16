import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Clock, Users, AlertCircle, CheckCircle, Phone, LogOut, LogIn } from "lucide-react";

export default function EmployeeTracking() {
  const [activeTab, setActiveTab] = useState("live");
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showAddGeofence, setShowAddGeofence] = useState(false);

  const mockEmployees = [
    {
      id: 1,
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      role: "Lead Carpenter",
      status: "on-site",
      currentGeofence: "Kitchen Renovation",
      clockInTime: "08:30 AM",
      hoursToday: 4.5,
      latitude: 40.7128,
      longitude: -74.006,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      phone: "+1 (555) 234-5678",
      role: "Electrician",
      status: "on-site",
      currentGeofence: "Kitchen Renovation",
      clockInTime: "09:00 AM",
      hoursToday: 4,
      latitude: 40.7129,
      longitude: -74.0061,
    },
    {
      id: 3,
      name: "Mike Davis",
      phone: "+1 (555) 345-6789",
      role: "Plumber",
      status: "off-site",
      currentGeofence: null,
      clockInTime: null,
      hoursToday: 8,
      latitude: 40.758,
      longitude: -73.9855,
    },
  ];

  const mockGeofences = [
    {
      id: 1,
      name: "Kitchen Renovation",
      address: "123 Main St, New York, NY",
      radius: 50,
      employeesOnSite: 2,
      latitude: 40.7128,
      longitude: -74.006,
    },
    {
      id: 2,
      name: "Bathroom Remodel",
      address: "456 Oak Ave, New York, NY",
      radius: 50,
      employeesOnSite: 0,
      latitude: 40.758,
      longitude: -73.9855,
    },
  ];

  const attendanceData = [
    { id: 1, employee: "John Smith", date: "2024-01-20", clockIn: "08:30 AM", clockOut: "05:00 PM", hours: 8.5, status: "completed" },
    { id: 2, employee: "Sarah Johnson", date: "2024-01-20", clockIn: "09:00 AM", clockOut: "05:30 PM", hours: 8.5, status: "completed" },
    { id: 3, employee: "Mike Davis", date: "2024-01-20", clockIn: "07:30 AM", clockOut: "04:00 PM", hours: 8.5, status: "completed" },
    { id: 4, employee: "John Smith", date: "2024-01-19", clockIn: "08:00 AM", clockOut: "05:00 PM", hours: 9, status: "completed" },
  ];

  const handleAddEmployee = () => {
    toast.success("Employee added successfully");
    setShowAddEmployee(false);
  };

  const handleAddGeofence = () => {
    toast.success("Geofence created successfully");
    setShowAddGeofence(false);
  };

  const handleManualClockIn = (employeeId: number) => {
    toast.success("Employee clocked in manually");
  };

  const handleManualClockOut = (employeeId: number) => {
    toast.success("Employee clocked out manually");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MapPin className="h-8 w-8 text-blue-600" />
          Employee Geofencing & Tracking
        </h1>
        <p className="text-muted-foreground mt-2">Real-time location tracking and automatic time clocking</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="live">Live Tracking</TabsTrigger>
          <TabsTrigger value="geofences">Geofences</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>

        {/* Live Tracking Tab */}
        <TabsContent value="live" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Employee Locations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Map Placeholder */}
              <div className="w-full h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Google Maps Integration</p>
                  <p className="text-sm text-gray-500 mt-1">Real-time employee locations with geofence boundaries</p>
                </div>
              </div>

              {/* Employee Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockEmployees.map((emp) => (
                  <Card key={emp.id} className={emp.status === "on-site" ? "border-green-200 bg-green-50" : "border-gray-200"}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold">{emp.name}</p>
                          <p className="text-sm text-muted-foreground">{emp.role}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          emp.status === "on-site"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {emp.status === "on-site" ? "On Site" : "Off Site"}
                        </span>
                      </div>

                      {emp.status === "on-site" ? (
                        <>
                          <div className="space-y-2 text-sm mb-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-blue-600" />
                              <span>{emp.currentGeofence}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-green-600" />
                              <span>Since {emp.clockInTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-orange-600" />
                              <span>{emp.hoursToday} hours today</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                            onClick={() => handleManualClockOut(emp.id)}
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Clock Out
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="space-y-2 text-sm mb-3">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-600" />
                              <span>{emp.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-600" />
                              <span>{emp.hoursToday} hours today</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => handleManualClockIn(emp.id)}
                          >
                            <LogIn className="h-4 w-4 mr-2" />
                            Clock In
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Geofences Tab */}
        <TabsContent value="geofences" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowAddGeofence(true)}>+ Add Geofence</Button>
          </div>

          {showAddGeofence && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle>Create New Geofence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Geofence Name</Label>
                  <Input placeholder="e.g., Kitchen Renovation" />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input placeholder="Job site address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Latitude</Label>
                    <Input placeholder="40.7128" />
                  </div>
                  <div>
                    <Label>Longitude</Label>
                    <Input placeholder="-74.0060" />
                  </div>
                </div>
                <div>
                  <Label>Radius (meters)</Label>
                  <Input type="number" placeholder="50" defaultValue="50" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddGeofence}>Create Geofence</Button>
                  <Button variant="outline" onClick={() => setShowAddGeofence(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockGeofences.map((geo) => (
              <Card key={geo.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold">{geo.name}</p>
                      <p className="text-sm text-muted-foreground">{geo.address}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {geo.radius}m radius
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-green-600" />
                      <span>{geo.employeesOnSite} employees on site</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>{geo.latitude.toFixed(4)}, {geo.longitude.toFixed(4)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Employee</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Clock In</th>
                      <th className="text-left py-3 px-4 font-medium">Clock Out</th>
                      <th className="text-left py-3 px-4 font-medium">Hours</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((record) => (
                      <tr key={record.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{record.employee}</td>
                        <td className="py-3 px-4">{record.date}</td>
                        <td className="py-3 px-4">{record.clockIn}</td>
                        <td className="py-3 px-4">{record.clockOut}</td>
                        <td className="py-3 px-4 font-bold">{record.hours}h</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowAddEmployee(true)}>+ Add Employee</Button>
          </div>

          {showAddEmployee && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle>Add New Employee</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Employee Name</Label>
                  <Input placeholder="Full name" />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input placeholder="+1 (555) 123-4567" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input placeholder="e.g., Carpenter, Electrician" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddEmployee}>Add Employee</Button>
                  <Button variant="outline" onClick={() => setShowAddEmployee(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockEmployees.map((emp) => (
              <Card key={emp.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold">{emp.name}</p>
                      <p className="text-sm text-muted-foreground">{emp.role}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      emp.status === "on-site"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {emp.status === "on-site" ? "On Site" : "Off Site"}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-600" />
                      <span>{emp.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{emp.hoursToday} hours today</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Employees On Site</p>
            <p className="text-3xl font-bold mt-2">2</p>
            <p className="text-xs text-green-600 mt-2">Active now</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Hours Today</p>
            <p className="text-3xl font-bold mt-2">20.5</p>
            <p className="text-xs text-blue-600 mt-2">Across 3 employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Active Geofences</p>
            <p className="text-3xl font-bold mt-2">2</p>
            <p className="text-xs text-blue-600 mt-2">Job sites</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Attendance Rate</p>
            <p className="text-3xl font-bold mt-2">100%</p>
            <p className="text-xs text-green-600 mt-2">This week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
