"use client";

import { useAuthActions } from "@convex-dev/auth/react";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

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
    <Button variant={"secondary"} onClick={handleLogout}>
      Logout
    </Button>
  );
}
