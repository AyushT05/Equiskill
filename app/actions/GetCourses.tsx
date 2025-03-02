import { db } from "@/lib/db"
import { Course, Prisma } from "@prisma/client"

const getCoursesByCategory = async (categoryId: string | null): Promise<Course[]> => {
  const whereClause: Prisma.CourseWhereInput = { // ✅ Use Prisma's CourseWhereInput type
    isPublished: true,
    ...(categoryId && { categoryId }),
  }

  const courses = await db.course.findMany({
    where: whereClause,
    include: {
      category: true,
      subCategory: true,
      level: true,
      sections: {
        where: { isPublished: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return courses
}

export default getCoursesByCategory
