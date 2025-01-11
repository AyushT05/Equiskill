import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-full max-w-6xl shadow-lg bg-white rounded-lg overflow-hidden">
        {/* Left Division: Image */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center">
          <video
            src="/signin.mp4" // Replace with your video path
            autoPlay
            muted
            playsInline
            className="object-cover h-full w-full pointer-events-none"
          />
        </div>


        {/* Right Division: Sign-In Form */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8">
          <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Welcome Back!
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Sign in to continue and access your personalized dashboard.
            </p>
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
