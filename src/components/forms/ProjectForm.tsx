import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface ProjectFormProps {
  onSuccess?: () => void;
}

export const ProjectForm = ({ onSuccess }: ProjectFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    skills: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('projects')
        .insert({
          ...formData,
          user_id: user?.id,
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      toast.success("Project posted successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Failed to post project. Please try again.");
      console.error("Error posting project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Project Title</label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter project title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Describe your project..."
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Budget</label>
          <Input
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            type="number"
            required
            placeholder="Enter budget"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deadline</label>
          <Input
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            type="date"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Required Skills</label>
        <Input
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          required
          placeholder="Enter required skills (comma separated)"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post Project"}
      </Button>
    </form>
  );
};
