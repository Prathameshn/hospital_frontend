import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import dayjs from "dayjs";
import NereAppointment from "@/models/NereAppointments";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const date = request.nextUrl.searchParams.get("date");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Doctor id is required" },
        { status: 400 },
      );
    }

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          message: "date query param is required (YYYY-MM-DD)",
        },
        { status: 400 },
      );
    }

    await connectDB();

    const startOfDay = dayjs(date)
      .tz("Asia/Kolkata")
      .startOf("day")
      .utc()
      .toDate();

    const endOfDay = dayjs(date).tz("Asia/Kolkata").endOf("day").utc().toDate();

    console.log("Start of Day:", startOfDay);
    console.log("End of Day:", endOfDay);

    const filteredAppointments = await NereAppointment.find({
      doctor: id,
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ appointmentTime: 1 });

    return NextResponse.json(
      {
        success: true,
        doctorId: id,
        date,
        count: filteredAppointments.length,
        appointments: filteredAppointments,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch appointments" },
      { status: 500 },
    );
  }
}
