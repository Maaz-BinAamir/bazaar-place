import React from "react";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Posts() {
  const posts = useQuery(api.posts.get);

  console.log("Posts:", posts);

  // Show skeleton loader while posts are loading
  if (!posts) {
    return (
      <div className="px-2 py-4 m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 space-x-2">
        {Array.from({ length: 8 }, (_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader>
              <div className="w-full h-60 bg-gray-200 rounded" />
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="h-[75px] space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-20" />
              <div className="h-10 bg-gray-200 rounded w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="px-2 py-4 m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 space-x-2">
      {posts?.map((post) => (
        <Card key={post._id}>
          <CardHeader>
            <Image src={post.image} alt={post.title} width={600} height={400} />
            <CardTitle className="text-2xl">{post.title}</CardTitle>
            <p>{post.author?.name}</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="h-[75px] line-clamp-3">{post.description}</p>
            <p>
              <span className="font-bold">Location:</span> {post.location}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <p className="font-bold">Rs {post.price}</p>
            <Button>
              <Link href={`/bazaar/${post._id}`}>See Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
