import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NereDoctor from "@/models/NereDoctor";
import { generateSlots } from "@/utils/slotGeneration.utils";
import dayjs from "dayjs";
import NereAppointments from "@/models/NereAppointments";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const date = req.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      {
        success: false,
        message: "Date query parameter is required",
      },
      { status: 400 },
    );
  }

  await connectDB();

  const doctor = await NereDoctor.findById(id);

  doctor.availableTimings.sort((a: { start: string }, b: { start: string }) => {
    const timeA = new Date(`1970-01-01T${a.start}:00Z`).getTime();
    const timeB = new Date(`1970-01-01T${b.start}:00Z`).getTime();
    return timeA - timeB;
  });

  const startOfDay = dayjs(date)
    .tz("Asia/Kolkata")
    .startOf("day")
    .utc()
    .toDate();

  const endOfDay = dayjs(date).tz("Asia/Kolkata").endOf("day").utc().toDate();

  const bookedAppointments = await NereAppointments.find({
    doctor: doctor._id,
    appointmentDate: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });

  console.log("Booked Appointments:", bookedAppointments);

  const bookedSlots = bookedAppointments.map((appointment) => ({
    startTime: appointment.appointmentTime.startTime,
    endTime: appointment.appointmentTime.endTime,
  }));

  const availability = generateSlots(
    doctor.availableTimings,
    doctor.eachSlotDuration,
    bookedSlots,
    true,
  );

  return NextResponse.json(
    {
      success: true,
      slots: availability,
    },
    { status: 200 },
  );
}
