import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50">
      <div className="relative flex w-full h-full shadow-lg bg-white rounded-lg overflow-hidden">
        
        {/* Left Division: Video Background */}
        <div className="hidden md:flex md:w-1/2 relative">
          <video
            src="/signin.mp4"
            autoPlay
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Division: Sign-In Form */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8">
          <div className="flex flex-col items-center justify-center max-w-md w-full text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome Back!
            </h2>
            <p className="text-gray-600 mb-6">
              Sign in to continue and access your personalized dashboard.
            </p>
            <div className="w-full flex justify-center">
              <SignIn />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
