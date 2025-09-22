import Link from "next/link";
import Image from "next/image";

import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";

import { Button } from "@/components/ui/button";

import SearchBar from "./SearchBar";

export async function StaticTasks() {}
import LogoutButton from "@/components/LogoutButton";

export default async function Navbar() {
  const user = await fetchQuery(
    api.users.currentUser,
    {},
    {
      token: await convexAuthNextjsToken(),
    }
  );

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
          <Image
            src={user?.profile_picture || "https://placehold.co/40x40"}
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
      </div>
    </nav>
  );
}
