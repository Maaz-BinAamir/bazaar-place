import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function ProfilePageSkeleton() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="animate-pulse space-y-8">
          {/* Profile Header Skeleton */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full" />
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-48 mx-auto md:mx-0" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mx-auto md:mx-0" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-64 mx-auto md:mx-0" />
              </div>
            </div>
          </div>
          {/* Posts Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white/70 dark:bg-gray-800/70 rounded-2xl p-4"
              >
                <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-xl mb-4" />
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
