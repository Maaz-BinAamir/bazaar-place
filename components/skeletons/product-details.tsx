"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProductDetailsSkeleton() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24">
      {/* Navbar Placeholder/Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-6 flex justify-between items-center">
         <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="font-bold hover:bg-black/5 -ml-4 text-black/60"
         >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
         </Button>
         <Button
            variant="outline"
            size="icon"
            className="rounded-full border-2 border-black bg-transparent"
            disabled
         >
            <Share2 className="w-4 h-4 text-black/20" />
         </Button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
           
           {/* LEFT COLUMN: VISUALS */}
           <div className="space-y-6">
              <div className="relative">
                 {/* Main Image Container */}
                 <div className="aspect-[4/3] w-full relative bg-white rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
                    <Skeleton className="w-full h-full bg-gray-100" />
                 </div>
              </div>

              {/* Description Card */}
              <div className="bg-white rounded-3xl border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] mt-12 space-y-4">
                 <div className="flex items-center gap-2 mb-6">
                    <Skeleton className="w-6 h-6 rounded-md bg-gray-200" />
                    <Skeleton className="w-32 h-6 rounded-md bg-gray-200" />
                 </div>
                 <div className="space-y-2">
                    <Skeleton className="w-full h-4 rounded-full bg-gray-100" />
                    <Skeleton className="w-full h-4 rounded-full bg-gray-100" />
                    <Skeleton className="w-3/4 h-4 rounded-full bg-gray-100" />
                 </div>
                 
                 <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-100 flex gap-4">
                    <Skeleton className="w-24 h-10 rounded-lg bg-gray-100" />
                    <Skeleton className="w-32 h-10 rounded-lg bg-gray-100" />
                 </div>
              </div>
           </div>


           {/* RIGHT COLUMN: ACTIONS & SELLER */}
           <div className="space-y-6 md:sticky md:top-24">
              
              {/* Title Section */}
              <div className="space-y-4">
                 <Skeleton className="w-3/4 h-12 rounded-lg bg-gray-200" />
                 <Skeleton className="w-20 h-6 rounded-full bg-black/10" />
              </div>

              {/* Seller Card */}
              <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
                 <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full border-2 border-black/10 bg-gray-100 shrink-0" />
                    <div className="space-y-2 flex-1">
                       <Skeleton className="w-16 h-3 rounded-full bg-gray-100" />
                       <Skeleton className="w-32 h-6 rounded-md bg-gray-200" />
                       <Skeleton className="w-24 h-4 rounded-md bg-gray-100" />
                    </div>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                 <Skeleton className="w-full h-14 rounded-xl bg-gray-200" />
              </div>

           </div>
        </div>
      </div>
    </div>
  );
}
