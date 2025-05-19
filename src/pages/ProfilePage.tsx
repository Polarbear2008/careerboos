import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return <div className="container mx-auto py-8 text-center">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">First Name:</span>
            <span className="text-gray-600">{user?.user_metadata?.first_name || 'Not set'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Email:</span>
            <span className="text-gray-600">{user?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Joined:</span>
            <span className="text-gray-600">{new Date(user?.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="mt-6">
          <Link to="/">
            <Button variant="outline" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
