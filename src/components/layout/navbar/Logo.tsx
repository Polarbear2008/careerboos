
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center group">
      <div className="relative flex items-center px-1">
        <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm transition-all duration-300 group-hover:drop-shadow-md">
          CareerBoost
        </span>
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-secondary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      </div>
    </Link>
  );
};
