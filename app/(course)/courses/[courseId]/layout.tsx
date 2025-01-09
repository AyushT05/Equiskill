import CourseSideBar from "@/components/layout/CourseSideBar";
import TopBar from "@/components/layout/TopBar";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


const CourseDetailsLayout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ courseId: string }> }) => {
  const userId = await auth();
  const { courseId } = await params;
// Use courseId wherever required


  if (!userId) {
    return redirect("/sign-in");
  }
  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      sections: {
        where: {
          isPublished: true
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  })
  if (!course) {
    return redirect("/");
  }
  return (
    <div className="h-full flex flex-col">
      <TopBar />
      <div className="flex-1 flex">
        <CourseSideBar course={course} studentId="userId" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default CourseDetailsLayout

