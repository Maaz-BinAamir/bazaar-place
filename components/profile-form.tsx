"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

import { useRouter } from "next/navigation";

import { ArrowLeft, Upload, User, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface ProfileFormData {
  username?: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  profile_picture: File;
}

interface ProfileDataProps {
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  profile_picture: string | null;
}

interface ProfileFormProps {
  initialData?: Partial<ProfileDataProps>;
  mode?: "create" | "edit";
}

export function ProfileForm({ initialData, mode }: ProfileFormProps) {
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const submitProfile = useMutation(api.users.updateProfile);

  const router = useRouter();

  const [profile_picture, setProfileImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    defaultValues: {
      first_name: initialData?.first_name || "",
      last_name: initialData?.last_name || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
    },
  });

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setValue("profile_picture", file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const formData = watch();
  const initials =
    `${formData.first_name?.[0] || ""}${formData.last_name?.[0] || ""}`.toUpperCase();

  async function onSubmit(data: ProfileFormData) {
    const updatePayload: {
      username?: string;
      first_name: string;
      last_name: string;
      phone: string;
      address: string;
      profile_picture?: Id<"_storage">;
    } = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      address: data.address,
    };

    if (mode === "create" && data.username) {
      updatePayload.username = data.username;
    }

    if (data.profile_picture) {
      const storage_id = await uploadPicture(data.profile_picture);
      if (storage_id) {
        updatePayload.profile_picture = storage_id as Id<"_storage">;
      }
    }

    await submitProfile(updatePayload);

    if (mode === "create") {
      router.push("/bazaar");
    } else if (mode === "edit") {
      router.push("/profile");
    }
  }

  async function uploadPicture(file?: File): Promise<string | null> {
    if (!file) return null;
    const postUrl = await generateUploadUrl();

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file!.type },
      body: file,
    });

    const { storageId } = await result.json();
    return storageId;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Card className="border-2  shadow-lg">
          <CardHeader className="text-center pb-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <CardTitle className="text-2xl font-bold text-primary">
              {mode === "edit" ? "Edit Profile" : "Create Profile"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {mode === "edit"
                ? "Update your personal information and profile picture"
                : "Create your profile by providing the necessary information"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Picture Section */}
              <div className="space-y-4">
                <Label className="text-sm font-semibold text-primary flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile Picture
                </Label>

                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24 border-2 border-primary">
                    <AvatarImage
                      src={
                        profile_picture ??
                        initialData?.profile_picture ??
                        undefined
                      }
                    />
                    <AvatarFallback className="bg-muted text-primary text-lg font-semibold">
                      {initials || <User className="h-8 w-8" />}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={cn(
                      "relative w-full max-w-sm border-2 border-dashed rounded-lg p-6 text-center transition-colors",
                      dragActive
                        ? "border-accent bg-accent/10"
                        : " hover:border-accent hover:bg-accent/5"
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleImageUpload(e.target.files[0])
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-primary">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Username */}
              {mode === "create" && (
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-sm font-semibold text-primary"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    {...register("username", {
                      required: "Username is required",
                    })}
                    className="border-2  focus:border-accent"
                    placeholder="Enter your username"
                  />
                  {errors.username && (
                    <p className="text-sm text-destructive">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              )}

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="first_name"
                    className="text-sm font-semibold text-primary"
                  >
                    First Name
                  </Label>
                  <Input
                    id="first_name"
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                    className="border-2  focus:border-accent"
                    placeholder="Enter your first name"
                  />
                  {errors.first_name && (
                    <p className="text-sm text-destructive">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="last_name"
                    className="text-sm font-semibold text-primary"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="last_name"
                    {...register("last_name", {
                      required: "Last name is required",
                    })}
                    className="border-2  focus:border-accent"
                    placeholder="Enter your last name"
                  />
                  {errors.last_name && (
                    <p className="text-sm text-destructive">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-semibold text-primary flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone", {
                    pattern: {
                      value: /^[+]?[1-9][\d]{0,15}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  className="border-2  focus:border-accent"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-sm font-semibold text-primary flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                <Textarea
                  id="address"
                  {...register("address")}
                  className="border-2  focus:border-accent min-h-[100px] resize-none"
                  placeholder="Enter your full address"
                />
                {errors.address && (
                  <p className="text-sm text-destructive">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/60 text-accent-foreground font-semibold py-3 text-base"
                >
                  {isSubmitting ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
