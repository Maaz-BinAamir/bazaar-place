"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
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

export default function ProfileFormSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center pb-6 relative">
            <div className="absolute left-4 top-0 flex items-center gap-1">
              <SkeletonBox className="h-4 w-4 rounded" />{" "}
              <SkeletonBox className="h-4 w-12" />{" "}
            </div>

            <SkeletonBox className="h-6 w-32 mx-auto mb-2" />
            <SkeletonBox className="h-4 w-64 mx-auto" />
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Avatar */}
            <div className="flex flex-col items-center space-y-4">
              <SkeletonBox className="h-24 w-24 rounded-full" />
              <SkeletonBox className="h-20 w-full max-w-sm" />
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SkeletonBox className="h-10 w-full" />
              <SkeletonBox className="h-10 w-full" />
            </div>

            {/* Phone */}
            <SkeletonBox className="h-10 w-full" />

            {/* Address */}
            <SkeletonBox className="h-24 w-full" />

            {/* Button */}
            <SkeletonBox className="h-12 w-full rounded-lg" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
