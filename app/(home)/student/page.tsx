import CourseCard from "@/components/courses/CourseCard";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, GraduationCap } from "lucide-react";

const LearningPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const purchasedCourses = await db.purchase.findMany({
    where: {
      customerId: userId,
    },
    select: {
      course: {
        include: {
          category: true,
          subCategory: true,
          sections: {
            where: {
              isPublished: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="min-h-screen px-6 py-10 md:py-14 md:px-16 xl:px-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* AI Tools Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">AI Learning Tools</h1>
          <p className="text-lg text-gray-600 mt-2">Enhance your learning with AI-powered tools.</p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Exam Prep Tool */}
            <Link href="https://equiskillstudy.vercel.app/dashboard" className="block rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  AI Exam Prep Tool
                </h2>
                <p className="text-gray-600">Prepare for exams efficiently with our AI-powered tool.</p>
                <button className="mt-4 w-full px-4 py-2 bg-[#003cb3] text-white font-semibold rounded-lg hover:bg-[#335fd1] transition">
                  Go to AI Exam Prep
                </button>
              </div>
            </Link>

            {/* AI Course Generator */}
            <Link href="https://equiskilllms.vercel.app/dashboard" className="block rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                  AI Course Generator
                </h2>
                <p className="text-gray-600">Create custom courses effortlessly using our AI Course Generator.</p>
                <button className="mt-4 w-full px-4 py-2 bg-[#003cb3] text-white font-semibold rounded-lg hover:bg-[#335fd1] transition">
                  Go to AI Course Generator
                </button>
              </div>
            </Link>
          </div>
        </div>

        {/* Purchased Courses Section */}
        <div className="mt-14">
          <h1 className="text-3xl font-bold text-gray-800">Your Courses</h1>
          <p className="text-lg text-gray-600 mt-2">Continue learning and track your progress.</p>

          {purchasedCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {purchasedCourses.map((purchase) => (
                <CourseCard key={purchase.course.id} course={purchase.course} />
              ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center justify-center text-center">
              <BookOpen className="text-gray-400 w-16 h-16 mb-4" />
              <p className="text-lg text-gray-500">You haven't purchased any courses yet.</p>
              <Link
                href="/"
                className="mt-5 px-6 py-2 bg-[#003cb3] text-white font-semibold rounded-lg hover:bg-[#335fd1] transition shadow-md"
              >
                Explore Courses
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LearningPage;
