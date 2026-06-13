import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NereDoctor from "@/models/NereDoctor";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const body = await req.json();

  await connectDB();

  const doctor = await NereDoctor.findByIdAndUpdate(id, body, { new: true });

  return NextResponse.json(
    {
      success: true,
      data: doctor,
    },
    { status: 200 },
  );
}
