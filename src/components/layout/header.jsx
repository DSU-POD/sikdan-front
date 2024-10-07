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
    router.push(`/main/food/`);
  };
  return (
    <header className="w-full bg-[#F0F0F0] dark:bg-gray-950 dark:border-gray-800 px-6 py-6 flex justify-between gap-4 items-center">
      <div className="flex flex-row gap-4">
        <Link
          href="/main/feed/?type=people"
          className="flex items-center justify-between gap-2"
          prefetch={false}
        >
          <span className="font-bold text-xl">일반인</span>
        </Link>

        <Link
          href="/main/feed/?type=expert"
          className="flex items-center justify-between gap-2"
          prefetch={false}
        >
          <span className="font-bold text-xl">전문가</span>
        </Link>
      </div>
      {/*  }
      <Input
        type="text"
        placeholder="검색하실 음식명을 입력해주세요."
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
        className="flex-1 bg-white border rounded-full focus:ring-0 focus:outline-none text-primary-foreground placeholder:text-muted-foreground"
      />
      { */}
      <SearchIcon className="justify-end" onClick={handleSearch} />
    </header>
  );
}
