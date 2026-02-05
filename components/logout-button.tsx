"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button 
        onClick={handleLogout} 
        variant="ghost" 
        size="sm"
        className="text-gray-500 hover:text-[#FF6B6B] hover:bg-red-50 font-bold rounded-full px-4"
    >
      <LogOut className="h-4 w-4 sm:mr-2" />
      <span className="hidden sm:inline">Log out</span>
    </Button>
  );
}
