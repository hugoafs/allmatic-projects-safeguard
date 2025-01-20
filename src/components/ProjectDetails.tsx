import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Project, Credential } from "@/types/project";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const foundProject = projects.find((p: Project) => p.id === id);
    if (foundProject) {
      // Ensure credentials is an array
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

  if (!project) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
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
        <CardContent className="space-y-6 p-6">
          {project.credentials.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No credentials added yet. Click "Add Access" to get started.
            </div>
          ) : (
            project.credentials.map((credential) => (
              <Card key={credential.id} className="border border-slate-200">
                <CardContent className="p-6 relative">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-4 right-4"
                    onClick={() => handleDeleteCredential(credential.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-700">Platform Information</h3>
                      <div className="space-y-2">
                        <Label htmlFor={`platform-${credential.id}`}>Platform Name</Label>
                        <Input
                          id={`platform-${credential.id}`}
                          value={credential.platform}
                          onChange={(e) =>
                            handleCredentialChange(credential.id, "platform", e.target.value)
                          }
                          placeholder="Platform name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`link-${credential.id}`}>Project Link</Label>
                        <Input
                          id={`link-${credential.id}`}
                          value={credential.link}
                          onChange={(e) =>
                            handleCredentialChange(credential.id, "link", e.target.value)
                          }
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-700">Access Credentials</h3>
                      <div className="space-y-2">
                        <Label htmlFor={`email-${credential.id}`}>Email</Label>
                        <Input
                          id={`email-${credential.id}`}
                          type="email"
                          value={credential.email}
                          onChange={(e) =>
                            handleCredentialChange(credential.id, "email", e.target.value)
                          }
                          placeholder="email@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`password-${credential.id}`}>Password</Label>
                        <Input
                          id={`password-${credential.id}`}
                          type="password"
                          value={credential.password}
                          onChange={(e) =>
                            handleCredentialChange(credential.id, "password", e.target.value)
                          }
                          placeholder="Enter password"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-700">API Configuration</h3>
                      <div className="space-y-2">
                        <Label htmlFor={`apiKey-${credential.id}`}>API Key</Label>
                        <Input
                          id={`apiKey-${credential.id}`}
                          value={credential.apiKey}
                          onChange={(e) =>
                            handleCredentialChange(credential.id, "apiKey", e.target.value)
                          }
                          placeholder="Enter API key"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
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