import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

export const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const updatedProjects = projects.filter((p: Project) => p.id !== project.id);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    
    onDelete(project.id);
    toast.success("Project deleted successfully");
  };

  return (
    <Link to={`/project/${project.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white border-slate-200 group relative">
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-slate-800">
            {project.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-slate-600">
            {project.credentials.platform ? (
              <span>Platform: {project.credentials.platform}</span>
            ) : (
              <span>{Object.keys(project.credentials).length} stored credentials</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};