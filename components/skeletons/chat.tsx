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

export default function ChatSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-h-0 w-full bg-[#FDFBF7]">
      {/* Header skeleton */}
      <div className="p-6 sm:pr-12 border-b-2 border-black bg-white z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SkeletonBox className="h-14 w-14 rounded-xl border-2 border-black/10 bg-gray-200" />
            <div className="space-y-2">
              <SkeletonBox className="h-5 w-40 bg-gray-200" />
              <div className="flex items-center gap-2">
                <SkeletonBox className="h-4 w-16 bg-gray-200" />
                <SkeletonBox className="h-4 w-24 bg-gray-200" />
              </div>
            </div>
          </div>
          <SkeletonBox className="h-9 w-28 rounded-lg bg-gray-200" />
        </div>
      </div>

      {/* Messages skeleton */}
      <div className="flex-1 min-h-0 p-6 overflow-hidden">
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Left bubble */}
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md w-full">
              <div className="px-5 py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white rounded-bl-none">
                <SkeletonBox className="h-3 w-3/4 mb-2 bg-gray-200" />
                <SkeletonBox className="h-3 w-1/2 bg-gray-200" />
              </div>
            </div>
          </div>

          {/* Right bubble */}
          <div className="flex justify-end">
            <div className="max-w-xs lg:max-w-md w-full">
              <div className="px-5 py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-black rounded-br-none">
                <SkeletonBox className="h-3 w-3/4 mb-2 bg-gray-700" />
                <SkeletonBox className="h-3 w-1/2 bg-gray-700" />
              </div>
            </div>
          </div>

          {/* Another Left bubble */}
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md w-full">
              <div className="px-5 py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white rounded-bl-none">
                <SkeletonBox className="h-3 w-2/3 mb-2 bg-gray-200" />
                <SkeletonBox className="h-3 w-1/3 bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input skeleton */}
      <div className="p-6 border-t-2 border-black bg-white shadow-[0px_-4px_0px_0px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <SkeletonBox className="h-[52px] flex-1 rounded-xl bg-gray-100 border-2 border-black/10" />
          <SkeletonBox className="h-[52px] w-[52px] rounded-xl bg-gray-200 border-2 border-black/10" />
        </div>
      </div>
    </div>
  );
}
