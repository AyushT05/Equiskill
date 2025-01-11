"use client";
import { Course, Progress, Purchase, Resource, Section } from "@prisma/client";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { File, Loader2, Lock } from "lucide-react";
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
    } catch (error) {
      console.log("Failed to buy course", error);
      toast.error("Failed to buy course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-8 py-6 bg-white shadow-lg rounded-lg">
      {/* Section Title and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{section.title}</h1>
        {!purchase ? (
          <Button
            onClick={buyCourse}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
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

      {/* Section Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Description</h2>
        <div className="text-gray-600 text-lg leading-relaxed">
          <ReadText value={section.description!} />
        </div>
      </div>

      {/* Video or Locked Section */}
      {isLocked ? (
        <div className="flex flex-col items-center gap-5 bg-[#cce6ff] p-6 rounded-lg shadow-sm text-center">
          <Lock className="h-10 w-10 text-gray-600" />
          <p className="text-lg font-medium text-gray-700">
            Video for this section is locked! Please buy the course to access it.
          </p>
        </div>
      ) : (
        <div className="flex justify-center">
          <video
            controls
            src={section.videoUrl ?? ""}
            title={section.title}
            className="w-full max-w-3xl h-auto rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Resources Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Resources</h2>
        {resources.length > 0 ? (
          <div className="flex flex-col gap-4">
            {resources.map((resource) => (
              <Link
                key={resource.id}
                href={resource.fileUrl}
                target="_blank"
                className="flex items-center gap-3 bg-[#cce6ff] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <File className="h-6 w-6 text-[#003cb3]" />
                <span className="text-lg font-medium text-gray-800">{resource.name}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No resources available for this section.</p>
        )}
      </div>
    </div>
  );
};

export default SectionsDetails;
