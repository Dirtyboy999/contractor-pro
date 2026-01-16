import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export default function Projects() {
  const [, navigate] = useLocation();
  const { data: projects, isLoading } = trpc.projects.list.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button onClick={() => navigate("/projects/new")}>New Project</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {projects && projects.length > 0 ? (
            <div className="space-y-2">
              {projects.map(project => (
                <div key={project.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <span className="text-sm font-medium">{project.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No projects yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
