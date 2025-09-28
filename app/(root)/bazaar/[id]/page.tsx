"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, MessageCircle } from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const post = useQuery(
    api.posts.getById,
    id ? { id: id as Id<"posts"> } : "skip"
  );

  const markAsSold = useMutation(api.posts.markAsSold);

  if (post === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-6xl">🔍</div>
          <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
            Post not found
          </h2>
          <p className="text-gray-500 dark:text-gray-500">
            The post you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  if (!post) {
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
            <div className="h-[60vh] bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
              </div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
          </div>
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
            Back to Bazaar
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={post.image || ""}
                alt={post.title}
                width={800}
                height={500}
                className="w-full h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Title and Author */}
            <div className="space-y-4">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  {post.title}
                </h1>
                <Badge
                  className={`${getStatusColor(post.status)} border-0 px-4 py-2 text-sm font-medium`}
                >
                  {post.status}
                </Badge>
              </div>

              {post.author && (
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <Image
                    src={
                      post.author?.profile_picture ||
                      "https://placehold.co/40x40"
                    }
                    alt={post.author.name || "author name"}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {post.author.name}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="text-sm">{post.author.email}</span>
                  </div>
                </div>
              )}
            </div>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* Description */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Description
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {post.description}
              </p>
            </div>
          </div>

          {/* Right Column - Details and Actions */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Price
                  </p>
                  <p className="text-3xl font-bold">
                    Rs {post.price?.toLocaleString()}
                  </p>
                </div>
              </div>

              <Separator className="mb-6 bg-gray-200 dark:bg-gray-600" />

              {/* Action Buttons */}
              {post.isAuthor ? (
                <>
                  <Button
                    className="w-full border-0 h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                    onClick={() => {
                      if (post.status === "sold") return;
                      markAsSold({ id: post._id });
                    }}
                  >
                    {post.status === "available" ? "Mark as Sold" : "Sold"}
                  </Button>
                </>
              ) : (
                <div className="space-y-3">
                  <Button
                    className="w-full border-0 h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                    onClick={() => router.push(`/chat?newFromPost=${post._id}`)}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contact Seller
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full h-12 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                    onClick={() => router.push(`/bazaar`)}
                  >
                    Browse More Items
                  </Button>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  {post.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
