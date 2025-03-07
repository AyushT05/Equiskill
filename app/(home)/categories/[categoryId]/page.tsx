import getCoursesByCategory from "@/app/actions/GetCourses";
import CourseCard from "@/components/courses/CourseCard";
import Categories from "@/components/custom/Categories";
import { db } from "@/lib/db";

// Define the expected props for the component
interface CategoryPageProps {
  params: { categoryId: string };
}

const CoursesByCategory = async ({ params }: CategoryPageProps) => {
  // Fetch categories
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  // Fetch courses based on the categoryId
  const courses = await getCoursesByCategory(params.categoryId);

  return (
    <div className="md:mt-5 md:px-10 xl:px-16 pb-16">
      <Categories categories={categories} selectedCategory={params.categoryId} />
      <div className="flex flex-wrap gap-7 justify-center">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesByCategory;
