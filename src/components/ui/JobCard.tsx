
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  budget: string;
  skills: string[];
  postedAt: string;
  className?: string;
  variant?: "default" | "compact";
  style?: React.CSSProperties;
}

export const JobCard = ({
  id,
  title,
  company,
  location,
  description,
  budget,
  skills,
  postedAt,
  className,
  variant = "default",
  style,
}: JobCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      className={cn(
        "bg-card hover-lift rounded-lg border overflow-hidden transition-all",
        variant === "compact" ? "p-4" : "p-6",
        className
      )}
      style={style}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={cn(
            "font-semibold text-foreground hover:text-primary transition-colors",
            variant === "compact" ? "text-lg" : "text-xl"
          )}>
            {title}
          </h3>
          <div className="flex flex-wrap gap-2 mt-1.5">
            <span className="text-muted-foreground text-sm">{company}</span>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-muted-foreground text-sm">{location}</span>
          </div>
        </div>

        <button 
          onClick={toggleFavorite}
          className={cn(
            "text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary/5",
            isFavorite && "text-primary"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("h-5 w-5 transition-transform hover:scale-110", isFavorite && "fill-current animate-pulse")} />
        </button>
      </div>

      {variant === "default" && (
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {skills.slice(0, variant === "compact" ? 3 : 5).map((skill, index) => (
          <Badge 
            key={skill} 
            variant="outline"
            className={cn(
              "animate-fadeIn",
              "bg-muted/50 hover:bg-muted"
            )}
            style={{ animationDelay: `${index * 75}ms` }}
          >
            {skill}
          </Badge>
        ))}
        {skills.length > (variant === "compact" ? 3 : 5) && (
          <Badge 
            variant="outline"
            className={cn(
              "animate-fadeIn",
              "bg-muted/50 hover:bg-muted"
            )}
            style={{ animationDelay: `${(variant === "compact" ? 3 : 5) * 75}ms` }}
          >
            +{skills.length - (variant === "compact" ? 3 : 5)} more
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium">{budget}</span>
          <div className="text-xs text-muted-foreground mt-0.5">
            Posted {postedAt}
          </div>
        </div>

        <Button 
          size={variant === "compact" ? "sm" : "default"}
          className="shadow-sm transition-transform hover:scale-105"
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
