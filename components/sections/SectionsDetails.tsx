"use client"
import { Course, Progress, Purchase, Resource, Section } from "@prisma/client";
import { Button } from "../ui/button"
import toast from "react-hot-toast";
import { useState } from "react";
import { set } from "zod";
import axios from "axios";
import { File, Loader, Loader2, Lock } from "lucide-react";
import ReadText from "../custom/ReadText";
import Link from "next/link";
import ProgressButton from "./ProgressButton";


interface SectionsDetailsProps {
    course: Course & { sections: Section[] };
    section: Section;
    purchase: Purchase | null;
    resources: Resource[] | [];
    progress: Progress | null;
}


const SectionsDetails = ({
    course,
    section,
    purchase,
    resources,
    progress,
}: SectionsDetailsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const isLocked = !purchase && !section.isFree;
    const buyCourse = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`/api/courses/${course.id}/checkout`);
            window.location.assign(response.data.url);
        }
        catch (error) {
            console.log("Failed to buy course", error);
            toast.error("Failed to buy course");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="px-6 py-4 flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <h1 className="text-3xl font-bold">{section.title}</h1>
                {!purchase ? (
                    <Button onClick={buyCourse}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <p>Buy this Course</p>}
                    </Button>
                ) : (
                    <ProgressButton
                        courseId={course.id}
                        sectionId={section.id}
                        isCompleted={!!progress?.isCompleted}
                    />
                )}
            </div>
            <ReadText value={section.description!} />
            {isLocked ? (
                <div className="px-10 flex flex-col gap-5 items-center bg-[#cce6ff]">
                    <Lock className="h-8 w-8" />
                    <p className="text-sm font-bold">
                        Video for this section is locked!. Please buy the course to access
                    </p>
                </div>
            ) : (
                <video controls src={section.videoUrl ?? ''} title={section.title} style={{ width: '600px', height: '400px' }}></video>
            )}
            <div>
                <h2 className="text-xl font-bold mb-5">Resources</h2>
                {resources.map((resource) => (
                    <Link
                        key={resource.id}
                        href={resource.fileUrl}
                        target="_blank"
                        className="flex items-center bg-[#FFF8EB] rounded-lg text-sm font-medium p-3"
                    >
                        <File className="h-4 w-4 mr-4" />
                        {resource.name}
                    </Link>
                ))}
            </div>
        </div>

    )
}

export default SectionsDetails