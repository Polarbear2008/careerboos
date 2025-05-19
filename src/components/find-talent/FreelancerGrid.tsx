
import { useState } from "react";
import { FreelancerCard } from "./FreelancerCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data for freelancers
const freelancersData = [
  {
    id: "f1",
    name: "Alex Morgan",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Full Stack Developer",
    rating: 4.9,
    hourlyRate: "$45",
    location: "United States",
    skills: ["React", "Node.js", "TypeScript", "MongoDB"],
    verified: true,
    totalJobs: 78,
    successRate: "98%"
  },
  {
    id: "f2",
    name: "Sophia Chen",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "UI/UX Designer",
    rating: 4.8,
    hourlyRate: "$40",
    location: "Canada",
    skills: ["Figma", "UI Design", "User Research", "Prototyping"],
    verified: true,
    totalJobs: 53,
    successRate: "100%"
  },
  {
    id: "f3",
    name: "Marcus Johnson",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    title: "DevOps Engineer",
    rating: 4.7,
    hourlyRate: "$55",
    location: "Germany",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    verified: false,
    totalJobs: 41,
    successRate: "95%"
  },
  {
    id: "f4",
    name: "Emma Williams",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    title: "Content Writer & SEO Specialist",
    rating: 4.9,
    hourlyRate: "$35",
    location: "United Kingdom",
    skills: ["Content Strategy", "SEO", "Copywriting", "Blogging"],
    verified: true,
    totalJobs: 112,
    successRate: "99%"
  },
  {
    id: "f5",
    name: "Raj Patel",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    title: "Mobile App Developer",
    rating: 4.6,
    hourlyRate: "$50",
    location: "India",
    skills: ["React Native", "iOS", "Android", "Firebase"],
    verified: true,
    totalJobs: 37,
    successRate: "97%"
  },
  {
    id: "f6",
    name: "Olivia Martinez",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    title: "Digital Marketing Specialist",
    rating: 4.8,
    hourlyRate: "$40",
    location: "Spain",
    skills: ["Social Media", "PPC", "Analytics", "Email Marketing"],
    verified: false,
    totalJobs: 65,
    successRate: "96%"
  }
];

export const FreelancerGrid = () => {
  const [sortOption, setSortOption] = useState("relevance");
  const [freelancers, setFreelancers] = useState(freelancersData);
  
  const handleSort = (value: string) => {
    setSortOption(value);
    let sorted = [...freelancersData];
    
    switch (value) {
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "rateAsc":
        sorted.sort((a, b) => parseFloat(a.hourlyRate.substring(1)) - parseFloat(b.hourlyRate.substring(1)));
        break;
      case "rateDesc":
        sorted.sort((a, b) => parseFloat(b.hourlyRate.substring(1)) - parseFloat(a.hourlyRate.substring(1)));
        break;
      case "jobs":
        sorted.sort((a, b) => b.totalJobs - a.totalJobs);
        break;
      default:
        // relevance is default (original order)
        sorted = freelancersData;
    }
    
    setFreelancers(sorted);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Showing {freelancers.length} freelancers</p>
        
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <Select value={sortOption} onValueChange={handleSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Relevance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="rateAsc">Rate (Low to High)</SelectItem>
              <SelectItem value="rateDesc">Rate (High to Low)</SelectItem>
              <SelectItem value="jobs">Most Jobs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {freelancers.map(freelancer => (
          <FreelancerCard key={freelancer.id} freelancer={freelancer} />
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Button variant="outline" size="lg" className="gap-2">
          Load More Freelancers
        </Button>
      </div>
    </div>
  );
};
