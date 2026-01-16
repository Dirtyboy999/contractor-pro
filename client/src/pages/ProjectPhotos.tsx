import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useRoute } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";

export default function ProjectPhotos() {
  const [match, params] = useRoute("/projects/:id/photos");
  const projectId = params?.id ? parseInt(params.id) : 0;
  
  const { data: project } = trpc.projects.getById.useQuery({ id: projectId }, { enabled: !!projectId });
  const [caption, setCaption] = useState("");
  const [photoType, setPhotoType] = useState("progress");
  const [file, setFile] = useState<File | null>(null);

  if (!match) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Project Photos</h1>
        <p className="text-muted-foreground mt-2">{project?.name}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Photo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="photo">Photo File</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <Label htmlFor="photoType">Photo Type</Label>
            <Select value={photoType} onValueChange={setPhotoType}>
              <SelectTrigger id="photoType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="before">Before</SelectItem>
                <SelectItem value="after">After</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
                <SelectItem value="completion">Completion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Describe this photo..."
              rows={3}
            />
          </div>

          <Button className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Upload Photo
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Photo Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Placeholder for photos */}
            <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No photos yet</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Progress Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-medium">Project Started</p>
                <p className="text-sm text-muted-foreground">Initial assessment and planning</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-medium">Phase 1: Preparation</p>
                <p className="text-sm text-muted-foreground">Site preparation and material delivery</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-medium">Phase 2: Main Work</p>
                <p className="text-sm text-muted-foreground">Primary construction/installation</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
