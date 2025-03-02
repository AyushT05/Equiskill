import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { Album } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = async ({ course }: { course: Course }) => {
  const client = await clerkClient();
  const instructor = await client.users.getUser(course.instructorId);

  let level;
  let category;
  let language;

  // Fetch Level
  if (course.levelId) {
    level = await db.level.findUnique({
      where: {
        id: course.levelId,
      },
    });
  }

  // Fetch Category
  if (course.categoryId) {
    category = await db.category.findUnique({
      where: {
        id: course.categoryId,
      },
    });
  }

  // Fetch Language
  if (course.languageId) {
    language = await db.language.findUnique({
      where: {
        id: course.languageId
      }
    })

  }

  return (
    <Link
      href={`/courses/${course.id}/overview`}
      className="group block bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      {/* Course Image */}
      <div className="relative bg-gray-100">
        <Image
          src={course.imageUrl || "/image_placeholder.webp"}
          alt={course.title}
          width={320}
          height={180}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <span className="absolute top-2 right-2 bg-[#003cb3] text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
          {level?.name || "null"}
        </span>
      </div>

      {/* Course Content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-[#003cb3] transition-colors">
          {course.title}
        </h2>

        {/* Instructor Info */}
        {instructor && (
          <div className="flex items-center gap-3">
            <Image
              src={instructor.imageUrl || "/avatar_placeholder.jpg"}
              alt={instructor.fullName || "Instructor photo"}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <p className="text-sm font-medium text-gray-600">{instructor.fullName}</p>
          </div>
        )}

        {/* Price */}
        <div className="flex justify-between items-center mt-2">
          <p
            className="bg-[#cce6ff] text-blue-800 text-sm font-bold px-3 py-1 rounded-lg shadow-sm"
            style={{ fontSize: "0.875rem" }}
          >
            ₹ {course.price}
          </p>
          {/* Display Category Name */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Album size={20} />
            <p>{category?.name || "Uncategorized"}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
