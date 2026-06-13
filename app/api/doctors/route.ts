import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NereDoctor from "@/models/NereDoctor";

export async function GET() {
  try {
    await connectDB();

    const Doctors = await NereDoctor.find();

    return NextResponse.json(
      {
        success: true,
        data: Doctors,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in GET /api/doctors:", error);
    return NextResponse.json(
      {
        success: false,
        message: String(error),
      },
      { status: 400 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Received Doctor Data:", body);

    await connectDB();

    const doctor = await NereDoctor.create(body);

    return NextResponse.json(
      {
        success: true,
        data: doctor,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in POST /api/doctors:", error);
    return NextResponse.json(
      {
        success: false,
        message: String(error),
      },
      { status: 400 },
    );
  }
}
