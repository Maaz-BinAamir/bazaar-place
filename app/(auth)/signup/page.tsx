"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Store, ArrowRight, Sparkles } from "lucide-react";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuthActions();
  const router = useRouter();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    formData.set("flow", "signUp");

    try {
      setIsLoading(true);
      await signIn("password", formData);
      router.push("/bazaar");
    } catch (error) {
      console.error("Sign-up failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
       {/* Left Side - Visual */}
       <div className="hidden lg:flex relative bg-[#1A1A1A] text-white items-center justify-center overflow-hidden order-2 lg:order-1">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#FF6B6B] rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#4ECDC4] rounded-full blur-[120px] opacity-20" />
        
        <div className="relative z-10 max-w-lg p-12 space-y-12">
           <div className="space-y-4">
              <div className="w-12 h-12 bg-white rounded-xl rotate-3 flex items-center justify-center mb-6">
                 <Store className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-5xl font-black leading-tight">Turn your clutter into <span className="text-[#FF6B6B]">cash.</span></h2>
              <p className="text-xl text-gray-400">Join the fastest growing marketplace for unique finds and second-hand treasures.</p>
           </div>

           <div className="grid gap-6">
              {[
                 { title: "Free Listings", desc: "List as many items as you want, completely free." },
                 { title: "Secure Chat", desc: "Talk to buyers and sellers directly in the app." },
                 { title: "Local Finds", desc: "Discover hidden gems right in your neighborhood." }
              ].map((item, i) => (
                 <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                       <Sparkles className="w-3 h-3 text-[#FF6B6B]" />
                    </div>
                    <div>
                       <h3 className="font-bold text-lg">{item.title}</h3>
                       <p className="text-gray-500">{item.desc}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 bg-white relative order-1 lg:order-2">
         <div className="absolute top-8 right-8 lg:hidden">
           <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF6B6B] rounded-lg -rotate-3 flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                 <Store className="w-4 h-4 text-white" />
              </div>
           </Link>
        </div>

        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">Create Account</h1>
            <p className="text-gray-500 font-medium">Start your journey with BazaarPlace today.</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="font-bold">Username</Label>
                <Input 
                  id="username" 
                  type="text" 
                  name="username" 
                  required 
                  placeholder="username"
                  className="h-12 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all font-medium rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="email"
                  className="h-12 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all font-medium rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-bold">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  name="password" 
                  required 
                  placeholder="password"
                  className="h-12 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all font-medium rounded-xl"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-black text-white hover:bg-[#FF6B6B] font-bold rounded-xl text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all group"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-black hover:underline underline-offset-4">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
