
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./navbar/Logo";
import { DesktopNav } from "./navbar/DesktopNav";
import { MobileMenu } from "./navbar/MobileMenu";
import { AuthButtons } from "./navbar/AuthButtons";
import { LanguageSelector } from "./navbar/LanguageSelector";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScroll } from "@/hooks/use-scroll";

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const isScrolled = useScroll({ threshold: 10 });

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-3.5",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-elegant" 
          : "bg-transparent"
      )}
    >
      <div className="page-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <DesktopNav />
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <AuthButtons />
            
            <button 
              className={cn(
                "lg:hidden p-2 rounded-full transition-all duration-300",
                isMobileMenuOpen 
                  ? "bg-primary/10 text-primary rotate-90" 
                  : "hover:bg-muted"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="text-primary" /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu isOpen={isMobileMenuOpen} />
    </header>
  );
};

export default NavBar;
