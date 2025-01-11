import { db } from "@/lib/db";
import getCoursesByCategory from "../actions/GetCourses";
import Categories from "@/components/custom/Categories";
import CourseCard from "@/components/courses/CourseCard";
import dynamic from "next/dynamic";
import WelcomeMessage from "@/components/WelcomeMessage";

export default async function Home() {
  const predefinedOrder = [
    "5th Class",
    "6th Class",
    "7th Class",
    "8th Class",
    "9th Class",
    "10th Class",
    "11th Class",
    "12th Class",
    "Engineering",
  ];

  const categories = await db.category.findMany({
    include: {
      subCategories: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  // Sort categories based on predefined order
  const sortedCategories = categories.sort((a, b) => {
    const aIndex = predefinedOrder.indexOf(a.name);
    const bIndex = predefinedOrder.indexOf(b.name);

    if (aIndex === -1 && bIndex === -1) {
      return a.name.localeCompare(b.name);
    }

    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });

  const courses = await getCoursesByCategory(null);

  return (
    <div className="md:mt-5 md:px-10 xl:px-16 pb-16">
      <Categories categories={sortedCategories} selectedCategory={null} />
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
