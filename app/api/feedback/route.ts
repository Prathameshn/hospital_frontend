import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const feedback = await Feedback.create(body);

    return NextResponse.json(
      {
        success: true,
        data: feedback,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
