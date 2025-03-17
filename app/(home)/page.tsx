import { db } from "@/lib/db";
import getCoursesByCategory from "../actions/GetCourses";
import Categories from "@/components/custom/Categories";
import CourseCard from "@/components/courses/CourseCard";
import WelcomeMessage from "@/components/WelcomeMessage";
import LanguageCard from "@/components/LanguageCard";
import ChatWidget from "@/components/support";

export default async function Home() {
  const predefinedOrder = [
    "5th Class", "6th Class", "7th Class", "8th Class", "9th Class", "10th Class", "11th Class", "12th Class", "Engineering"
  ];

  const categories = await db.category.findMany({
    include: {
      subCategories: {
        orderBy: { name: "asc" },
      },
    },
  });

  // Sort categories based on predefined order
  const sortedCategories = categories.sort((a, b) => {
    const aIndex = predefinedOrder.indexOf(a.name);
    const bIndex = predefinedOrder.indexOf(b.name);
    if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  const courses = await getCoursesByCategory(null);

  // Fetch languages from the database
  const languages = await db.language.findMany();

  // Filter out "Odia" and "Others"
  const filteredLanguages = languages.filter(
    (language) => language.name.toLowerCase() !== "odia" && language.name.toLowerCase() !== "others"
  );

  // Map languages to the required format
  const formattedLanguages = filteredLanguages.map((language) => ({
    id: language.id,
    imageUrl: `/${language.name.toLowerCase()}.png`,
  }));

  return (
    <div className="md:mt-5 md:px-10 xl:px-16 pb-16">
      <Categories categories={sortedCategories} selectedCategory={null} />
      <WelcomeMessage />

      {/* Course Cards */}
      <div className="mt-14 flex flex-wrap gap-7 justify-center">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Learn in Your Language Section */}
      <div className="mt-14 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Learn in Your <span className="text-[#003cb3]">Language</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Explore courses in your preferred language and enhance your learning experience.
        </p>
      </div>

      {/* Language Cards - Horizontal Scroll */}
      <div className="mt-8 flex gap-6 overflow-x-auto px-4 py-2 scrollbar-hide">
        {formattedLanguages.map((language) => (
          <div key={language.id} className="flex-shrink-0 cursor-pointer">
            <LanguageCard languageId={language.id} imageUrl={language.imageUrl} />
          </div>
        ))}
      </div>
      <ChatWidget />
    </div>
  );
}
