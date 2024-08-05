import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HeartIcon, HomeIcon, SearchIcon, SquarePlusIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-6 py-6 flex gap-4 justify-between items-center">
      <Link
        href="/main/feed/"
        className="flex items-center justify-between gap-2"
        prefetch={false}
      >
        <span className="font-bold text-lg">MealMate</span>
      </Link>
      <SearchIcon />
    </header>
  );
}
