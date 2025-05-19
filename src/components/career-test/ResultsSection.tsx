
import { useLanguage } from "@/context/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Briefcase, TrendingUp, GraduationCap, Share2 } from "lucide-react";
import { FreelancerCard } from "@/components/ui/FreelancerCard";
import { motion } from "framer-motion";

interface ResultsSectionProps {
  skills: string[];
  ratings: Record<string, number>;
}

const ResultsSection = ({ skills, ratings }: ResultsSectionProps) => {
  const { t } = useLanguage();

  // Calculate average skill level
  const skillRatings = Object.entries(ratings).map(([key, value]) => {
    const skillName = key.split("-")[0];
    return { skill: skillName, rating: value };
  });

  const averageRating = skillRatings.reduce((acc, curr) => acc + curr.rating, 0) / skillRatings.length;
  
  // Mock job recommendations based on skills and ratings
  const jobRecommendations = [
    {
      title: "Frontend Developer",
      matchScore: 92,
      skills: ["JavaScript", "React", "TypeScript"],
      demand: "High",
      salaryRange: "$80,000 - $120,000"
    },
    {
      title: "UX/UI Designer",
      matchScore: 88,
      skills: ["UI/UX", "Figma", "Graphic Design"],
      demand: "High",
      salaryRange: "$75,000 - $110,000"
    },
    {
      title: "Data Analyst",
      matchScore: 85,
      skills: ["SQL", "Data Analysis", "Python"],
      demand: "Very High",
      salaryRange: "$85,000 - $130,000"
    },
    {
      title: "Digital Marketing Specialist",
      matchScore: 82,
      skills: ["Social Media", "Content Writing", "SEO"],
      demand: "Medium",
      salaryRange: "$60,000 - $90,000"
    }
  ];

  // Skills to develop recommendations
  const skillsToLearn = [
    { name: "React Native", demand: "High", reason: "Extends your React skills to mobile development" },
    { name: "AWS", demand: "Very High", reason: "Cloud skills are in high demand across all tech roles" },
    { name: "UX Research", demand: "Medium", reason: "Complements your design abilities with user insights" },
    { name: "Data Visualization", demand: "High", reason: "Enhance your ability to communicate data findings" }
  ];

  // Mock mentors/freelancers to learn from
  const experts = [
    {
      id: "expert1",
      name: "Alex Morgan",
      title: "Senior Frontend Developer",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.9,
      hourlyRate: "$65",
      skills: ["JavaScript", "React", "TypeScript", "Next.js"],
      successRate: 98,
      location: "New York, USA"
    },
    {
      id: "expert2",
      name: "Sarah Chen",
      title: "UX/UI Designer & Consultant",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.8,
      hourlyRate: "$70",
      skills: ["UI/UX", "Figma", "Prototype", "User Research"],
      successRate: 96,
      location: "San Francisco, USA"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-10 mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center space-y-4"
      >
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-gradient">
          {t("Your Career Assessment Results")}
        </h2>
        <p className="text-lg text-muted-foreground">
          {t("Based on your skills and experience, we've identified optimal career paths and growth opportunities.")}
        </p>
      </motion.div>

      <Tabs defaultValue="careers" className="mt-10">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="careers">
            <Briefcase className="h-4 w-4 mr-2" />
            {t("Career Matches")}
          </TabsTrigger>
          <TabsTrigger value="skills">
            <TrendingUp className="h-4 w-4 mr-2" />
            {t("Skills Analysis")}
          </TabsTrigger>
          <TabsTrigger value="learning">
            <GraduationCap className="h-4 w-4 mr-2" />
            {t("Learning Path")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="careers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="col-span-full space-y-6"
            >
              {jobRecommendations.map((job, index) => (
                <motion.div
                  key={job.title}
                  variants={item}
                  className="relative"
                >
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-16 bg-gradient-to-b from-primary to-secondary rounded-full opacity-70" />
                  <Card className="overflow-hidden hover-lift border-l-4" style={{ borderLeftColor: `hsla(var(--primary), ${job.matchScore/100})` }}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {job.skills.map(skill => (
                              <Badge key={skill} variant="outline" className="bg-muted/50">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                            <span>Demand: <span className="font-medium text-foreground">{job.demand}</span></span>
                            <span>Salary: <span className="font-medium text-foreground">{job.salaryRange}</span></span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="inline-flex items-center justify-center rounded-full w-20 h-20 bg-muted relative">
                              <div 
                                className="absolute inset-1 rounded-full border-4 border-primary/20"
                                style={{ 
                                  background: `conic-gradient(hsl(var(--primary)) ${job.matchScore}%, transparent 0)`
                                }}
                              />
                              <div className="bg-background rounded-full w-14 h-14 flex items-center justify-center z-10">
                                <span className="text-lg font-bold">{job.matchScore}%</span>
                              </div>
                            </div>
                            <div className="mt-1 text-xs font-medium">Match Score</div>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            View Jobs
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("Your Current Skills Profile")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">{t("Skill Levels")}</h4>
                  <div className="relative overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t("Skill")}</TableHead>
                          <TableHead>{t("Level")}</TableHead>
                          <TableHead>{t("Category")}</TableHead>
                          <TableHead>{t("Market Demand")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {skillRatings.map((item, i) => {
                          // Calculate mock levels and demand
                          const level = item.rating <= 25 ? "Beginner" :
                                       item.rating <= 50 ? "Intermediate" :
                                       item.rating <= 75 ? "Advanced" : "Expert";
                          
                          const category = item.skill.includes("JavaScript") || item.skill.includes("React") || 
                                          item.skill.includes("TypeScript") || item.skill.includes("Python") ? 
                                          "Programming" : 
                                          item.skill.includes("UI") || item.skill.includes("Design") || 
                                          item.skill.includes("Figma") ? "Design" : "Other";
                          
                          const demand = item.skill.includes("React") || item.skill.includes("TypeScript") ? "Very High" :
                                        item.skill.includes("JavaScript") || item.skill.includes("Python") ? "High" : "Medium";
                          
                          return (
                            <TableRow key={i}>
                              <TableCell className="font-medium">{item.skill}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-24 h-2 bg-muted rounded overflow-hidden mr-2">
                                    <div 
                                      className="h-full bg-primary"
                                      style={{ width: `${item.rating}%` }}
                                    />
                                  </div>
                                  <span>{level}</span>
                                </div>
                              </TableCell>
                              <TableCell>{category}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant={demand === "Very High" ? "default" : 
                                          demand === "High" ? "secondary" : "outline"}
                                >
                                  {demand}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-4">{t("Key Insights")}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
                        <div className="text-4xl font-bold mb-2">
                          {averageRating <= 25 ? "Beginner" :
                           averageRating <= 50 ? "Intermediate" :
                           averageRating <= 75 ? "Advanced" : "Expert"}
                        </div>
                        <p className="text-sm text-muted-foreground">Overall Profile Level</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
                        <div className="font-bold text-lg mb-2">
                          {skills.some(s => s.includes("JavaScript") || s.includes("React") || s.includes("Python")) ? 
                            "Programming" : "Design"}
                        </div>
                        <p className="text-sm text-muted-foreground">Primary Skill Domain</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
                        <div className="text-lg font-bold mb-2">
                          {skills.length} Core Skills
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {skills.length < 3 ? "Consider expanding your skill set" : 
                          skills.length < 5 ? "Good foundation to build upon" : 
                          "Strong diverse skill set"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="learning" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t("Recommended Skills to Develop")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {skillsToLearn.map((skill, index) => (
                      <div key={skill.name} className="flex gap-4 items-start pb-4 border-b last:border-0 last:pb-0">
                        <div className="bg-muted rounded-full p-2 flex-shrink-0 mt-0.5">
                          <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{skill.name}</h4>
                            <Badge variant={skill.demand === "Very High" ? "default" : skill.demand === "High" ? "secondary" : "outline"}>
                              {skill.demand} Demand
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{skill.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{t("Learning Resources")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Online Courses", "Books", "Tutorials", "Practice Projects"].map((resource, i) => (
                      <Button 
                        key={i} 
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <GraduationCap className="h-4 w-4 mr-2" />
                        {resource}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">{t("Learn from Experts")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experts.map((expert) => (
                <FreelancerCard
                  key={expert.id}
                  {...expert}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          {t("Download Report")}
        </Button>
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          {t("Share Results")}
        </Button>
        <Button variant="default" className="gap-2 bg-gradient-to-r from-primary to-secondary">
          {t("Explore Job Opportunities")}
        </Button>
      </div>
    </div>
  );
};

export default ResultsSection;
