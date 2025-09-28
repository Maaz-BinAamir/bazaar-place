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
      className="hidden md:block w-100 border-r border-border/50 backdrop-blur-sm"
      style={{ background: "var(--sidebar-bg)" }}
    >
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <SkeletonBox className="h-6 w-40 rounded" />
      </div>

      {/* Conversations list */}
      <div className="p-4 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-lg border border-border/30 bg-card/50"
          >
            <div className="flex items-center gap-3">
              {/* Image + avatar overlay */}
              <div className="relative">
                <SkeletonBox className="h-12 w-12 rounded-lg" />
                <SkeletonBox className="h-6 w-6 rounded-full absolute -bottom-1 -right-1 border-2 border-background" />
              </div>

              {/* Text section */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between">
                  <SkeletonBox className="h-4 w-28 rounded" />
                  <SkeletonBox className="h-3 w-10 rounded" />
                </div>
                <SkeletonBox className="h-3 w-16 rounded" />
                <SkeletonBox className="h-3 w-40 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
