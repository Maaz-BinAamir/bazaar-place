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
    <form className="relative w-full group" onSubmit={handleSearch}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#FF6B6B] transition-colors h-5 w-5 pointer-events-none" />
      <Input
        type="search"
        placeholder="Search for treasures..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-12 pr-4 h-11 rounded-full bg-white border-2 border-black/5 hover:border-black/20 focus-visible:border-black focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all placeholder:text-gray-400 text-base"
      />
    </form>
  );
}
