import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const IMAGEKIT_URL_ENDPOINT = process.env.IMAGEKIT_URL_ENDPOINT;
const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

export const POST = async (
  req: NextRequest,
  { params }: { params: { courseId: string; sectionId: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();
    const { courseId, sectionId } = params;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        instructorId: userId,
      },
    });

    if (!course) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    const section = await db.section.update({
      where: {
        id: sectionId,
        courseId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existingImageKitData = await db.imageKitData.findFirst({
        where: {
          sectionId,
        },
      });

      if (existingImageKitData) {
        // Delete the existing video from ImageKit if needed
        await axios.delete(`https://api.imagekit.io/v1/files/${existingImageKitData.assetUrl}`, {
          headers: {
            Authorization: `Basic ${Buffer.from(`${IMAGEKIT_PRIVATE_KEY}:`).toString('base64')}`,
          },
        });

        await db.imageKitData.delete({
          where: {
            id: existingImageKitData.id,
          },
        });
      }

      // Upload video to ImageKit
      const uploadResponse = await axios.post(
        'https://api.imagekit.io/v1/files',
        {
          file: values.videoUrl,
          fileName: 'video.mp4', // Customize as needed
        },
        {
          auth: {
            username: IMAGEKIT_PRIVATE_KEY || '',
            password: '', // No password needed for ImageKit
          },
        }
      );

      const assetUrl = `${IMAGEKIT_URL_ENDPOINT}${uploadResponse.data.name}`;

      await db.imageKitData.create({
        data: {
          assetUrl,
          sectionId,
        },
      });
    }

    return NextResponse.json(section, { status: 200 });
  } catch (err) {
    console.log("[sectionId_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, 
  { params }: { params: { courseId: string; sectionId: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId, sectionId } = params;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        instructorId: userId,
      },
    });

    if (!course) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    const section = await db.section.findUnique({
      where: {
        id: sectionId,
        courseId,
      }
    });

    if (!section) {
      return new NextResponse("Section Not Found", { status: 404 });
    }

    if (section.videoUrl) {
      const existingImageKitData = await db.imageKitData.findFirst({
        where: {
          sectionId,
        },
      });

      if (existingImageKitData) {
        // Delete the existing video from ImageKit
        await axios.delete(`https://api.imagekit.io/v1/files/${existingImageKitData.assetUrl}`, {
          headers: {
            Authorization: `Basic ${Buffer.from(`${IMAGEKIT_PRIVATE_KEY}:`).toString('base64')}`,
          },
        });

        await db.imageKitData.delete({
          where: {
            id: existingImageKitData.id,
          },
        });
      }
    }

    await db.section.delete({
      where: {
        id: sectionId,
        courseId,
      },
    });

    const publishedSectionsInCourse = await db.section.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });

    if (!publishedSectionsInCourse.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return new NextResponse("Section Deleted", { status: 200 });
  } catch (err) {
    console.log("[sectionId_DELETE]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};