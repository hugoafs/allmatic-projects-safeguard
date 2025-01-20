import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Project, Credential } from "@/types/project";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, ExternalLink } from "lucide-react";

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const foundProject = projects.find((p: Project) => p.id === id);
    if (foundProject) {
      foundProject.credentials = Array.isArray(foundProject.credentials) 
        ? foundProject.credentials 
        : [];
      setProject(foundProject);
    }
  }, [id]);

  const handleAddCredential = () => {
    if (!project) return;

    const newCredential: Credential = {
      id: Math.random().toString(36).substr(2, 9),
      platform: "",
      link: "",
      email: "",
      password: "",
      apiKey: "",
    };

    setProject({
      ...project,
      credentials: [...project.credentials, newCredential],
    });
  };

  const handleDeleteCredential = (credentialId: string) => {
    if (!project) return;

    setProject({
      ...project,
      credentials: project.credentials.filter((cred) => cred.id !== credentialId),
    });
    toast.success("Credential deleted successfully!");
  };

  const handleCredentialChange = (credentialId: string, field: keyof Credential, value: string) => {
    if (!project) return;

    setProject({
      ...project,
      credentials: project.credentials.map((cred) =>
        cred.id === credentialId ? { ...cred, [field]: value } : cred
      ),
    });
  };

  const handleSave = () => {
    if (!project) return;

    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const updatedProjects = projects.map((p: Project) =>
      p.id === project.id ? project : p
    );

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    toast.success("Credentials saved successfully!");
  };

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
      return "/placeholder.svg";
    }
  };

  if (!project) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <Card className="w-full max-w-6xl mx-auto bg-white shadow-lg">
        <CardHeader className="border-b border-slate-100 bg-slate-50">
          <CardTitle className="text-2xl font-bold text-slate-800 flex justify-between items-center">
            {project.name}
            <Button
              onClick={handleAddCredential}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Access
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {project.credentials.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No credentials added yet. Click "Add Access" to get started.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.credentials.map((credential) => (
                <Card 
                  key={credential.id} 
                  className="relative group hover:shadow-lg transition-shadow duration-200"
                >
                  <CardContent className="p-6">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteCredential(credential.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={getFaviconUrl(credential.link)}
                        alt={credential.platform}
                        className="w-12 h-12 rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                      <div>
                        <Input
                          value={credential.platform}
                          onChange={(e) =>
                            handleCredentialChange(credential.id, "platform", e.target.value)
                          }
                          placeholder="Platform name"
                          className="font-semibold mb-1"
                        />
                        <div className="flex items-center text-sm text-slate-500">
                          <Input
                            value={credential.link}
                            onChange={(e) =>
                              handleCredentialChange(credential.id, "link", e.target.value)
                            }
                            placeholder="https://..."
                            className="mr-2"
                          />
                          {credential.link && (
                            <a
                              href={credential.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/90"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={credential.email}
                          onChange={(e) =>
                            handleCredentialChange(credential.id, "email", e.target.value)
                          }
                          placeholder="email@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Password</Label>
                        <Input
                          type="password"
                          value={credential.password}
                          onChange={(e) =>
                            handleCredentialChange(credential.id, "password", e.target.value)
                          }
                          placeholder="Enter password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>API Key</Label>
                        <Input
                          value={credential.apiKey}
                          onChange={(e) =>
                            handleCredentialChange(credential.id, "apiKey", e.target.value)
                          }
                          placeholder="Enter API key"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="flex gap-4 pt-6">
            <Button
              onClick={handleSave}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Save All Credentials
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
    </div>
  );
};