
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter as FilterIcon, X } from "lucide-react";

interface FilterSidebarProps {
  onFilter: (filters: Record<string, any>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const FilterSidebar = ({ onFilter, isOpen, onClose }: FilterSidebarProps) => {
  const [category, setCategory] = useState<string>("");
  const [hourlyRate, setHourlyRate] = useState<[number, number]>([10, 100]);
  const [skills, setSkills] = useState<Record<string, boolean>>({
    javascript: false,
    react: false,
    python: false,
    design: false,
    marketing: false,
    writing: false,
  });
  const [location, setLocation] = useState<string>("");
  
  const handleSkillChange = (skill: string, checked: boolean) => {
    setSkills(prev => ({ ...prev, [skill]: checked }));
  };
  
  const handleClearAll = () => {
    setCategory("");
    setHourlyRate([10, 100]);
    setSkills({
      javascript: false,
      react: false,
      python: false,
      design: false,
      marketing: false,
      writing: false,
    });
    setLocation("");
  };
  
  const handleApplyFilters = () => {
    const selectedSkills = Object.entries(skills)
      .filter(([, isSelected]) => isSelected)
      .map(([skill]) => skill);
      
    onFilter({
      category,
      hourlyRateMin: hourlyRate[0],
      hourlyRateMax: hourlyRate[1],
      skills: selectedSkills,
      location,
    });
    
    if (window.innerWidth < 1024) {
      onClose();
    }
  };
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`
          fixed lg:sticky top-0 lg:top-24 h-full lg:h-auto overflow-y-auto bg-white shadow-md z-40 
          w-80 transition-all duration-300 
          ${isOpen ? "left-0" : "-left-full"} 
          lg:left-0 lg:w-full lg:shadow-none lg:z-0 lg:bg-transparent
        `}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FilterIcon className="h-5 w-5" /> Filters
            </h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="search-talent">Search by keyword</Label>
              <div className="relative mt-1.5">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="search-talent"
                  placeholder="E.g. JavaScript, Designer" 
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label>Category</Label>
              <div className="space-y-1.5 mt-1.5">
                {["Web Development", "Design", "Writing", "Marketing", "Admin Support"].map((cat) => (
                  <div key={cat} className="flex items-start gap-2">
                    <Checkbox 
                      id={`category-${cat}`}
                      checked={category === cat}
                      onCheckedChange={(checked) => setCategory(checked ? cat : "")} 
                    />
                    <Label htmlFor={`category-${cat}`} className="font-normal cursor-pointer">
                      {cat}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Hourly Rate (USD)</Label>
              <div className="mt-6 px-2">
                <Slider
                  defaultValue={[10, 100]}
                  max={200}
                  step={5}
                  value={hourlyRate}
                  onValueChange={(value) => setHourlyRate(value as [number, number])}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>${hourlyRate[0]}</span>
                  <span>${hourlyRate[1]}+</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label>Skills</Label>
              <div className="space-y-1.5 mt-1.5">
                {Object.entries(skills).map(([skill, checked]) => (
                  <div key={skill} className="flex items-start gap-2">
                    <Checkbox 
                      id={`skill-${skill}`}
                      checked={checked}
                      onCheckedChange={(checked) => handleSkillChange(skill, !!checked)} 
                    />
                    <Label htmlFor={`skill-${skill}`} className="font-normal cursor-pointer capitalize">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location"
                placeholder="Any location" 
                className="mt-1.5"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleClearAll}
              >
                Clear All
              </Button>
              <Button 
                className="flex-1"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
