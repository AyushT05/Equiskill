import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import Razorpay from "razorpay"; // Import Razorpay package

// Initialize Razorpay instance with credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const POST = async (
  req: NextRequest,
  { params }: { params: { courseId: string } }
) => {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: { id: params.courseId, isPublished: true },
    });

    if (!course) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    const purchase = await db.purchase.findUnique({
      where: {
        customerId_courseId: { customerId: user.id, courseId: course.id },
      },
    });

    if (purchase) {
      return new NextResponse("Course Already Purchased", { status: 400 });
    }

    // Prepare the order data for Razorpay
    const options = {
      amount: Math.round(course.price! * 100), // Amount in paise
      currency: "INR",
      receipt: `receipt_${new Date().getTime()}`, // Unique receipt ID
      notes: {
        courseId: course.id,
        customerId: user.id,
      },
    };

    // Create an order with Razorpay
    const order = await razorpay.orders.create(options);

    // Return the order details to the client
    return NextResponse.json({ 
      id: order.id, 
      currency: order.currency, 
      amount: order.amount 
    });
    
  } catch (err) {
    console.log("[courseId_checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
