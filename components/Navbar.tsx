import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground flex justify-between p-4 items-center">
      <div className="pl-4">
        <Link href="/bazaar">
          <p className="text-2xl font-sans">BazaarPlace</p>
        </Link>
      </div>
      <div className="flex pr-4">
        <Link href="/create-post">
          <Button variant={"secondary"}>create</Button>
        </Link>
        <Link href="/logout">
          <Button variant={"secondary"} className="ml-2">
            Logout
          </Button>
        </Link>
      </div>
    </nav>
  );
}
