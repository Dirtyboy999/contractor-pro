import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, Clock, Zap, TrendingUp } from "lucide-react";

export default function AdvancedScheduling() {
  const schedulingFeatures = [
    {
      title: "Drag-and-Drop Scheduling",
      description: "Visually manage projects and crew assignments with intuitive drag-and-drop",
      icon: "📅",
      benefits: ["Save 5+ hours/week", "Reduce scheduling conflicts", "Improve crew utilization"],
    },
    {
      title: "Calendar Integration",
      description: "Sync with Google Calendar and Outlook for seamless scheduling",
      icon: "🔄",
      benefits: ["Real-time sync", "Automatic reminders", "Team visibility"],
    },
    {
      title: "Smart Crew Assignment",
      description: "AI automatically assigns crews based on skills, availability, and location",
      icon: "🤖",
      benefits: ["Optimal crew matching", "Reduce travel time", "Maximize efficiency"],
    },
    {
      title: "Route Optimization",
      description: "Automatically optimize crew routes to minimize travel time and fuel costs",
      icon: "🗺️",
      benefits: ["Save 20% on fuel", "Complete more jobs/day", "Reduce emissions"],
    },
  ];

  const upcomingSchedule = [
    {
      date: "Tomorrow, 8:00 AM",
      project: "Kitchen Remodel - Johnson Residence",
      crew: ["Mike (Lead)", "Sarah", "Tom"],
      location: "123 Oak St, Denver, CO",
      duration: "8 hours",
      status: "Confirmed",
    },
    {
      date: "Tomorrow, 1:00 PM",
      project: "HVAC Installation - Commercial",
      crew: ["James (Lead)", "Alex"],
      location: "456 Business Ave, Denver, CO",
      duration: "6 hours",
      status: "Confirmed",
    },
    {
      date: "Day After, 9:00 AM",
      project: "Plumbing Repair - Smith Residence",
      crew: ["David (Lead)"],
      location: "789 Maple Dr, Aurora, CO",
      duration: "3 hours",
      status: "Tentative",
    },
  ];

  const crewMembers = [
    {
      name: "Mike Johnson",
      skills: ["Carpentry", "Plumbing", "General Contractor"],
      availability: "Mon-Fri, 7am-5pm",
      utilization: "92%",
      rating: "4.9/5",
    },
    {
      name: "Sarah Williams",
      skills: ["Electrical", "HVAC", "Carpentry"],
      availability: "Mon-Fri, 8am-6pm",
      utilization: "88%",
      rating: "4.8/5",
    },
    {
      name: "James Brown",
      skills: ["HVAC", "Plumbing", "General Contractor"],
      availability: "Mon-Sat, 7am-5pm",
      utilization: "95%",
      rating: "4.7/5",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Advanced Scheduling</h1>
        <p className="text-muted-foreground mt-2">
          Intelligent crew assignment, route optimization, and calendar integration
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schedulingFeatures.map((feature, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="text-2xl">{feature.icon}</span>
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{feature.description}</p>
              <div className="space-y-2">
                {feature.benefits.map((benefit, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Your Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingSchedule.map((schedule, i) => (
              <div key={i} className="p-4 border rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold">{schedule.project}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-4 w-4" />
                      {schedule.date}
                    </p>
                  </div>
                  <Badge
                    variant={schedule.status === "Confirmed" ? "default" : "secondary"}
                  >
                    {schedule.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 pt-3 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Crew</p>
                    <p className="text-sm font-bold">{schedule.crew.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Location</p>
                    <p className="text-sm font-bold flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {schedule.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <p className="text-sm font-bold">{schedule.duration}</p>
                  </div>
                  <div className="text-right">
                    <Button size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Crew Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Crew Members & Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crewMembers.map((member, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold">{member.name}</p>
                    <div className="flex gap-2 mt-2">
                      {member.skills.map((skill, j) => (
                        <Badge key={j} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-yellow-600">{member.rating}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Availability</p>
                    <p className="text-sm font-bold">{member.availability}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Utilization</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: member.utilization }}
                        ></div>
                      </div>
                      <p className="text-sm font-bold">{member.utilization}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button size="sm" variant="outline">
                      Assign
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Time Saved/Week</p>
                <p className="text-3xl font-bold text-green-600">5.2 hrs</p>
              </div>
              <Zap className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Fuel Cost Saved/Month</p>
                <p className="text-3xl font-bold text-blue-600">$340</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Crew Utilization</p>
                <p className="text-3xl font-bold text-purple-600">91.7%</p>
              </div>
              <Users className="h-8 w-8 text-purple-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle>Calendar Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Sync your schedule with Google Calendar and Outlook for seamless team coordination.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Button className="gap-2">
              <span>🔗</span>
              Connect Google Calendar
            </Button>
            <Button className="gap-2">
              <span>🔗</span>
              Connect Outlook
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Your schedule will automatically sync across all platforms. Changes made in any
            calendar will update instantly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
