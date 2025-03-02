import { db } from "@/lib/db";
import LanguageCourseCard from "@/components/courses/CourseLangCard";

interface Params {
    languageId: string;
}

const CoursesByLanguage = async ({ params }: { params: Params }) => {
    const { languageId } = params;

    const courses = await db.course.findMany({
        where: {
            languageId: languageId,
        },
        include: {
            category: true, // Include related data
            level: true,
            language: true,
        },
    });

    const language = await db.language.findUnique({
        where: {
            id: languageId,
        },
    });

    if (!language) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-semibold text-red-600">Language Not Found</h1>
                <p className="text-gray-600 text-lg mt-2">The requested language does not exist.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 md:px-12 xl:px-20 py-10">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Courses in {language.name}</h1>
                <p className="text-lg text-gray-600 mt-2">Explore a variety of courses to enhance your skills.</p>
            </div>
            
            {courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                    {courses.map((course) => (
                        <LanguageCourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600 text-lg mt-6">No courses available for this language yet.</div>
            )}
        </div>
    );
};

export default CoursesByLanguage;
