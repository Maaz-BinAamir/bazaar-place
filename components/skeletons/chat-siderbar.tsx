"use client";

import { cn } from "@/lib/utils";

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-muted rounded-md",
        "transition-opacity duration-500 ease-in-out",
        className
      )}
    />
  );
}

export default function ChatSidebarSkeleton() {
  return (
    <div
      className="hidden md:flex flex-col w-80 lg:w-96 border-r-2 border-black bg-[#FDFBF7]"
    >
      {/* Header */}
      <div className="p-6 border-b-2 border-black bg-white">
        <SkeletonBox className="h-8 w-40 rounded bg-gray-200" />
      </div>

      {/* Conversations list */}
      <div className="p-4 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-4 border-2 border-black rounded-xl bg-white space-y-2"
          >
            <div className="flex items-center gap-3">
              {/* Image + avatar overlay */}
              <div className="relative">
                <SkeletonBox className="h-12 w-12 rounded-full border-2 border-black/10 bg-gray-200" />
                <SkeletonBox className="h-6 w-6 rounded-full absolute -bottom-1 -right-1 border-2 border-white bg-gray-300" />
              </div>

              {/* Text section */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between">
                  <SkeletonBox className="h-4 w-24 rounded bg-gray-200" />
                  <SkeletonBox className="h-3 w-8 rounded bg-gray-200" />
                </div>
                <SkeletonBox className="h-3 w-16 rounded bg-gray-200" />
                <SkeletonBox className="h-3 w-32 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
