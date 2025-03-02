"use client";
import React from "react";
import Image from "next/image";
import SocialMediaButtons from "./SocialMediaButtons";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 border-t border-neutral-700/80">
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 lg:px-16">
        {/* Left Section - Logo */}
        <div className="flex items-center mb-4 lg:mb-0">
          <Image 
            src="/Glitch Guardians.png" 
            alt="Equiskill AI Logo" 
            width={120}  // Adjust width as needed
            height={40}  // Adjust height as needed
            priority  // Ensures LCP optimization
          />
        </div>

        {/* Center Section - Footer Text */}
        <div className="text-center text-neutral-300">
          &copy; {new Date().getFullYear()} Equiskill AI. All Rights Reserved.
        </div>

        {/* Right Section - Social Media Buttons */}
        <div className="flex justify-center lg:justify-end mt-4 lg:mt-0">
          <SocialMediaButtons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
