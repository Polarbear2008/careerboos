
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Briefcase, 
  FileText, 
  Clock, 
  DollarSign, 
  Calendar,
  Upload,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ProjectForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Project posted successfully!",
        description: "You'll start receiving proposals from qualified talent soon.",
      });
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              Project Details
            </CardTitle>
            <CardDescription>
              Provide the basic details about your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input 
                id="title" 
                placeholder="E.g. Mobile App Development for E-commerce Platform" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your project, goals, and requirements in detail..." 
                rows={6}
                required
              />
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="webdev">Web Development</SelectItem>
                    <SelectItem value="mobiledev">Mobile Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="writing">Writing & Translation</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="admin">Admin Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expertise">Required Expertise Level</Label>
                <Select required>
                  <SelectTrigger id="expertise">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Skills & Requirements
            </CardTitle>
            <CardDescription>
              Specify required skills for your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills</Label>
              <Textarea 
                id="skills" 
                placeholder="Enter skills separated by commas (e.g. JavaScript, React, UI Design)" 
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Additional Requirements</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex items-start space-x-2">
                  <Checkbox id="req-portfolio" />
                  <Label htmlFor="req-portfolio" className="font-normal">Portfolio required</Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="req-cover" />
                  <Label htmlFor="req-cover" className="font-normal">Cover letter required</Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="req-native" />
                  <Label htmlFor="req-native" className="font-normal">Native language speaker</Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="req-certified" />
                  <Label htmlFor="req-certified" className="font-normal">Certification required</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Timeline & Budget
            </CardTitle>
            <CardDescription>
              Define your project's timeline and budget
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="timeline">Project Duration</Label>
                <Select required>
                  <SelectTrigger id="timeline">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lessThanWeek">Less than a week</SelectItem>
                    <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                    <SelectItem value="1month">1 month</SelectItem>
                    <SelectItem value="1-3months">1-3 months</SelectItem>
                    <SelectItem value="3-6months">3-6 months</SelectItem>
                    <SelectItem value="6months+">6+ months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">Project Deadline</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="deadline" 
                    type="date" 
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="budget-type">Budget Type</Label>
                <Select required>
                  <SelectTrigger id="budget-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Price</SelectItem>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Amount (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="budget" 
                    type="number" 
                    placeholder="Enter amount" 
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-500" />
              Attachments
            </CardTitle>
            <CardDescription>
              Upload relevant files to help freelancers understand your project better
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">Upload your files</h3>
              <p className="text-muted-foreground mb-4">Drag and drop files here or click to browse</p>
              <Button variant="outline" type="button">
                Choose Files
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Maximum file size: 25MB. Supported formats: PDF, DOC, JPG, PNG
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Review & Post</CardTitle>
            <CardDescription>
              Review your project details before posting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-2">
              <Checkbox id="agree-terms" required />
              <Label htmlFor="agree-terms" className="font-normal text-sm">
                I agree to the Terms of Service and understand that my project will be visible to potential freelancers
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="gap-2" disabled={isSubmitting}>
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="h-4 w-4" /> 
                  Post Project
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};
