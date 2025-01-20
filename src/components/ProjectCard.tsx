import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/project";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link to={`/project/${project.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800">
            {project.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-slate-600">
            {Object.keys(project.credentials).length} stored credentials
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};