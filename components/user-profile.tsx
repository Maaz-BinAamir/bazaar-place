"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  User,
  Grid3X3,
  List,
  MessageCircle,
  Share2,
  ShoppingBag,
} from "lucide-react";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfilePageSkeleton } from "./skeletons/user-profile";

export default function UserProfile({ id }: { id?: string }) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const data = useQuery(api.users.getProfile, { id: id as Id<"users"> });

  const user = data?.user;
  const posts = data?.posts;

  if (!user || !posts) {
    return <ProfilePageSkeleton />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-6xl">👤</div>
          <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
            User not found
          </h2>
          <p className="text-gray-500 dark:text-gray-500">
            The user profile you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "sold":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const initials =
    `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();

  const displayName =
    user.first_name && user.last_name
      ? `${user.first_name} ${user.last_name}`
      : user.username;

  const activeListings =
    posts?.filter((post) => post.status?.toLowerCase() === "available")
      ?.length || 0;
  const soldListings =
    posts?.filter((post) => post.status?.toLowerCase() === "sold")?.length || 0;
  const totalEarnings =
    posts
      ?.filter((post) => post.status?.toLowerCase() === "sold")
      ?.reduce((sum, post) => sum + (post.price || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            {!id && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/profile/edit")}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                try {
                  const url = id
                    ? window.location.href
                    : `${window.location.href}/${user._id}`;

                  await navigator.clipboard.writeText(url);
                  toast.success("Link copied to clipboard!");
                } catch (e) {
                  toast.error("Failed to copy link");
                }
              }}
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl ring-4 ring-white dark:ring-gray-700">
                <Avatar className="h-32 w-32 border-2 border-primary">
                  <AvatarImage src={user?.profile_picture ?? undefined} />
                  <AvatarFallback className="bg-muted text-primary text-lg font-semibold">
                    {initials || <User className="h-8 w-8" />}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {displayName}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
                  @{user.username}
                </p>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {user.email}
                  </span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                    <Phone className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {user.phone}
                    </span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex justify-center md:justify-between space-x-8 pt-4">
                <div className="flex space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {posts?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Posts
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{activeListings}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Active
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{soldListings}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Sold
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex-col text-center flex">
                    <div className="text-2xl font-bold">
                      Rs {totalEarnings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Earnings
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
          {/* Posts Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <ShoppingBag className="w-6 h-6 mr-3 text-primary" />
                Listings ({posts?.length || 0})
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Posts Content */}
          <div className="p-6">
            {!posts || posts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="text-6xl">📦</div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                  No listings yet
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  This user hasn't posted any items for sale.
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
                      viewMode === "grid"
                        ? "bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700"
                        : "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 flex items-center space-x-4"
                    }`}
                    onClick={() => router.push(`/bazaar/${post._id}`)}
                  >
                    {viewMode === "grid" ? (
                      <>
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <Badge
                            className={`absolute top-3 right-3 ${getStatusColor(post.status)} border-0`}
                          >
                            {post.status}
                          </Badge>
                        </div>
                        <div className="p-4 space-y-3">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{post.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                              Rs {post.price?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {post.title}
                            </h3>
                            <Badge
                              className={`${getStatusColor(post.status)} border-0 text-xs`}
                            >
                              {post.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
                            <MapPin className="w-3 h-3" />
                            <span>{post.location}</span>
                          </div>
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">
                            Rs {post.price?.toLocaleString()}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
