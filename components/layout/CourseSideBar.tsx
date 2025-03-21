
import { db } from "@/lib/db";
import { Course, Section } from "@prisma/client";
import Link from "next/link";
import { Progress } from "../ui/progress";
import { auth } from "@clerk/nextjs/server";
import ChatNow from "../ui/ChatNow";// Import your ChatNow component

interface CourseSideBarProps {
  course: Course & { sections: Section[] };
  studentId: string;
}


const CourseSideBar = async ({ course, studentId }: CourseSideBarProps) => {
  const { userId } = await auth();
  if (!userId) {
    return null; // Handle unauthorized access
  }

  const publishedSections = await db.section.findMany({
    where: {
      courseId: course.id,
      isPublished: true,
    },
    orderBy: {
      position: "asc",
    },
  });

  const publishedSectionIds = publishedSections.map((section) => section.id);

  const purchase = await db.purchase.findUnique({
    where: {
      customerId_courseId: {
        customerId: userId,
        courseId: course.id,
      },
    },
  });

  const completedSections = await db.progress.count({
    where: {
      studentId: userId,
      sectionId: {
        in: publishedSectionIds,
      },
      isCompleted: true,
    },
  });

  const progressPercentage = (completedSections / publishedSectionIds.length) * 100;

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r shadow-lg rounded-lg p-4">
      {/* Sidebar Header */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-gray-800">{course.title}</h1>
        {purchase && (
          <div className="mt-3">
            <Progress value={progressPercentage} className="h-2 rounded-full bg-gray-200" />
            <p className="text-sm text-gray-500 mt-2">
              {Math.round(progressPercentage)}% completed
            </p>
          </div>
        )}
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-2">
        <Link
          href={`/courses/${course.id}/overview`}
          className="p-3 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-800 font-medium transition-colors duration-200"
        >
          Overview
        </Link>
        {publishedSections.map((section) => (
          <Link
            key={section.id}
            href={`/courses/${course.id}/sections/${section.id}`}
            className="p-3 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition-colors duration-200"
          >
            {section.title}
          </Link>
        ))}
      </nav>

      {/* ChatNow Button */}
      {purchase && (
        <div className="mt-auto">
          <ChatNow instructorEmail={course.email || "No email available"} />

        </div>
      )}
    </div>
  );
};

export default CourseSideBar;
