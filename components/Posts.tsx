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

export default function Posts() {
  const posts = useQuery(api.posts.get);
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
            <Button>See Details</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
