"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Share2, Grid3X3, List, MessageCircle, Store, Mail, Phone, User } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfilePageSkeleton } from "./skeletons/user-profile";

export default function UserProfile({ id }: { id?: string }) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const data = useQuery(api.users.getProfile, { id: id as Id<"users"> });

  const user = data?.user;
  const posts = data?.posts;

  if (!user || !posts) {
    return <ProfilePageSkeleton />;
  }

  const displayName = user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username;

  const soldListings = posts?.filter((post) => post.status?.toLowerCase() === "sold")?.length || 0;
  
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "available": return "bg-green-100 text-green-800 border-green-200";
      case "sold": return "bg-red-100 text-red-800 border-red-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
           <Button variant="ghost" onClick={() => router.back()} className="font-bold hover:bg-black/5 -ml-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
           </Button>
           
           <div className="flex gap-3">
             {!id && (
               <Button 
                variant="outline" 
                size="sm" 
                onClick={() => router.push("/profile/edit")}
                className="rounded-xl font-bold border-2 border-black hover:bg-[#FFD93D] hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
               >
                 <MessageCircle className="w-4 h-4 mr-2" />
                 Edit Profile
               </Button>
             )}
             <Button
                variant="ghost"
                size="icon"
                className="rounded-xl border-2 border-black hover:bg-[#FF6B6B] hover:text-white transition-all"
                onClick={async () => {
                  try {
                    const url = id ? window.location.href : `${window.location.href}/${user._id}`;
                    await navigator.clipboard.writeText(url);
                    toast.success("Link copied!");
                  } catch (_) {
                    toast.error("Failed to copy link");
                  }
                }}
              >
                <Share2 className="w-4 h-4" />
              </Button>
           </div>
        </div>

        {/* Profile Card - Redesigned */}
        <div className="relative mb-20 mt-12">
           {/* Background Card */}
           <div className="bg-white rounded-[2.5rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-visible p-8 pt-24 md:pt-10 md:pl-56 min-h-[220px]">
              
              {/* Floating Avatar */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 md:top-1/2 md:-translate-y-1/2">
                 <div className="relative group">
                    <Avatar className="h-32 w-32 md:h-44 md:w-44 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                      <AvatarImage src={user?.profile_picture ?? undefined} className="object-cover" />
                      <AvatarFallback className="bg-[#FFD93D] text-black text-4xl font-black flex items-center justify-center">
                        <User className="h-16 w-16" />
                      </AvatarFallback>
                    </Avatar>
                 </div>
              </div>

              {/* User Info Content */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-center md:text-left">
                 
                 <div className="w-full md:w-auto space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight leading-none mb-2">
                       {displayName}
                    </h1>
                    <p className="text-xl font-bold text-black/40">@{user.username}</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
                       <div className="flex items-center text-sm font-bold text-black border-2 border-black bg-gray-50 px-3 py-1.5 rounded-lg">
                          <Mail className="w-4 h-4 mr-2" />
                          {user.email}
                       </div>
                       {user.phone && (
                         <div className="flex items-center text-sm font-bold text-black border-2 border-black bg-gray-50 px-3 py-1.5 rounded-lg">
                            <Phone className="w-4 h-4 mr-2" />
                            {user.phone}
                         </div>
                       )}
                    </div>
                 </div>

                 {/* Stats */}
                 <div className="flex gap-4 w-full md:w-auto justify-center md:justify-end">
                    <div className="bg-[#FFD93D] border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center min-w-[100px] transform rotate-2">
                       <div className="text-3xl font-black">{posts.length}</div>
                       <div className="text-xs font-bold uppercase tracking-wider">Items</div>
                    </div>
                    <div className="bg-[#FF6B6B] text-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center min-w-[100px] transform -rotate-1">
                       <div className="text-3xl font-black">{soldListings}</div>
                       <div className="text-xs font-bold uppercase tracking-wider">Sold</div>
                    </div>
                 </div>
              </div>

              {/* Description/Bio Placeholder (Optional) */}
              <div className="mt-8 pt-8 border-t-2 border-dashed border-black/10">
                 <p className="text-black/60 font-medium text-center md:text-left">
                    Member since 2024 • Verified Seller
                 </p>
              </div>

           </div>
        </div>

        {/* Listings Section */}
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-3xl font-black flex items-center gap-3">
              <span className="bg-black text-white p-2 rounded-lg transform -rotate-3">
                <Store className="w-6 h-6" />
              </span>
              Storefront
           </h2>
           
           <div className="flex bg-white rounded-xl p-1.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <button 
                 onClick={() => setViewMode("grid")}
                 className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-[#FFD93D] text-black border-2 border-black" : "text-gray-400 hover:text-black"}`}
              >
                 <Grid3X3 className="w-5 h-5" />
              </button>
              <button 
                 onClick={() => setViewMode("list")}
                 className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-[#FFD93D] text-black border-2 border-black" : "text-gray-400 hover:text-black"}`}
              >
                 <List className="w-5 h-5" />
              </button>
           </div>
        </div>

        {posts.length === 0 ? (
           <div className="bg-white rounded-3xl p-16 text-center border-2 border-black border-dashed">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black/10">
                 <Store className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-black mb-2">Empty Storefront</h3>
               <p className="text-black/50 font-medium text-lg max-w-md mx-auto">
                 This seller has not stocked their shelves yet. Check back later!
               </p>
           </div>
        ) : (
           <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-4"}>
              {posts.map((post) => (
                 <div 
                    key={post._id}
                    onClick={() => router.push(`/bazaar/${post._id}`)}
                    className={`
                       group cursor-pointer bg-white border-2 border-black transition-all duration-300
                       ${viewMode === "grid" 
                         ? "flex flex-col rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]" 
                         : "flex gap-6 p-4 rounded-xl hover:bg-gray-50 items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"}
                    `}
                 >
                    <div className={`relative overflow-hidden ${viewMode === "grid" ? "aspect-[4/3] w-full border-b-2 border-black rounded-t-[14px]" : "w-32 h-32 rounded-lg border-2 border-black flex-shrink-0"}`}>
                       <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                       {viewMode === "grid" && (
                          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-black uppercase border-2 border-black ${getStatusColor(post.status)}`}>
                             {post.status}
                          </div>
                       )}
                    </div>
                    
                    <div className={viewMode === "grid" ? "p-5" : "flex-1 min-w-0 pr-4"}>
                       <div className="flex justify-between items-start mb-2">
                          <h3 className="font-black text-xl leading-tight truncate pr-4">{post.title}</h3>
                          {viewMode === "list" && (
                             <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border-2 border-black ${getStatusColor(post.status)}`}>
                                {post.status}
                             </span>
                          )}
                       </div>
                       
                       <div className="flex items-center text-sm font-bold text-black/50 mb-4">
                          <MapPin className="w-4 h-4 mr-1" />
                          {post.location}
                       </div>
                       
                       <div className="flex items-center justify-between mt-auto">
                          <span className="text-2xl font-black">Rs. {post.price.toLocaleString()}</span>
                          {viewMode === "grid" && (
                            <div className="bg-black text-white p-2 rounded-full transform group-hover:rotate-45 transition-transform">
                                <ArrowLeft className="w-4 h-4 rotate-135" />
                            </div>
                          )}
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        )}
      </div>
    </div>
  );
}
