"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

  watch();

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
    <div className="min-h-screen bg-[#FDFBF7] p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="mb-6 pl-0 hover:bg-transparent hover:text-[#FF6B6B] transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Button>

        <Card className="border-2 border-black/5 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] overflow-hidden rounded-3xl">
          <CardHeader className="text-center pb-6 bg-white border-b border-gray-100 p-8">
            <CardTitle className="text-3xl font-black tracking-tight text-black mb-2">
              {mode === "edit" ? "Edit Profile" : "Create Profile"}
            </CardTitle>
            <CardDescription className="text-base text-gray-500">
              {mode === "edit"
                ? "Update your personal details and make your profile stand out."
                : "Let's get you set up with a profile on BazaarPlace."}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              
              {/* Profile Picture */}
              <div className="space-y-4 text-center">
                 <div className="relative inline-block group">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-xl bg-white mx-auto">
                       <AvatarImage 
                          src={profile_picture ?? initialData?.profile_picture ?? undefined} 
                          className="object-cover"
                       />
                        <AvatarFallback className="bg-[#FFD93D] text-black text-3xl font-black">
                           <User className="h-12 w-12" />
                        </AvatarFallback>
                    </Avatar>
                    
                    <label 
                       htmlFor="picture-upload"
                       className="absolute bottom-0 right-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FF6B6B] transition-colors border-4 border-white shadow-sm"
                    >
                       <Upload className="w-4 h-4" />
                    </label>
                 </div>
                 <div 
                    className={cn(
                       "hidden", // Hidden actual input, triggered by label above
                       dragActive && "block fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                 >
                    {/* Only visible on drag */}
                    <div className="bg-white p-10 rounded-3xl text-center">
                       <Upload className="w-12 h-12 mx-auto mb-4 text-[#FF6B6B]" />
                       <h3 className="font-bold text-xl">Drop image here</h3>
                    </div>
                 </div>
                 
                 <input
                    id="picture-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                 />
                 
                 <p className="text-sm text-gray-400 font-medium">
                    Allowed: JPG, PNG, GIF. Max size: 10MB
                 </p>
              </div>

              <div className="grid gap-8">
                 {mode === "create" && (
                   <div className="space-y-3">
                     <Label htmlFor="username" className="text-base font-bold">Username</Label>
                     <Input
                       id="username"
                       {...register("username", { required: "Username is required" })}
                       className="h-12 bg-gray-50 border-transparent focus:bg-white focus:border-black/20 focus:ring-0 transition-all font-medium"
                       placeholder="johndoe"
                     />
                     {errors.username && <p className="text-sm text-[#FF6B6B] font-bold">{errors.username.message}</p>}
                   </div>
                 )}

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <Label htmlFor="first_name" className="text-base font-bold">First Name</Label>
                       <Input
                          id="first_name"
                          {...register("first_name", { required: "First name is required" })}
                          className="h-12 bg-gray-50 border-transparent focus:bg-white focus:border-black/20 focus:ring-0 transition-all font-medium"
                          placeholder="John"
                       />
                       {errors.first_name && <p className="text-sm text-[#FF6B6B] font-bold">{errors.first_name.message}</p>}
                    </div>

                    <div className="space-y-3">
                       <Label htmlFor="last_name" className="text-base font-bold">Last Name</Label>
                       <Input
                          id="last_name"
                          {...register("last_name", { required: "Last name is required" })}
                          className="h-12 bg-gray-50 border-transparent focus:bg-white focus:border-black/20 focus:ring-0 transition-all font-medium"
                          placeholder="Doe"
                       />
                       {errors.last_name && <p className="text-sm text-[#FF6B6B] font-bold">{errors.last_name.message}</p>}
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <Label htmlFor="phone" className="text-base font-bold flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          Phone Number
                       </Label>
                       <Input
                          id="phone"
                          type="tel"
                          {...register("phone", { pattern: { value: /^[+]?[1-9][\d]{0,15}$/, message: "Invalid phone number" } })}
                          className="h-12 bg-gray-50 border-transparent focus:bg-white focus:border-black/20 focus:ring-0 transition-all font-medium"
                          placeholder="+1 (555) 000-0000"
                       />
                       {errors.phone && <p className="text-sm text-[#FF6B6B] font-bold">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-3">
                       <Label htmlFor="address" className="text-base font-bold flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          Address
                       </Label>
                       <Input
                          id="address"
                          {...register("address")}
                          className="h-12 bg-gray-50 border-transparent focus:bg-white focus:border-black/20 focus:ring-0 transition-all font-medium"
                          placeholder="123 Main St, City"
                       />
                       {errors.address && <p className="text-sm text-[#FF6B6B] font-bold">{errors.address.message}</p>}
                    </div>
                 </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-bold bg-black text-white hover:bg-[#FF6B6B] rounded-xl transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  {isSubmitting ? "Saving Changes..." : "Save Profile"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
