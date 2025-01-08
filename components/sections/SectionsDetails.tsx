"use client"
import { Course, Progress, Purchase, Resource, Section } from "@prisma/client";
import { Button } from "../ui/button"
import toast from "react-hot-toast";
import { useState } from "react";
import { set } from "zod";
import axios from "axios";
import { Loader, Loader2 } from "lucide-react";


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
                    <Button>Mark as Completed</Button>
                )}
            </div>
        </div>
    )
}

export default SectionsDetails