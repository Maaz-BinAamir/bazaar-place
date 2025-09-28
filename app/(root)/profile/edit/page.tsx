"use client";

import { useEffect } from "react";

import { ProfileForm } from "@/components/profile-form";
import ProfileFormSkeleton from "@/components/skeletons/profile-form";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";

export default function ProfilePage() {
  const initialData = useQuery(api.users.currentUser);

  const router = useRouter();
  const searchParams = useSearchParams();

  console.log("Initial Data:", initialData);

  const search = searchParams.get("complete-signup");

  /*
  a hack to redirect if user is already logged in and has a username
  that means that the user has already completed its signup process.
  This will be only done if the user enters the page through manually typing
  the url with the ?complete-signup=true, if the user enters the page through
  the oauth flow, the redirect will be done in the route.ts file
  */
  useEffect(() => {
    if (search && initialData?.username) {
      router.replace("/bazaar");
    }
  }, [initialData]);

  if (search && initialData?.username) {
    return null;
  }

  return (
    <div className="relative">
      {/* Skeleton */}
      {!initialData && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            !initialData ? "opacity-100" : "opacity-0"
          )}
        >
          <ProfileFormSkeleton />
        </div>
      )}

      {/* Form */}
      {initialData && (
        <div
          className={cn(
            "transition-opacity duration-500",
            initialData ? "opacity-100" : "opacity-0"
          )}
        >
          <ProfileForm
            initialData={initialData}
            mode={search ? "create" : "edit"}
          />
        </div>
      )}
    </div>
  );
}
