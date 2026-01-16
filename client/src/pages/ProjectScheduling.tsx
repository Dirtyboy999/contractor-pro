import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Calendar, Clock, AlertCircle, CheckCircle, Zap } from "lucide-react";

export default function ProjectScheduling() {
  const [selectedProject, setSelectedProject] = useState<string>("kitchen");
  const [showScheduler, setShowScheduler] = useState(false);

  const mockProjects = [
    {
      id: "kitchen",
      name: "Kitchen Renovation",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      phases: [
        { name: "Planning & Design", duration: 3, status: "completed" },
        { name: "Demolition", duration: 2, status: "completed" },
        { name: "Installation", duration: 5, status: "in-progress" },
        { name: "Finishing", duration: 3, status: "pending" },
      ],
      team: ["You", "John Smith"],
    },
    {
      id: "bathroom",
      name: "Bathroom Remodel",
      startDate: "2024-01-20",
      endDate: "2024-02-20",
      phases: [
        { name: "Design", duration: 2, status: "completed" },
        { name: "Plumbing", duration: 3, status: "pending" },
        { name: "Tile Work", duration: 4, status: "pending" },
      ],
      team: ["You"],
    },
  ];

  const currentProject = mockProjects.find((p) => p.id === selectedProject);

  const automationRules = [
    { id: 1, trigger: "Phase completed", action: "Send client update email", enabled: true },
    { id: 2, trigger: "Project 80% complete", action: "Create invoice for milestone", enabled: true },
    { id: 3, trigger: "Deadline approaching (3 days)", action: "Send team reminder", enabled: true },
    { id: 4, trigger: "Project delayed", action: "Notify client and reschedule", enabled: false },
  ];

  const smartSuggestions = [
    {
      title: "Optimize Phase Duration",
      description: "Based on historical data, Installation phase can be completed in 4 days instead of 5",
      impact: "Save 1 day",
      action: "Apply",
    },
    {
      title: "Add Buffer Time",
      description: "Add 1-day buffer before Finishing phase for unexpected issues",
      impact: "Reduce delays by 40%",
      action: "Apply",
    },
    {
      title: "Team Availability",
      description: "John Smith is available for 3 more days this week. Assign him to Installation phase",
      impact: "Speed up project",
      action: "Assign",
    },
  ];

  const handleApplyOptimization = (suggestion: string) => {
    toast.success(`Applied: ${suggestion}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Project Scheduling</h1>
        <p className="text-muted-foreground mt-2">Smart scheduling and automation</p>
      </div>

      {/* Project Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Project</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockProjects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {currentProject && (
        <>
          {/* Project Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>{currentProject.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Start Date</Label>
                  <p className="text-lg font-medium">{currentProject.startDate}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">End Date</Label>
                  <p className="text-lg font-medium">{currentProject.endDate}</p>
                </div>
              </div>

              {/* Phases */}
              <div>
                <h3 className="font-bold mb-4">Project Phases</h3>
                <div className="space-y-3">
                  {currentProject.phases.map((phase, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{phase.name}</p>
                        <p className="text-sm text-muted-foreground">{phase.duration} days</p>
                      </div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            phase.status === "completed"
                              ? "bg-green-500"
                              : phase.status === "in-progress"
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }`}
                          style={{
                            width: phase.status === "completed" ? "100%" : phase.status === "in-progress" ? "60%" : "0%",
                          }}
                        />
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded capitalize ${
                        phase.status === "completed" ? "bg-green-100 text-green-800" :
                        phase.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {phase.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team */}
              <div>
                <h3 className="font-bold mb-3">Assigned Team</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProject.team.map((member) => (
                    <span key={member} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Smart Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Smart Scheduling Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {smartSuggestions.map((suggestion, idx) => (
                <div key={idx} className="p-4 border rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-bold">{suggestion.title}</p>
                      <p className="text-sm text-gray-700 mt-1">{suggestion.description}</p>
                      <p className="text-sm font-semibold text-green-600 mt-2">{suggestion.impact}</p>
                    </div>
                    <Button size="sm" onClick={() => handleApplyOptimization(suggestion.title)}>
                      {suggestion.action}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Automation Rules */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Automation Rules</CardTitle>
                <Button size="sm" variant="outline">
                  Add Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {automationRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{rule.trigger}</p>
                    <p className="text-xs text-muted-foreground">{rule.action}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={() => toast.success("Rule updated")}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts & Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Alerts & Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="font-medium text-sm text-red-900">Installation Phase Deadline</p>
                <p className="text-xs text-red-700 mt-1">Due in 3 days (Feb 10, 2024)</p>
                <Button size="sm" className="mt-2">
                  View Details
                </Button>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="font-medium text-sm text-yellow-900">Team Capacity Alert</p>
                <p className="text-xs text-yellow-700 mt-1">John Smith is at 85% capacity this week</p>
                <Button size="sm" variant="outline" className="mt-2">
                  Adjust Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
