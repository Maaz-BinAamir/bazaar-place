"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const createPost = useMutation(api.posts.create);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const postUrl = await generateUploadUrl();

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage!.type },
      body: selectedImage,
    });

    const { storageId } = await result.json();


    const formData = new FormData(form);
    const postData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      price: parseFloat(formData.get("price") as string),
      image: storageId,
    };

    try {
      const id = await createPost({ post: postData });

      // redirect to bazaar
      router.push("/bazaar");
    } catch (error) {
      console.error("Error creating post:", error);
    }
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="w-screen min-h-[300px] bg-accent-foreground flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Create a Post</h1>
      </div>

      <form
        className="flex flex-col max-w-[800px] justify-center mx-auto m-4 px-4 space-y-2"
        onSubmit={handleSubmit}
      >
        <Input
          type="file"
          accept="image/*"
          onChange={(event) => setSelectedImage(event.target.files![0])}
        />

        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" />

        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" />

        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" />

        <Label htmlFor="price">Price</Label>
        <Input id="price" name="price" />

        <Button type="submit">Create Post</Button>
      </form>
    </div>
  );
}
