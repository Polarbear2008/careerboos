import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { WorkUploadForm } from "@/components/forms/WorkUploadForm";
import { Download } from "lucide-react";

interface Work {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  duration: string;
  skills: string;
  files: string[];
  user_id: string;
  created_at: string;
}

export const WorkUploadPage = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorks(data || []);
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  };

  const handleWorkUploaded = () => {
    setShowForm(false);
    fetchWorks();
  };

  const getDownloadUrl = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('work-files')
        .getPublicUrl(path);

      if (error) throw error;
      return data?.publicUrl;
    } catch (error) {
      console.error("Error getting download URL:", error);
      return null;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Upload Work</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Upload Work"}
        </Button>
      </div>

      {showForm && (
        <div className="mb-8">
          <WorkUploadForm onSuccess={handleWorkUploaded} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work) => (
          <div
            key={work.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{work.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{work.description}</p>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Category:</span>
                <span className="text-gray-600">{work.category}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-medium">Price:</span>
                <span className="text-green-600">${work.price}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-medium">Duration:</span>
                <span>{work.duration} hours</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-medium">Skills:</span>
                <span className="text-gray-600">{work.skills}</span>
              </div>
            </div>

            {work.files && work.files.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Files:</h3>
                <div className="flex flex-wrap gap-2">
                  {work.files.map((file, index) => (
                    <a
                      key={index}
                      href={getDownloadUrl(file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Download className="h-4 w-4 inline mr-1" />
                      {file.split('/').pop()}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
