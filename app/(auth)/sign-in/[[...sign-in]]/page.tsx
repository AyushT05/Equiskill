import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-full max-w-6xl shadow-lg bg-white rounded-lg overflow-hidden">
        {/* Left Division: Image */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center">
          <img
            src="/canva.gif" // Replace with your image path
            alt="Sign In Illustration"
            className="object-cover h-full w-full"
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
