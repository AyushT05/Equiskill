import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Coursecreate from "./Coursecreate";
import Link from "next/link"; // Ensure this is the correct import for your Link component
import { db } from "@/lib/db";
import { DataTable } from "@/components/custom/DataTable";
import { columns } from "@/components/courses/Columns";


const CoursesPage = async () => {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
    return null; // Ensure we return null after redirecting
  }

  const courses = await db.course.findMany({
    where: {
      instructorId: userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="px-6 py-4">
      <Coursecreate />
      <div className="mt-5"><DataTable columns={columns} data={courses} /></div>
      </div>
    
  );
};

export default CoursesPage;