"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    formData.set("flow", "signUp");
    console.log("Form data:", formData);

    const data = {
      username: (formData.get("username") as string) || "",
      email: (formData.get("email") as string) || "",
      password: (formData.get("password") as string) || "",
      flow: "signUp",
    };
    console.log("Sign-up data:", data);

    try {
      await signIn("password", formData);
      // Redirect to a different page or show a success message
      router.push("/bazaar");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Details</CardTitle>
        </CardHeader>
        <form onSubmit={handleSignUp}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="username" name="username" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="first">First Name</Label>
                <Input id="first" type="text" name="first" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="last">Last Name</Label>
                <Input id="last" type="text" name="last" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="address">Address</Label>
                <Input id="address" type="text" name="address" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="text" name="phone" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-6">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
