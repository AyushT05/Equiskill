import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) => {
    try {
        const { userId } = await auth()
        const { courseId } = await params;
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const course = await db.course.findUnique({
            where: { id: courseId, instructorId: userId },
        });
        if (!course) {
            return new NextResponse("Course not found", { status: 404 })
        }
        const lastSection = await db.section.findFirst({
            where: { courseId: courseId },
            orderBy: { position: "desc" },
        });
        const newPosition = lastSection ? lastSection.position + 1 : 0;
        const { title } = await req.json();
        const newSection = await db.section.create({
            data: {
                courseId: courseId,
                position: newPosition,
                title,
            },
        });
        return NextResponse.json(newSection, { status: 200 });
        } catch (err) {
            console.log("[sections_POST]" , err);
            return new NextResponse("Internal Server Error", { status: 500 });
        }
            


    }