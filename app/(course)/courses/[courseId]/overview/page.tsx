import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import ReadText from "@/components/custom/ReadText";
import SectionMenu from "@/components/layout/SectionMenu";

const CourseOverview = async ({ params }: { params: Promise<{ courseId: string }> }) => {
  const { courseId } = await params;

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const client = await clerkClient();
  const instructor = await client.users.getUser(course.instructorId);

  let level;
  let language;
  if(course.languageId) {
    language = await db.language.findUnique({
      where: {
        id: course.languageId,
      },
    });
  }
  if (course.levelId) {
    level = await db.level.findUnique({
      where: {
        id: course.levelId,
      },
    });
  }

  // Check if instructor data is valid
  if (!instructor) {
    return <div>Error loading instructor information.</div>; // Handle error gracefully
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Mobile Section Menu */}
      <div className="block md:hidden mb-4">
        <SectionMenu course={course} />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Course Image */}
        <div className="w-full md:w-1/2 flex-shrink-0 relative">
          {/* Desktop Section Menu */}
          <div className="hidden md:block absolute top-0 left-0 z-10">
            <SectionMenu course={course} />
          </div>

          <Image
            src={course.imageUrl || "/image_placeholder.webp"}
            alt={course.title}
            width={600}
            height={400}
            className="rounded-lg object-cover w-full"
          />
        </div>

        {/* Right Column: Course Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{course.title}</h1>
          <p className="text-base md:text-lg text-gray-600">{course.subtitle}</p>

          {/* Instructor Info */}
          <div className="flex items-center gap-4">
            <Image
              src={instructor.imageUrl || "/avatar_placeholder.jpg"}
              alt={instructor.fullName || "Instructor photo"}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-500">Instructor</p>
              <p className="text-base md:text-lg font-bold text-gray-800">{instructor.fullName}</p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="flex flex-col gap-2 text-gray-700">
            <div className="flex items-center gap-2">
              <p className="font-bold text-gray-800">Price:</p>
              <p className="text-base md:text-lg font-semibold text-gray-900">₹ {course.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <p className="font-bold text-gray-800">Level:</p>
              <p className="text-base md:text-lg font-semibold">{level?.name || "Beginner"}</p>
            </div>

            <div className="flex items-center gap-2">
              <p className="font-bold text-gray-800">Language Taught: </p>
              <p className="text-base md:text-lg font-semibold">{language?.name || "Beginner"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Description */}
      <div className="mt-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Course Description</h2>
        <div className="text-base md:text-lg text-gray-600 leading-relaxed">
          <ReadText value={course.description || "No description available."} />
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
