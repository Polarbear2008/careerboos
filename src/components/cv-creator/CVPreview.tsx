
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Award, Briefcase, Download, Globe, GraduationCap, Mail, MapPin, Phone, Sparkles, User, Share2 } from "lucide-react";
import { toast } from "sonner";
import { CVFormValues } from "./types";
import { motion } from "framer-motion";

interface CVPreviewProps {
  formValues: CVFormValues;
  skills: string[];
}

const CVPreview = ({ formValues, skills }: CVPreviewProps) => {
  // Handle download
  const handleDownload = () => {
    toast.success("CV downloaded successfully!");
    // In a real app, this would generate and download a PDF
  };

  // Handle share
  const handleShare = () => {
    toast.success("Share link copied to clipboard!");
    // In a real app, this would generate a shareable link
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-4xl mx-auto border-none shadow-xl bg-white overflow-hidden">
        <CardHeader className="pb-6 border-b bg-gradient-to-r from-slate-50 to-blue-50">
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {formValues.personalInfo.fullName || "Your Name"}
            </h2>
            <p className="text-xl text-primary mt-1">
              {formValues.personalInfo.jobTitle || "Job Title"}
            </p>
            
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-sm">
              {formValues.personalInfo.email && (
                <motion.div 
                  className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail size={14} className="text-blue-500" />
                  <span>{formValues.personalInfo.email}</span>
                </motion.div>
              )}
              
              {formValues.personalInfo.phone && (
                <motion.div 
                  className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone size={14} className="text-blue-500" />
                  <span>{formValues.personalInfo.phone}</span>
                </motion.div>
              )}
              
              {formValues.personalInfo.location && (
                <motion.div 
                  className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin size={14} className="text-blue-500" />
                  <span>{formValues.personalInfo.location}</span>
                </motion.div>
              )}
              
              {formValues.personalInfo.website && (
                <motion.div 
                  className="flex items-center gap-1 text-slate-600"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Globe size={14} className="text-blue-500" />
                  <a href={formValues.personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Portfolio
                  </a>
                </motion.div>
              )}
            </div>
          </motion.div>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          {formValues.personalInfo.summary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h3 className="font-bold text-lg mb-2 pb-1 border-b text-slate-800 flex items-center gap-2">
                <User size={18} className="text-primary" /> Professional Summary
              </h3>
              <p className="text-slate-600">{formValues.personalInfo.summary}</p>
            </motion.div>
          )}
          
          {formValues.experience.some(exp => exp.title || exp.company) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <h3 className="font-bold text-lg mb-2 pb-1 border-b text-slate-800 flex items-center gap-2">
                <Briefcase size={18} className="text-primary" /> Work Experience
              </h3>
              <div className="space-y-4">
                {formValues.experience.map((exp, i) => {
                  if (!exp.title && !exp.company) return null;
                  return (
                    <motion.div 
                      key={i} 
                      className="pl-2 border-l-2 border-primary/20 hover:border-primary transition-colors pl-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (i * 0.1), duration: 0.3 }}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h4 className="font-semibold text-slate-800">{exp.title || "Position"}</h4>
                          <p className="text-primary">
                            {exp.company}{exp.location ? `, ${exp.location}` : ""}
                          </p>
                        </div>
                        {(exp.startDate || exp.endDate) && (
                          <p className="text-sm text-slate-500 bg-blue-50 px-3 py-1 rounded-full mt-1 md:mt-0">
                            {exp.startDate}{exp.startDate && exp.endDate ? " - " : ""}{exp.endDate || "Present"}
                          </p>
                        )}
                      </div>
                      {exp.description && <p className="mt-2 text-slate-600">{exp.description}</p>}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
          
          {formValues.education.some(edu => edu.degree || edu.institution) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <h3 className="font-bold text-lg mb-2 pb-1 border-b text-slate-800 flex items-center gap-2">
                <GraduationCap size={18} className="text-primary" /> Education
              </h3>
              <div className="space-y-4">
                {formValues.education.map((edu, i) => {
                  if (!edu.degree && !edu.institution) return null;
                  return (
                    <motion.div 
                      key={i} 
                      className="pl-2 border-l-2 border-primary/20 hover:border-primary transition-colors pl-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 0.3 }}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h4 className="font-semibold text-slate-800">{edu.degree || "Degree"}</h4>
                          <p className="text-primary">
                            {edu.institution}{edu.location ? `, ${edu.location}` : ""}
                          </p>
                        </div>
                        {(edu.startDate || edu.endDate) && (
                          <p className="text-sm text-slate-500 bg-blue-50 px-3 py-1 rounded-full mt-1 md:mt-0">
                            {edu.startDate}{edu.startDate && edu.endDate ? " - " : ""}{edu.endDate}
                          </p>
                        )}
                      </div>
                      {edu.description && <p className="mt-2 text-slate-600">{edu.description}</p>}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
          
          {skills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <h3 className="font-bold text-lg mb-2 pb-1 border-b text-slate-800 flex items-center gap-2">
                <Award size={18} className="text-primary" /> Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span 
                    key={i} 
                    className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + (i * 0.03), duration: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Sparkles size={12} className="text-blue-500" />
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center pt-8 pb-6 border-t mt-6 bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="flex gap-3">
            <Button 
              onClick={handleShare} 
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Share2 size={18} className="mr-2" /> Share
            </Button>
            <Button 
              onClick={handleDownload} 
              className="gradient-btn flex items-center gap-2 group"
            >
              <Download size={18} className="group-hover:translate-y-[-2px] transition-transform" /> Download CV
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CVPreview;
