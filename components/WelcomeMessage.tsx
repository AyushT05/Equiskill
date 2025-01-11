"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const WelcomeMessage = () => {
  const { user } = useUser();
  
  return (
    <div className="bg-[#cce6ff] text-[#003cb3] rounded-lg p-6 flex items-center shadow-lg">
      {/* Left Division for Image */}
      <div className="flex-shrink-0 mr-6">
        <Image
          src="/gg-blue.png" // Replace with your desired image path
          alt="Welcome Illustration"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>

      {/* Right Division for Text */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome{user ? `, ${user.firstName}` : " to our website"}!
        </h1>
        <p className="mt-2 text-sm md:text-base font-medium">
          Explore some of the courses provided by skilled professors. You can
          always create your own course and learn at your own pace with{" "}
          <span className="font-bold">Equiskill-AI</span>.
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
