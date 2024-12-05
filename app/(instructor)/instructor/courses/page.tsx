import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Coursecreate from "./Coursecreate";
import { Link } from "lucide-react";
import { db } from "@/lib/db";

const CoursesPage = async () => {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
    return null; // Ensure we return null after redirecting
  }

  const courses = await db.course.findMany({
    where: {
      instructorId: userId
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <div className="px-6 py-4">
      <Coursecreate />
      <div className="mt-10">
        {courses.map(course => 
          <Link href={`/instructor/courses/${course.id}/basic`}>{course.title}</Link>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;