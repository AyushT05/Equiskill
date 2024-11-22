import SideBar from "@/components/layout/SideBar"
import TopBar from "@/components/layout/TopBar"
import { auth } from "@clerk/nextjs/server"

import { redirect } from "next/navigation"
import React from "react"

// layout.tsx
const InstructorLayout = async ({ children }: { children: React.ReactNode }) => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
        return null; // Return null after redirecting
    }

    return (
        <div className="flex flex-col h-full">
            <TopBar />
            <div className="flex-1 flex">
                <SideBar/>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}


export default InstructorLayout