"use client";

import type React from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, DollarSign, MapPin, FileText, Type } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const postSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),
  location: z.string().min(1, "Location is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine(
      (val: string) => !isNaN(Number(val)) && Number(val) > 0,
      "Price must be a positive number"
    ),
});

type PostFormData = z.infer<typeof postSchema>;

export default function Page() {
  const createPost = useMutation(api.posts.create);
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: PostFormData) => {
    if (!selectedImage) {
      alert("Please select an image");
      return;
    }

    const postUrl = await generateUploadUrl();

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage!.type },
      body: selectedImage,
    });

    const { storageId } = await result.json();

    const postData = {
      ...data,
      image: storageId,
      price: Number.parseFloat(data.price),
    };

    try {
      await createPost({ ...postData });

      reset();
      setSelectedImage(null);
      setImagePreview(null);

      router.back();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-primary text-center">
              Create New Post
            </CardTitle>
            <p className="text-muted-foreground text-center">
              Share your product with the community
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Product Image
                </Label>
                <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 transition-colors hover:border-primary/50">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <div className="space-y-2">
                        <Label
                          htmlFor="image-upload"
                          className="cursor-pointer"
                        >
                          <span className="text-primary hover:text-primary/80 font-medium">
                            Click to upload
                          </span>
                          <span className="text-muted-foreground">
                            {" "}
                            or drag and drop
                          </span>
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-foreground flex items-center gap-2"
                  >
                    <Type className="h-4 w-4 text-primary" />
                    Title
                  </Label>
                  <Input
                    id="title"
                    {...register("title")}
                    placeholder="Enter product title"
                    className="border-primary/30 focus:border-primary"
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-foreground flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4 text-primary" />
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Describe your product in detail"
                    className="border-primary/30 focus:border-primary min-h-[120px] resize-none"
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="location"
                      className="text-sm font-medium text-foreground flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4 text-primary" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      {...register("location")}
                      placeholder="Enter location"
                      className="border-primary/30 focus:border-primary"
                    />
                    {errors.location && (
                      <p className="text-sm text-destructive">
                        {errors.location.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="price"
                      className="text-sm font-medium text-foreground flex items-center gap-2"
                    >
                      <DollarSign className="h-4 w-4 text-primary" />
                      Price
                    </Label>
                    <Input
                      id="price"
                      {...register("price")}
                      placeholder="0.00"
                      className="border-primary/30 focus:border-primary"
                    />
                    {errors.price && (
                      <p className="text-sm text-destructive">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-primary/30 text-primary hover:bg-primary/5 bg-transparent"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isSubmitting ? "Creating Post..." : "Create Post"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
