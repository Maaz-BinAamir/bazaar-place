"use client";

import Link from "next/link";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { User } from "lucide-react";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";

import SearchBar from "./search-bar";

import LogoutButton from "@/components/logout-button";

export function Navbar() {
  const user = useQuery(api.users.currentUser);

  const initials =
    `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`.toUpperCase();

  return (
    <nav className="bg-primary text-primary-foreground flex justify-between p-4 items-center">
      <div className="pl-4">
        <Link href="/bazaar" className="flex items-center">
          <Image
            src="/logo.png"
            alt="BazaarPlace Logo"
            width={50}
            height={50}
            className="mr-2"
          />
          <p className="invisible sm:text-3xl sm:visible font-sans">
            BazaarPlace
          </p>
        </Link>
      </div>

      <SearchBar />

      <div className="flex pr-4 space-x-2 px-2 items-center">
        <Link href="/create-post">
          <Button variant={"secondary"}>create</Button>
        </Link>

        <LogoutButton />
        <Link href="/profile">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src={user?.profile_picture ?? undefined} />
            <AvatarFallback className="bg-muted text-primary text-lg font-semibold">
              {initials || <User className="h-8 w-8" />}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </nav>
  );
}
