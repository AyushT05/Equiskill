"use client";
import { useEffect, useState } from "react"; // Import useEffect and useState
import Link from "next/link";
import { Search } from "lucide-react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";
import Loginbut from "../Loginbut";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const { isSignedIn } = useAuth();
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Set mounted to true after first render
  }, []);

  const TopRoutes = [
    { label: "Instructor", path: "/instructor/courses" },
    { label: "Student", path: "/learning" }
  ];

  const [searchInput, setSearchInput] = useState("");
  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      router.push(`/search?query=${searchInput}`);
    }
    setSearchInput("");
  }

  return (
    <div className="flex justify-between items-center p-4">
      <Link href="/">
        <Image src="/equiskill-logo.png" height={400} width={300} alt="Logo" />
      </Link>
      <div className="hidden md:flex w-[400px] rounded-full flex">
        <input
          className="flex-grow bg-[#cce6ff] rounded-l-full border-none outline-none text-sm pl-4 py-3"
          placeholder="Search for Courses"
          aria-label="Search for courses"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="bg-[#003cb3] rounded-r-full border-none outline-none cursor-pointer px-4 py-3 hover:bg-[#003cb3]/70 "
          aria-label="Search"
          disabled={searchInput.trim() === ""}
          onClick={handleSearch}
        >
          <Search className="h-4 w-4 text-white" />
        </button>
      </div>
      <div className="flex items-center">
        <div className="hidden md:flex gap-4">
          {TopRoutes.map((route) => (
            <Link href={route.path} key={route.path} className="text-sm font-medium hover:text-[#003cb3]">
              {route.label}
            </Link>
          ))}
        </div>
        <div className="ml-4 py-2">
          {isMounted && ( // Render based on mounted state
            isSignedIn ? <UserButton /> : <Link href="/sign-in"><Loginbut /></Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;