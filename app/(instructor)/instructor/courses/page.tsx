import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Coursecreate from "./Coursecreate";

const CoursesPage = async () => {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
    return null; // Ensure we return null after redirecting
  }

  return (
    <div className="px-6 py-4">
      <Coursecreate />
    </div>
  );
};

export default CoursesPage;