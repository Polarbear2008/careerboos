
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobCard } from "@/components/ui/JobCard";
import { Search, MapPin, BriefcaseBusiness, FilterX, Briefcase, DollarSign, Calendar, SlidersHorizontal, Bookmark, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { SearchBar } from "@/components/shared/SearchBar";

// Sample job data
const jobs = [
  {
    id: "j1",
    title: "Senior React Developer",
    company: "TechSolutions Inc.",
    location: "Remote, Worldwide",
    description: "We're looking for an experienced React developer to join our team. You'll work on cutting-edge projects using the latest technologies.",
    budget: "$70-90/hr",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    postedAt: "2 days ago"
  },
  {
    id: "j2",
    title: "UI/UX Designer",
    company: "DesignMasters",
    location: "New York, USA",
    description: "Join our creative team to design beautiful and intuitive interfaces for our clients in finance, healthcare, and education sectors.",
    budget: "$60-80/hr",
    skills: ["Figma", "UI Design", "Prototyping", "User Research", "Adobe XD"],
    postedAt: "1 day ago"
  },
  {
    id: "j3",
    title: "Full Stack JavaScript Developer",
    company: "WebWizards",
    location: "Remote, USA",
    description: "Looking for a talented full-stack developer with experience in JavaScript frameworks to help build modern web applications.",
    budget: "$65-85/hr",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    postedAt: "5 hours ago"
  },
  {
    id: "j4",
    title: "Data Scientist",
    company: "DataMinds",
    location: "Berlin, Germany",
    description: "Join our data science team to work on machine learning models and help clients extract valuable insights from their data.",
    budget: "$75-95/hr",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization", "Statistics"],
    postedAt: "3 days ago"
  },
  {
    id: "j5",
    title: "WordPress Developer",
    company: "WebPress Solutions",
    location: "Remote, Europe",
    description: "Seeking a WordPress expert to build and maintain custom websites for our clients in various industries.",
    budget: "$45-65/hr",
    skills: ["WordPress", "PHP", "JavaScript", "CSS", "MySQL"],
    postedAt: "1 week ago"
  },
  {
    id: "j6",
    title: "DevOps Engineer",
    company: "CloudNative Inc.",
    location: "Remote, Worldwide",
    description: "Looking for a DevOps engineer to help us improve our CI/CD pipelines and cloud infrastructure on AWS and GCP.",
    budget: "$80-110/hr",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    postedAt: "4 days ago"
  }
];

// Job categories
const categories = [
  { name: "Web Development", count: 1243, icon: <Briefcase className="w-4 h-4" /> },
  { name: "Design", count: 874, icon: <TrendingUp className="w-4 h-4" /> },
  { name: "Writing", count: 543, icon: <Briefcase className="w-4 h-4" /> },
  { name: "Admin Support", count: 324, icon: <Briefcase className="w-4 h-4" /> },
  { name: "Customer Service", count: 218, icon: <Briefcase className="w-4 h-4" /> },
  { name: "Marketing", count: 176, icon: <TrendingUp className="w-4 h-4" /> },
  { name: "Accounting", count: 134, icon: <DollarSign className="w-4 h-4" /> },
  { name: "Legal", count: 87, icon: <Briefcase className="w-4 h-4" /> }
];

// Locations
const locations = [
  { name: "Remote", count: 2154 },
  { name: "United States", count: 1243 },
  { name: "Europe", count: 754 },
  { name: "Asia", count: 432 },
  { name: "Australia", count: 175 },
  { name: "Africa", count: 98 }
];

const FindWork = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [salaryRange, setSalaryRange] = useState([40, 100]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [activeView, setActiveView] = useState("all");
  const [isSaved, setIsSaved] = useState<Record<string, boolean>>({});

  const toggleSaveJob = (id: string) => {
    setIsSaved(prev => {
      const newState = { ...prev, [id]: !prev[id] };
      toast.success(newState[id] ? "Job saved to favorites" : "Job removed from favorites");
      return newState;
    });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterReset = () => {
    setSalaryRange([40, 100]);
    setFilteredJobs(jobs);
    setSearchTerm("");
    toast.success("Filters have been reset");
  };

  const applyFilters = () => {
    toast.success("Filters applied successfully");
    // In a real app, this would apply all the selected filters
    // For demo, we'll just set the filtered jobs to the original list
    setFilteredJobs(jobs);
  };

  // Page transition animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/5 to-secondary/10 pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="absolute inset-0 pattern-bg opacity-5"></div>
        <div className="page-container relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Find Your <span className="text-gradient">Perfect Job</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Browse thousands of job opportunities from top companies around the world
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center bg-white/90 backdrop-blur-md shadow-soft rounded-lg p-4 max-w-2xl mx-auto">
              <SearchBar 
                variant="default"
                placeholder="Search job titles, skills, or keywords..."
                className="flex-1"
                onSearch={handleSearch}
              />
              <Button size="lg" className="w-full sm:w-auto gradient-btn shadow-soft">
                <Search className="w-4 h-4 mr-1" /> Find Jobs
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-primary">
              <span className="text-muted-foreground">Popular searches:</span>
              <Button variant="link" size="sm" className="h-auto p-0">Web Developer</Button>
              <Button variant="link" size="sm" className="h-auto p-0">UI Designer</Button>
              <Button variant="link" size="sm" className="h-auto p-0">Data Scientist</Button>
              <Button variant="link" size="sm" className="h-auto p-0">Project Manager</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 page-container">
        <Tabs defaultValue="all" className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="bg-muted/50 p-1 rounded-lg">
              <TabsTrigger 
                value="all" 
                onClick={() => setActiveView("all")}
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                All Jobs
              </TabsTrigger>
              <TabsTrigger 
                value="saved" 
                onClick={() => setActiveView("saved")}
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Saved Jobs
              </TabsTrigger>
              <TabsTrigger 
                value="applied" 
                onClick={() => setActiveView("applied")}
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Applied
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-3 py-1.5 bg-muted/50">
                <Calendar className="mr-1 h-3.5 w-3.5" />
                Last 7 days
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5 bg-muted/50">
                <MapPin className="mr-1 h-3.5 w-3.5" />
                Remote
              </Badge>
              <Button size="sm" variant="outline" onClick={handleFilterReset}>
                <FilterX className="mr-1 h-3.5 w-3.5" />
                Reset
              </Button>
            </div>
          </div>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="sticky top-24 border-none shadow-soft bg-white/90 backdrop-blur-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center">
                    <SlidersHorizontal className="mr-2 h-4 w-4 text-primary" />
                    Filters
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleFilterReset}
                    className="h-8 text-muted-foreground hover:text-foreground"
                  >
                    <FilterX className="mr-1 h-3.5 w-3.5" />
                    Reset
                  </Button>
                </div>
                
                {/* Categories filter */}
                <div className="mb-6 space-y-4">
                  <h4 className="font-medium text-sm uppercase text-muted-foreground">Categories</h4>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-2 scrollbar-hide">
                    {categories.map((category, i) => (
                      <div key={category.name} className="flex items-center justify-between group">
                        <div className="flex items-center">
                          <Checkbox id={`category-${i}`} />
                          <label 
                            htmlFor={`category-${i}`}
                            className="ml-2 text-sm cursor-pointer group-hover:text-primary transition-colors"
                          >
                            <div className="flex items-center">
                              {category.icon}
                              <span className="ml-1.5">{category.name}</span>
                            </div>
                          </label>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                          {category.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Hourly rate slider */}
                <div className="mb-6 space-y-4">
                  <h4 className="font-medium text-sm uppercase text-muted-foreground">Hourly Rate</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={salaryRange}
                      min={0}
                      max={200}
                      step={5}
                      value={salaryRange}
                      onValueChange={setSalaryRange}
                      className="my-6"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">${salaryRange[0]}</div>
                      <div className="font-medium">${salaryRange[1]}+</div>
                    </div>
                  </div>
                </div>
                
                {/* Location filter */}
                <div className="mb-6 space-y-4">
                  <h4 className="font-medium text-sm uppercase text-muted-foreground">Location</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
                    {locations.map((location, i) => (
                      <div key={location.name} className="flex items-center justify-between group">
                        <div className="flex items-center">
                          <Checkbox id={`location-${i}`} />
                          <label 
                            htmlFor={`location-${i}`}
                            className="ml-2 text-sm cursor-pointer group-hover:text-primary transition-colors"
                          >
                            {location.name}
                          </label>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                          {location.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full gradient-btn" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Main job listings */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {activeView === "all" ? "Available Jobs" : 
                  activeView === "saved" ? "Saved Jobs" : "Applied Jobs"}
                <Badge variant="outline" className="ml-2 bg-primary/10 font-normal">
                  {filteredJobs.length} jobs
                </Badge>
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="text-sm bg-transparent border-none focus:ring-0">
                  <option>Relevance</option>
                  <option>Newest</option>
                  <option>Highest Pay</option>
                </select>
              </div>
            </div>

            <motion.div 
              className="space-y-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <BriefcaseBusiness className="w-16 h-16 mx-auto text-muted" />
                  <h3 className="mt-4 text-xl font-medium">No jobs found</h3>
                  <p className="mt-2 text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
                  <Button className="mt-4" variant="outline" onClick={handleFilterReset}>
                    Reset Filters
                  </Button>
                </div>
              ) : (
                filteredJobs.map((job, index) => (
                  <motion.div key={job.id} variants={itemVariants}>
                    <JobCard 
                      {...job}
                      className="relative overflow-visible"
                      variant="default"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full"
                      onClick={() => toggleSaveJob(job.id)}
                    >
                      <Bookmark
                        className={`h-5 w-5 ${isSaved[job.id] ? 'fill-primary text-primary' : ''}`}
                      />
                    </Button>
                  </motion.div>
                ))
              )}
            </motion.div>
            
            {filteredJobs.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="mr-2">Previous</Button>
                <Button variant="outline" className="bg-primary/10">1</Button>
                <Button variant="outline" className="mx-1">2</Button>
                <Button variant="outline" className="mx-1">3</Button>
                <Button variant="outline" className="ml-2">Next</Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/10">
        <div className="page-container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated on New Opportunities</h2>
            <p className="text-muted-foreground mb-6">
              Get the latest job listings delivered straight to your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="rounded-lg" />
              <Button className="gradient-btn">Subscribe</Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              By subscribing, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FindWork;
