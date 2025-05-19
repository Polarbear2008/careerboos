import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface WorkUploadFormProps {
  onSuccess?: () => void;
}

export const WorkUploadForm = ({ onSuccess }: WorkUploadFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    skills: "",
    price: "",
    duration: "",
    files: [] as FileList | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload files to Supabase Storage
      const uploadedFiles = await Promise.all(
        Array.from(formData.files || []).map(async (file) => {
          const { data, error } = await supabase.storage
            .from('work-files')
            .upload(`work/${user?.id}/${Date.now()}-${file.name}`, file);

          if (error) throw error;
          return data?.path;
        })
      );

      // Insert work into database
      const { error: insertError } = await supabase
        .from('works')
        .insert({
          ...formData,
          user_id: user?.id,
          files: uploadedFiles,
          created_at: new Date().toISOString()
        });

      if (insertError) throw insertError;

      toast.success("Work uploaded successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Failed to upload work. Please try again.");
      console.error("Error uploading work:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, files: e.target.files }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter work title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Describe your work..."
          className="min-h-[100px]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <Input
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          placeholder="Enter work category"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <Input
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            required
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Duration</label>
          <Input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            placeholder="Enter duration (hours)"
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

      <div>
        <label className="block text-sm font-medium mb-1">Upload Files</label>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            onChange={handleFileChange}
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
          />
          <span className="text-sm text-gray-500">
            Supported formats: PDF, DOC, DOCX, JPG, PNG, GIF
          </span>
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload Work"}
      </Button>
    </form>
  );
};
