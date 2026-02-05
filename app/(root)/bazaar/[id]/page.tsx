"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, MapPin, MessageCircle, Share2, ShieldCheck, User } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { format } from "date-fns";
import { ProductDetailsSkeleton } from "@/components/skeletons/product-details";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const post = useQuery(
    api.posts.getById,
    id ? { id: id as Id<"posts"> } : "skip"
  );

  const markAsSold = useMutation(api.posts.markAsSold);

  if (post === undefined) {
     return <ProductDetailsSkeleton />;
  }

  if (post === null) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md bg-white p-12 rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-6xl mb-4">🔭</div>
          <h2 className="text-3xl font-black text-black uppercase">Item Not Found</h2>
          <p className="text-black/60 font-medium text-lg">
            This artifact seems to have been lost to time (or deleted).
          </p>
          <Button 
            onClick={() => router.push('/bazaar')}
            className="w-full h-12 bg-black text-white rounded-xl font-bold hover:bg-[#FF6B6B] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all"
          >
            Return to Bazaar
          </Button>
        </div>
      </div>
    );
  }

  const isSold = post.status === "sold";

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24">
      {/* Navbar Placeholder/Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-6 flex justify-between items-center">
         <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="font-bold hover:bg-black/5 -ml-4 text-black/60 hover:text-black transition-colors"
         >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
         </Button>
         <Button
            variant="outline"
            size="icon"
            className="rounded-full border-2 border-black hover:bg-[#FFD93D] hover:text-black transition-colors"
            onClick={() => {
               navigator.clipboard.writeText(window.location.href);
               // Simple alert fallback if toast isn't available in this context
               alert("Link copied to clipboard!");
            }}
         >
            <Share2 className="w-4 h-4" />
         </Button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
           
           {/* LEFT COLUMN: VISUALS */}
           <div className="space-y-6">
              <div className="relative group">
                 {/* Main Image Container */}
                 <div className="aspect-[4/3] w-full relative bg-white rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <Image
                       src={post.image || ""}
                       alt={post.title}
                       fill
                       className={`object-cover ${isSold ? "grayscale contrast-125" : ""}`}
                       priority
                    />
                    
                    {/* Status Stickers */}
                    {isSold && (
                       <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                          <div className="bg-[#FF6B6B] text-white px-8 py-4 rotate-[-12deg] border-4 border-white shadow-xl">
                             <span className="text-4xl font-black uppercase tracking-widest">SOLD</span>
                          </div>
                       </div>
                    )}
                 </div>

                 {/* Price Tag - Floating */}
                 <div className="absolute -bottom-6 -right-4 bg-[#FFD93D] text-black px-6 py-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-2 group-hover:rotate-0 transition-transform">
                    <p className="text-xs font-bold text-black/60 uppercase tracking-wider">Price</p>
                    <p className="text-3xl font-black">Rs. {post.price?.toLocaleString()}</p>
                 </div>
              </div>

              {/* Description Card */}
              <div className="bg-white rounded-3xl border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] mt-12">
                 <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-[#4ECDC4]" />
                    Item Details
                 </h3>
                 <p className="text-lg text-black/80 leading-relaxed whitespace-pre-wrap font-medium">
                    {post.description}
                 </p>
                 
                 <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200 flex flex-wrap gap-4">
                    <div className="bg-gray-50 px-4 py-2 rounded-lg border border-black/5">
                       <span className="text-xs font-bold text-gray-400 uppercase block">Posted</span>
                       <span className="font-bold">{format(new Date(post._creationTime), "MMM d, yyyy")}</span>
                    </div>
                    <div className="bg-gray-50 px-4 py-2 rounded-lg border border-black/5">
                       <span className="text-xs font-bold text-gray-400 uppercase block">Location</span>
                       <span className="font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {post.location}
                       </span>
                    </div>
                 </div>
              </div>
           </div>


           {/* RIGHT COLUMN: ACTIONS & SELLER */}
           <div className="space-y-6 md:sticky md:top-24">
              
              {/* Title Section */}
              <div>
                 <h1 className="text-4xl md:text-5xl font-black text-black leading-[0.95] tracking-tight mb-4">
                    {post.title}
                 </h1>
                 <div className="flex gap-2">
                    {/* <span className="px-3 py-1 bg-black text-white text-xs font-bold rounded-full">
                       {post.category || "General"}
                    </span> */}
                 </div>
              </div>

              {/* Seller Card */}
              <div 
                 className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:-translate-y-1 transition-transform"
                 onClick={() => router.push(`/profile/${post.author?._id}`)}
              >
                 <div className="flex items-center gap-4">
                    <div className="h-16 w-16 shrink-0">
                       <Avatar className="h-full w-full border-2 border-black bg-white">
                          <AvatarImage src={post.author?.profile_picture || ""} className="object-cover" />
                          <AvatarFallback className="bg-[#FFD93D] text-black text-xl font-black">
                             <User className="h-8 w-8" />
                          </AvatarFallback>
                       </Avatar>
                    </div>
                    <div className="min-w-0">
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Listed by</p>
                       <h3 className="text-xl font-bold truncate">{post.author?.name}</h3>
                       <p className="text-sm font-medium text-[#4ECDC4]">View full profile →</p>
                    </div>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                 {post.isAuthor ? (
                    <Button
                       className={`w-full h-14 text-lg font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all
                       ${isSold ? "bg-gray-100 text-gray-400" : "bg-[#FF6B6B] text-white hover:bg-[#FF6B6B]/90"}`}
                       onClick={() => {
                          if (isSold) return;
                          markAsSold({ id: post._id });
                       }}
                       disabled={isSold}
                    >
                       {isSold ? "Item Sold" : "Mark as Sold"}
                    </Button>
                 ) : (
                    <Button
                       className="w-full h-14 text-lg font-bold bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_#4ECDC4] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-black/90 transition-all"
                       onClick={() => router.push(`/chat?newFromPost=${post._id}`)}
                       disabled={isSold}
                    >
                       <MessageCircle className="w-5 h-5 mr-2" />
                       {isSold ? "Sold Out" : "Contact Seller"}
                    </Button>
                 )}
                 
                 {!post.isAuthor && !isSold && (
                    <p className="text-xs text-center text-gray-500 font-medium px-4">
                       Safe transaction tip: Meet in public places and inspect the item before paying.
                    </p>
                 )}
              </div>

           </div>
        </div>
      </div>
    </div>
  );
}
