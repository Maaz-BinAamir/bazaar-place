"use client";

import { useSearchParams } from "next/navigation";
import Posts from "@/components/Posts";

export default function Page() {
  const params = useSearchParams();
  const query = params.get("q") || "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
               {query ? `Results for "${query}"` : "Fresh Finds"}
            </h1>
            <p className="text-gray-500 font-medium">
               {query ? "We hope you find what you're looking for." : "Discover the latest treasures added by the community."}
            </p>
          </div>
          
      </div>

      <Posts query={query} />
    </div>
  );
}
