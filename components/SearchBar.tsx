"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/bazaar?q=${encodeURIComponent(query)}`);
  };

  return (
    <form className="relative w-full max-w-sm" onSubmit={handleSearch}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 bg-primary-foreground text-primary border-none focus-visible:ring-2 focus-visible:ring-primary"
      />
    </form>
  );
}
