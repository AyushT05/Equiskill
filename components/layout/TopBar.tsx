"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";
import Loginbut from "../Loginbut";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const TopBar = () => {
  const { isSignedIn } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const TopRoutes = [
    { label: "Instructor", path: "/instructor/courses" },
    { label: "Student", path: "/student" }
  ];

  const sidebarRoutes = [
    { label: "Courses", path: "/instructor/courses" },
    {
      label: "Performance",
      path: "/instructor/performance",
    },
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
      <style jsx>{`
       @media (max-width: 768px) {
  .mobile-logo {
    height: 80px !important;
    width: 150px !important;
    object-fit: contain;
  }

          .mobile-topbar-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 0.5rem;
          }
        }
      `}</style>

      {/* Desktop Logo */}
      <Link href="/" className="hidden md:block">
        <Image src="/equiskill-logo.png" height={400} width={300} alt="Logo" />
      </Link>

      {/* Mobile View: Compact Layout */}
      <div className="md:hidden mobile-topbar-container">
        <Link href="/">
          <Image
            src="/equiskill-logo.png"
            height={80}  // Increased from 50
            width={150} // Increased from 100
            alt="Logo"
            className="mobile-logo"
          />
        </Link>

        <div className="flex items-center space-x-3">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {TopRoutes.map((route) => (
                  <Link
                    href={route.path}
                    key={route.path}
                    className="text-sm font-medium hover:text-[#003cb3]"
                  >
                    {route.label}
                  </Link>
                ))}
              </div>

              {pathName.startsWith("/instructor") && (
                <div className="flex flex-col gap-4">
                  {sidebarRoutes.map((route) => (
                    <Link
                      href={route.path}
                      key={route.path}
                      className="text-sm font-medium hover:text-[#FDAB04]"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              )}
            </SheetContent>
          </Sheet>

          {isMounted && (
            isSignedIn ? <UserButton /> : <Link href="/sign-in"><Loginbut /></Link>
          )}
        </div>
      </div>

      {/* Rest of Desktop View Remains Unchanged */}
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
      <div className="hidden md:flex items-center">
        <div className="hidden md:flex gap-4">
          {TopRoutes.map((route) => (
            <Link href={route.path} key={route.path} className="text-sm font-medium hover:text-[#003cb3]">
              {route.label}
            </Link>
          ))}
        </div>
        <div className="ml-4 py-2">
          {isMounted && (
            isSignedIn ? <UserButton /> : <Link href="/sign-in"><Loginbut /></Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
