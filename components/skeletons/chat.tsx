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
    <div className="flex-1 flex flex-col w-full">
      {/* Header skeleton */}
      <div className="p-6 pr-12 border-b border-border/50 backdrop-blur-sm bg-card/30">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <SkeletonBox className="h-14 w-14 rounded-full" />
            <div className="space-y-2">
              <SkeletonBox className="h-4 w-32" />
              <SkeletonBox className="h-3 w-20" />
              <SkeletonBox className="h-3 w-28" />
            </div>
          </div>
          <SkeletonBox className="h-6 w-24 rounded-md" />
        </div>
      </div>

      {/* Messages skeleton */}
      <div className="flex-1 min-h-0 p-6 overflow-hidden">
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Left bubble */}
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md">
              <div className="px-4 py-3 rounded-2xl bg-chat-bubble-other rounded-bl-md">
                <SkeletonBox className="h-3 w-40 mb-2" />
                <SkeletonBox className="h-3 w-24" />
              </div>
            </div>
          </div>

          {/* Right bubble */}
          <div className="flex justify-end">
            <div className="max-w-xs lg:max-w-md">
              <div className="px-4 py-3 rounded-2xl bg-chat-bubble-user rounded-br-md">
                <SkeletonBox className="h-3 w-36 mb-2" />
                <SkeletonBox className="h-3 w-16" />
              </div>
            </div>
          </div>

          {/* Another Left bubble */}
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md">
              <div className="px-4 py-3 rounded-2xl bg-chat-bubble-other rounded-bl-md">
                <SkeletonBox className="h-3 w-28 mb-2" />
                <SkeletonBox className="h-3 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input skeleton */}
      <div className="p-6 border-t border-border/50 backdrop-blur-sm bg-card/30">
        <div className="flex items-center gap-3">
          <SkeletonBox className="h-12 flex-1 rounded-2xl" />
          <SkeletonBox className="h-12 w-12 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
