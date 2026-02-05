"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Store, Plus } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import SearchBar from "./search-bar";
import LogoutButton from "@/components/logout-button";

export default function Navbar() {
  const user = useQuery(api.users.currentUser);

  return (
    <nav className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-black/5 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-8">
        {/* Logo */}
        <Link href="/bazaar" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-10 h-10 bg-[#FF6B6B] rounded-xl -rotate-3 flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-0 group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-all">
             <Store className="w-5 h-5 text-white" />
          </div>
          <span className="hidden sm:inline-block text-xl font-black tracking-tight italic text-black">BazaarPlace</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <SearchBar />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Link href="/create-post" className="hidden sm:block">
            <Button className="rounded-full bg-black text-white hover:bg-[#FF6B6B] border-2 border-transparent font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
              <Plus className="w-4 h-4 mr-2" />
              Sell Item
            </Button>
          </Link>
          <Link href="/create-post" className="sm:hidden">
             <Button size="icon" className="rounded-full bg-black text-white hover:bg-[#FF6B6B]">
               <Plus className="w-5 h-5" />
             </Button>
          </Link>

          <div className="h-8 w-[1px] bg-black/10 mx-1"></div>

          <div className="flex items-center gap-2">
            <Link href="/profile" className="relative group">
               <div className="absolute inset-0 bg-black rounded-full translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all"></div>
              <Avatar className="h-10 w-10 border-2 border-black relative bg-white transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <AvatarImage src={user?.profile_picture ?? undefined} />
                <AvatarFallback className="bg-[#FFD93D] text-black font-bold">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Link>
            
            <div className="hidden sm:block">
                <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
