"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PostsSkeleton from "./skeletons/posts";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Posts({ query }: { query: string }) {
  const posts = useQuery(api.posts.get, { query: query });

  if (!posts) {
    return <PostsSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🔍</span>
        </div>
        <h2 className="text-3xl font-black mb-2 text-[#1A1A1A]">
          No treasures found
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          We looked everywhere but couldn&apos;t find what you&apos;re looking
          for. Try a different search term!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-12">
      {posts?.map((post) => (
        <Link
          href={`/bazaar/${post._id}`}
          key={post._id}
          className="group block h-full"
        >
          <div className="relative h-full bg-white rounded-2xl border-2 border-black/5 hover:border-black shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-300 flex flex-col overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 border-b-2 border-transparent group-hover:border-black transition-all">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold leading-tight group-hover:text-[#FF6B6B] transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </div>

              <div className="flex items-center text-xs text-gray-500 mb-4 font-medium">
                <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                {post.location}
              </div>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                    Price
                  </span>
                  <span className="text-xl font-black font-mono">
                    Rs {post.price}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:bg-[#FF6B6B] transition-colors">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
