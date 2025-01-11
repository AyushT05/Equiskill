import { db } from "@/lib/db";
import { Course, Section } from "@prisma/client";
import Link from "next/link";
import { Progress } from "../ui/progress";

interface CourseSideBarProps {
  course: Course & { sections: Section[] };
  studentId: string;
}

const CourseSideBar = async ({ course, studentId }: CourseSideBarProps) => {
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
        customerId: studentId,
        courseId: course.id,
      },
    },
  });

  const completedSections = await db.progress.count({
    where: {
      studentId,
      sectionId: {
        in: publishedSectionIds,
      },
      isCompleted: true,
    },
  });

  const progressPercentage =
    publishedSectionIds.length > 0
      ? (completedSections / publishedSectionIds.length) * 100
      : 0;

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
    </div>
  );
};

export default CourseSideBar;
