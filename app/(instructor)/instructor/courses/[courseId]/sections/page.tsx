import CreateSectionForm from "@/components/sections/CreateSectionForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CourseCurriculumPage = async ({ params }: { params: Promise<{ courseId: string }> }) => {
    // Await the params to resolve the courseId
    const { courseId } = await params;

    // Get the authenticated user ID
    const { userId } = await auth(); // Destructure userId from the auth object
    if (!userId) {
        return redirect("/sign-in");
    }

    // Fetch the course details
    const course = await db.course.findUnique({
        where: {
            id: courseId,
            instructorId: userId, // Use userId directly here
        },
        include: {
            sections: {
                orderBy: {
                    position: "asc",
                },
            },
        },
    });

    // Redirect if the course is not found or doesn't belong to the instructor
    if (!course) {
        return redirect("/instructor/courses");
    }

    return <CreateSectionForm course={course} />;
};

export default CourseCurriculumPage;
