import EditCourseForm from "@/components/courses/EditCourseForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';

const CourseBasics = async ({ params }: { params: { courseId: string } }) => {
  // Await the auth function to get the userId
  const { userId } = await auth();

  // Check if the user is authenticated
  if (!userId) {
    return redirect("/sign-in");
  }

  // Await params to ensure it is resolved before accessing its properties
  const { courseId } = await params;

  const course = await db.course.findUnique({
    where: {
      id: courseId, // Use the awaited courseId
      instructorId: userId,
    },
  });

  // Redirect if the course does not exist
  if (!course) {
    return redirect('/instructor/courses');
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    },
    include: {
      subCategories: true
    }
  })

  const levels = await db.level.findMany()

  return (
    <div className="px-10">
      <EditCourseForm course={course} categories={categories.map((category) => ({
        label: category.name,
        value: category.id,
        subCategories: category.subCategories.map((subcategory) => ({
          label: subcategory.name,
          value: subcategory.id
        })),
      }))}
      levels={levels.map((level) => ({
        label: level.name,
        value: level.id,
      }))}
       />
    </div>
  );
}

export default CourseBasics;