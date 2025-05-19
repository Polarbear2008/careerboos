
import { Link } from "react-router-dom";
import { FileText, Compass, Users, Briefcase, FilePlus } from "lucide-react";
import { useLanguage } from "@/context/useLanguage";
import { cn } from "@/lib/utils";

export const DesktopNav = () => {
  const { t } = useLanguage();
  
  const navItems = [
    { to: "/find-talent", icon: Users, text: t("nav.findTalent") },
    { to: "/find-work", icon: Briefcase, text: t("nav.findWork") },
    { to: "/post-project", icon: FilePlus, text: "Post a Project" },
    { to: "/cv-creator", icon: FileText, text: "CV Creator" },
    { to: "/career-test", icon: Compass, text: t("nav.careerTest") }
  ];
  
  return (
    <nav className="hidden lg:flex items-center bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-md rounded-full shadow-soft border border-white/30 px-2 ml-4">
      {navItems.map((item, index) => (
        <Link 
          key={item.to} 
          to={item.to} 
          className="group relative"
        >
          <span className={cn(
            "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-200",
            index !== navItems.length - 1 && "after:content-[''] after:h-4 after:w-px after:bg-gray-200 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2"
          )}>
            <item.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            {item.text}
            <div className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </span>
        </Link>
      ))}
    </nav>
  );
};
