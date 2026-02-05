"use client";

import type React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, DollarSign, MapPin, Type, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="mb-6 pl-0 hover:bg-transparent hover:text-[#FF6B6B] transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Bazaar
        </Button>

        <Card className="border-2 border-black/5 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
          <CardHeader className="bg-black text-white p-8">
            <CardTitle className="text-3xl font-black tracking-tight">
              Sell an Item
            </CardTitle>
            <p className="text-white/70">
              Give your pre-loved items a new home.
            </p>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Image Upload */}
              <div className="space-y-3">
                <Label className="text-base font-bold">Photos</Label>
                <div 
                  className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 text-center
                    ${imagePreview ? 'border-transparent p-0 overflow-hidden' : 'border-gray-200 hover:border-[#FF6B6B] hover:bg-[#FF6B6B]/5 cursor-pointer'}
                  `}
                >
                  {imagePreview ? (
                    <div className="relative aspect-video w-full bg-gray-100 rounded-2xl overflow-hidden group">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={removeImage}
                          className="rounded-full w-12 h-12 p-0"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Upload className="w-8 h-8" />
                      </div>
                      <Label
                        htmlFor="image-upload"
                        className="cursor-pointer block"
                      >
                        <span className="block text-lg font-bold text-gray-900 mb-1">
                          Click to upload photos
                        </span>
                        <span className="text-sm text-gray-500">
                          SVG, PNG, JPG or GIF (max. 10MB)
                        </span>
                      </Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Price */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-3">
                  <Label htmlFor="title" className="text-base font-bold flex items-center gap-2">
                    Title
                  </Label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="title"
                      {...register("title")}
                      placeholder="What are you selling?"
                      className="pl-10 h-12 bg-gray-50 border-transparent focus:bg-white focus:border-black/20 focus:ring-0 transition-all font-medium"
                    />
                  </div>
                  {errors.title && (
                    <p className="text-sm text-[#FF6B6B] font-bold mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="price" className="text-base font-bold flex items-center gap-2">
                    Price
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="price"
                      {...register("price")}
                      placeholder="0.00"
                      className="pl-10 h-12 bg-gray-50 border-transparent focus:bg-white focus:border-black/20 focus:ring-0 transition-all font-mono font-medium"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-sm text-[#FF6B6B] font-bold mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <Label htmlFor="location" className="text-base font-bold flex items-center gap-2">
                  Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="location"
                    {...register("location")}
                    placeholder="Where is the item located?"
                    className="pl-10 h-12 bg-gray-50 border-transparent focus:bg-white focus:border-black/20 focus:ring-0 transition-all font-medium"
                  />
                </div>
                {errors.location && (
                  <p className="text-sm text-[#FF6B6B] font-bold mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label htmlFor="description" className="text-base font-bold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Tell buyers about the condition, age, and any flaws..."
                  className="min-h-[150px] resize-none p-4 bg-gray-50 border-transparent focus:bg-white focus:border-black/20 focus:ring-0 transition-all font-medium leading-relaxed"
                />
                {errors.description && (
                  <p className="text-sm text-[#FF6B6B] font-bold mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-bold bg-black text-white hover:bg-[#FF6B6B] rounded-xl transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  {isSubmitting ? "Publishing..." : "Publish Listing"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
