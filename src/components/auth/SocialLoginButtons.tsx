
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Provider } from "@supabase/supabase-js";
import { toast } from "sonner";

export const SocialLoginButtons = () => {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
    google: false,
    facebook: false,
  });

  const handleSocialLogin = async (provider: Provider) => {
    try {
      setIsLoading(prev => ({ ...prev, [provider]: true }));
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        toast.error(`Failed to sign in with ${provider}: ${error.message}`);
      }
    } catch (error: any) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button 
        type="button" 
        variant="outline" 
        className="bg-white"
        onClick={() => handleSocialLogin("google")}
        disabled={isLoading.google}
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="#4285F4"/>
          <path d="M12.205 10.88h-.447v3.728h.447c1.24 0 2.323-.81 2.731-1.984-.407-1.174-1.49-1.744-2.731-1.744z" fill="#34A853"/>
          <path d="M12.205 5.322a5.144 5.144 0 0 0-3.632 1.486l2.599 2.599a2.822 2.822 0 0 1 1.033-.199 2.815 2.815 0 0 1 2.813 2.813 2.822 2.822 0 0 1-.198 1.033l2.599 2.599a5.144 5.144 0 0 0 1.486-3.632 5.27 5.27 0 0 0-5.28-5.279z" fill="#FBBC05"/>
          <path d="M6.433 10.356a5.212 5.212 0 0 0 1.345 3.506l2.599-2.599a2.844 2.844 0 0 1-.633-1.786 2.822 2.822 0 0 1 .633-1.785L6.433 6.85a5.214 5.214 0 0 0-1.345 3.506z" fill="#EA4335"/>
        </svg>
        {isLoading.google ? "Connecting..." : "Google"}
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        className="bg-white"
        onClick={() => handleSocialLogin("facebook")}
        disabled={isLoading.facebook}
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path d="M9.1966 21.8741V13.6323H6.58312V10.3116H9.1966V7.84288C9.1966 4.98371 10.9213 3.45645 13.4857 3.45645C14.715 3.45645 15.7742 3.54476 16.0938 3.58403V6.53791L14.3072 6.53876C12.9056 6.53876 12.6301 7.20368 12.6301 8.17222V10.3116H15.9776L15.5347 13.6323H12.6301V21.8741H9.1966Z" fill="#1877F2"/>
        </svg>
        {isLoading.facebook ? "Connecting..." : "Facebook"}
      </Button>
    </div>
  );
};
