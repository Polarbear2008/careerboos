
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  variant?: "default" | "minimal";
  onSearch?: (value: string) => void;
}

export const SearchBar = ({
  placeholder = "Search for any skill or service...",
  className,
  variant = "default",
  onSearch,
}: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const searchValue = formData.get("search") as string;
    
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "w-full",
        variant === "default" 
          ? "relative flex items-center" 
          : "flex items-center",
        className
      )}
    >
      {variant === "default" && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
      
      <input
        type="search"
        name="search"
        placeholder={placeholder}
        className={cn(
          "w-full transition-all focus-visible:ring-2 focus-visible:ring-offset-0",
          variant === "default" 
            ? "pl-12 pr-4 py-3 rounded-full border bg-background shadow-sm focus-visible:border-primary" 
            : "border-0 border-b bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:border-foreground px-0 py-2"
        )}
      />
      
      {variant === "minimal" && (
        <button type="submit" className="p-2">
          <Search className="h-5 w-5" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
