"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Store } from "lucide-react";

export default function LoginPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    formData.set("flow", "signIn");

    try {
      setIsLoading(true);
      await signIn("password", formData);
      router.push("/bazaar");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 bg-white relative">
        <div className="absolute top-8 left-8">
           <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-[#FF6B6B] rounded-lg -rotate-3 flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-0 transition-transform">
                 <Store className="w-4 h-4 text-white" />
              </div>
              <span className="font-black italic text-lg">BazaarPlace</span>
           </Link>
        </div>

        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">Welcome back!</h1>
            <p className="text-gray-500 font-medium">Enter your details to access your account.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="hello@example.com"
                  className="h-12 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all font-medium rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-bold">Password</Label>
                  <Link href="#" className="text-sm font-bold text-[#FF6B6B] hover:underline">Forgot password?</Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  name="password" 
                  required 
                  className="h-12 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all font-medium rounded-xl"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-black text-white hover:bg-[#FF6B6B] font-bold rounded-xl text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400 font-bold tracking-wider">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => {
                signIn("google", {
                  redirectTo: "/api/auth/callback/google",
                });
              }}
              variant="outline"
              className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50 font-bold rounded-xl"
            >
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Google
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 font-medium">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-bold text-black hover:underline underline-offset-4">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex relative bg-[#FDFBF7] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#E3F2FD] rounded-full blur-[100px] opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FFF3E0] rounded-full blur-[100px] opacity-60 mix-blend-multiply" />
        
        <div className="relative z-10 text-center max-w-lg space-y-4 p-8">
           <div className="inline-block p-4 rounded-3xl bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.05)] rotate-3 mb-8 border-2 border-black/5">
              <div className="text-6xl mb-2">🛍️</div>
              <div className="font-bold text-gray-400 text-xs tracking-wider uppercase">Just Sold</div>
              <div className="font-black text-xl">Vintage Lamp</div>
              <div className="font-mono text-[#FF6B6B] font-bold">$45.00</div>
           </div>
           <h2 className="text-3xl font-black">Join the community</h2>
           <p className="text-gray-500 text-lg">Discover unique items and connect with sellers in your neighborhood today.</p>
        </div>
      </div>
    </div>
  );
}
