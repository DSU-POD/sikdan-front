import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HeartIcon, HomeIcon, SearchIcon, SquarePlusIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useRouter } from "next/router";
import { showToast } from "./toast";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    searchQuery
      ? router.push(`/main/food/${searchQuery}`)
      : showToast("검색어를 입력해주세요", true);
  };
  return (
    <header className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-6 py-6 flex gap-4 justify-between items-center">
      <Link
        href="/main/feed/"
        className="flex items-center justify-between gap-2"
        prefetch={false}
      >
        <span className="font-bold text-lg">MealMate</span>
      </Link>
      <Input
        type="text"
        placeholder="검색하실 음식명을 입력해주세요."
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
        className="flex-1 bg-[#ececec] rounded-full border-none focus:ring-0 focus:outline-none text-primary-foreground placeholder:text-muted-foreground"
      />
      <SearchIcon onClick={handleSearch} />
    </header>
  );
}
