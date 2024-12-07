import CreateSectionForm from "@/components/sections/CreateSectionForm"
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const CourseCurriculumPage = async ({params}:{params:{courseId:string}}) => {
    const { userId } = await auth(); // Destructure userId from the auth object
    if(!userId)
    {
        return redirect("/sign-in")
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            instructorId: userId, // Use userId directly here
        },
    });

    if(!course)
    {
        return redirect("/instructor/courses")
    }
    return (
        <CreateSectionForm course={course}/>
    )
}

export default CourseCurriculumPage;