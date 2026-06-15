import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NereAppointment from "@/models/NereAppointments";
import NereDoctor from "@/models/NereDoctor";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { patientDetails, appointmentDate, appointmentTime, notes } =
    await req.json();

  await connectDB();

  const doctor = await NereDoctor.findById(id);

  if (!doctor) {
    return NextResponse.json(
      {
        success: false,
        message: "Doctor not found",
      },
      { status: 404 },
    );
  }

  const appointment = await NereAppointment.create({
    doctor: doctor._id,
    patientDetails: patientDetails,
    appointmentDate: appointmentDate,
    appointmentTime: appointmentTime,
    appointmentStatus: "CREATED",
    apppointmenthistory: [
      {
        status: "CREATED",
      },
    ],
    notes: notes,
  });

  return NextResponse.json(
    {
      success: true,
      data: appointment,
    },
    { status: 200 },
  );
}
