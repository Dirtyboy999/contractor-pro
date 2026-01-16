import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Play, Pause, Trash2, Clock } from "lucide-react";

export default function TimeTracking() {
  const [showForm, setShowForm] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [formData, setFormData] = useState({
    projectId: "",
    taskDescription: "",
    duration: "",
    hourlyRate: "75",
    isBillable: true,
  });

  const mockTimeEntries = [
    {
      id: 1,
      project: "Kitchen Renovation",
      task: "Tile installation and grouting",
      duration: 480, // minutes
      hourlyRate: 85,
      isBillable: true,
      billableAmount: 680,
      date: "2024-01-15",
    },
    {
      id: 2,
      project: "Bathroom Remodel",
      task: "Plumbing installation",
      duration: 360,
      hourlyRate: 90,
      isBillable: true,
      billableAmount: 540,
      date: "2024-01-14",
    },
    {
      id: 3,
      project: "Deck Building",
      task: "Deck framing and support",
      duration: 600,
      hourlyRate: 75,
      isBillable: true,
      billableAmount: 750,
      date: "2024-01-13",
    },
    {
      id: 4,
      project: "Consultation",
      task: "Client meeting and estimate",
      duration: 120,
      hourlyRate: 50,
      isBillable: false,
      billableAmount: 0,
      date: "2024-01-12",
    },
  ];

  const totalHours = mockTimeEntries.reduce((sum, entry) => sum + entry.duration, 0) / 60;
  const billableHours = mockTimeEntries.filter((e) => e.isBillable).reduce((sum, entry) => sum + entry.duration, 0) / 60;
  const totalBillableAmount = mockTimeEntries.reduce((sum, entry) => sum + entry.billableAmount, 0);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleAddTime = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Time entry added successfully");
    setShowForm(false);
    setFormData({
      projectId: "",
      taskDescription: "",
      duration: "",
      hourlyRate: "75",
      isBillable: true,
    });
  };

  const handleTimerToggle = () => {
    setIsTimerRunning(!isTimerRunning);
    if (!isTimerRunning) {
      const interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Time Tracking</h1>
          <p className="text-muted-foreground mt-2">Track billable hours and project time</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Time Entry
        </Button>
      </div>

      {/* Timer Widget */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Quick Timer</p>
              <p className="text-4xl font-bold font-mono mt-2">{formatTime(timerSeconds)}</p>
            </div>
            <Button onClick={handleTimerToggle} size="lg" variant={isTimerRunning ? "destructive" : "default"}>
              {isTimerRunning ? (
                <>
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Start
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Hours</p>
            <p className="text-3xl font-bold mt-2">{totalHours.toFixed(1)}h</p>
            <p className="text-sm text-muted-foreground mt-2">{mockTimeEntries.length} entries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Billable Hours</p>
            <p className="text-3xl font-bold mt-2">{billableHours.toFixed(1)}h</p>
            <p className="text-sm text-green-600 mt-2">{Math.round((billableHours / totalHours) * 100)}% billable</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Billable Amount</p>
            <p className="text-3xl font-bold mt-2">${totalBillableAmount}</p>
            <p className="text-sm text-green-600 mt-2">Ready to invoice</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Time Entry Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Time Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTime} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectId">Project *</Label>
                  <Select value={formData.projectId} onValueChange={(value) => setFormData({ ...formData, projectId: value })}>
                    <SelectTrigger id="projectId">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kitchen">Kitchen Renovation</SelectItem>
                      <SelectItem value="bathroom">Bathroom Remodel</SelectItem>
                      <SelectItem value="deck">Deck Building</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="0"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="60"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate *</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    placeholder="75.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="taskDescription">Task Description</Label>
                  <Input
                    id="taskDescription"
                    value={formData.taskDescription}
                    onChange={(e) => setFormData({ ...formData, taskDescription: e.target.value })}
                    placeholder="What did you work on?"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isBillable"
                  checked={formData.isBillable}
                  onChange={(e) => setFormData({ ...formData, isBillable: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="isBillable" className="cursor-pointer">
                  Billable Time
                </Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Add Time Entry</Button>
                <Button type="button" onClick={() => setShowForm(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Time Entries List */}
      <Card>
        <CardHeader>
          <CardTitle>Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTimeEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium">{entry.project}</p>
                      <p className="text-sm text-muted-foreground">{entry.task}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right mr-4">
                  <p className="font-bold">{(entry.duration / 60).toFixed(1)}h @ ${entry.hourlyRate}/hr</p>
                  <p className="text-sm font-semibold text-green-600">${entry.billableAmount}</p>
                  <p className="text-xs text-muted-foreground">{entry.date}</p>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
