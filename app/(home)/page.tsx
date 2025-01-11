import { db } from "@/lib/db";
import getCoursesByCategory from "../actions/GetCourses";
import Categories from "@/components/custom/Categories";
import CourseCard from "@/components/courses/CourseCard";
import dynamic from "next/dynamic";
import WelcomeMessage from "@/components/WelcomeMessage";

export default async function Home() {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  const courses = await getCoursesByCategory(null);

  return (
    <div className="md:mt-5 md:px-10 xl:px-16 pb-16">
      <Categories categories={categories} selectedCategory={null} />
      <WelcomeMessage />
      {/* Add spacing below WelcomeMessage */}
      <div className="mt-10 flex flex-wrap gap-7 justify-center">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
