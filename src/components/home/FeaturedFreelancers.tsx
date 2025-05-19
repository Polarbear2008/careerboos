
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FreelancerCard } from "@/components/ui/FreelancerCard";

export const FeaturedFreelancers = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const featuredFreelancers = [
    {
      id: "f1",
      name: "Emma Rodriguez",
      title: "Senior UI/UX Designer",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4.9,
      hourlyRate: "$85",
      skills: ["UI Design", "UX Research", "Figma", "Prototyping", "Design Systems"],
      successRate: 98,
      location: "Toronto, Canada"
    },
    {
      id: "f2",
      name: "David Kim",
      title: "Full Stack Developer",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4.8,
      hourlyRate: "$95",
      skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
      successRate: 97,
      location: "Berlin, Germany"
    },
    {
      id: "f3",
      name: "Sophia Chen",
      title: "Content Strategist",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4.7,
      hourlyRate: "$70",
      skills: ["Content Planning", "SEO", "Blog Writing", "Copywriting", "Editing"],
      successRate: 95,
      location: "Singapore"
    },
    {
      id: "f4",
      name: "Michael Johnson",
      title: "Mobile App Developer",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4.9,
      hourlyRate: "$90",
      skills: ["Swift", "Kotlin", "Flutter", "React Native", "Firebase"],
      successRate: 99,
      location: "London, UK"
    },
    {
      id: "f5",
      name: "Olivia Martinez",
      title: "Digital Marketing Specialist",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4.8,
      hourlyRate: "$75",
      skills: ["Social Media", "PPC", "Analytics", "Email Marketing", "SEO"],
      successRate: 96,
      location: "Melbourne, Australia"
    }
  ];

  return (
    <section className="section-padding bg-muted/50">
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 animate-slideDown">
          <div>
            <h2 className="text-3xl font-bold mb-3">Top Freelancers</h2>
            <p className="text-muted-foreground">Highly-rated professionals ready for your next project</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollLeft}
              className="rounded-full transition-transform hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollRight}
              className="rounded-full transition-transform hover:scale-105"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex space-x-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredFreelancers.map((freelancer, index) => (
            <div 
              key={freelancer.id} 
              className="min-w-[350px] md:min-w-[400px] flex-shrink-0 snap-start"
            >
              <FreelancerCard 
                {...freelancer} 
                className="animate-slideInLeft"
                style={{ animationDelay: `${index * 150}ms` }}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center animate-slideUp" style={{ animationDelay: '300ms' }}>
          <Button
            className="shadow-sm px-8 transition-transform hover:scale-105"
            size="lg"
          >
            Browse All Freelancers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFreelancers;
