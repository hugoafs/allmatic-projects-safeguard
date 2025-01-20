import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Project } from "@/types/project";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [credentials, setCredentials] = useState({
    platform: "",
    link: "",
    email: "",
    password: "",
    apiKey: "",
  });

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const foundProject = projects.find((p: Project) => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      setCredentials(foundProject.credentials);
    }
  }, [id]);

  const handleSave = () => {
    if (!project) return;

    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const updatedProjects = projects.map((p: Project) =>
      p.id === project.id ? { ...p, credentials } : p
    );

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    toast.success("Credentials saved successfully!");
  };

  if (!project) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
      <CardHeader className="border-b border-slate-100 bg-slate-50">
        <CardTitle className="text-2xl font-bold text-slate-800">
          {project.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-700">Platform Information</h3>
          <div className="space-y-2">
            <Label htmlFor="platform">Platform Name</Label>
            <Input
              id="platform"
              value={credentials.platform}
              onChange={(e) =>
                setCredentials({ ...credentials, platform: e.target.value })
              }
              placeholder="Platform name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">Project Link</Label>
            <Input
              id="link"
              value={credentials.link}
              onChange={(e) =>
                setCredentials({ ...credentials, link: e.target.value })
              }
              placeholder="https://..."
            />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-700">Access Credentials</h3>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              placeholder="Enter password"
            />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-700">API Configuration</h3>
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              value={credentials.apiKey}
              onChange={(e) =>
                setCredentials({ ...credentials, apiKey: e.target.value })
              }
              placeholder="Enter API key"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button
            onClick={handleSave}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Save Credentials
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Back to Projects
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};