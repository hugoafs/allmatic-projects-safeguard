import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    setProjects(storedProjects);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Allmatic Projects Guard
          </h1>
          <Link to="/new">
            <Button>Add Project</Button>
          </Link>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">No projects yet</p>
            <Link to="/new">
              <Button>Create your first project</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;