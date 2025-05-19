import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { ProjectForm } from "@/components/forms/ProjectForm";

interface Project {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  skills: string;
  user_id: string;
  created_at: string;
}

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleProjectPosted = () => {
    setShowForm(false);
    fetchProjects();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Find Work</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Post Project"}
        </Button>
      </div>

      {showForm && (
        <div className="mb-8">
          <ProjectForm onSuccess={handleProjectPosted} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Budget:</span>
                <span className="text-green-600">${project.budget}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-medium">Deadline:</span>
                <span>{new Date(project.deadline).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-medium">Skills:</span>
                <span className="text-gray-600">{project.skills}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
