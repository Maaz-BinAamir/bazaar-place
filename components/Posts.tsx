"use client";

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
import PostsSkeleton from "./skeletons/posts";

import Link from "next/link";

export function Posts({ query }: { query: string }) {
  const posts = useQuery(api.posts.get, { query: query });

  if (!posts) {
    return <PostsSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-3xl font-semibold mb-4">No posts found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="px-2 py-4 m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 space-x-2">
      {posts?.map((post) => (
        <Card key={post._id}>
          <CardHeader>
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={400}
              className="rounded-lg"
            />
            <CardTitle className="text-2xl">{post.title}</CardTitle>
            <p>{post.author?.name}</p>
          </CardHeader>
          <CardContent className="space-y-2">
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
