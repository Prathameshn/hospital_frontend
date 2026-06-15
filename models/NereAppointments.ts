import mongoose from "mongoose";

const NereAppointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NereDoctor",
      required: true,
    },
    patientDetails: {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    appointmentDate: { type: Date, required: true },
    appointmentTime: {
      startTime: {
        type: String,
        required: true,
        validate: {
          validator: function (value: string) {
            return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
          },
          message: "Start time must be in HH:mm format (00:00 - 23:59)",
        },
      },
      endTime: {
        type: String,
        required: true,
        validate: {
          validator: function (value: string) {
            return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
          },
          message: "End time must be in HH:mm format (00:00 - 23:59)",
        },
      },
    },
    appointmentHistory: [
      {
        status: {
          type: String,
          required: true,
          enum: ["CREATED", "CONFIRMED", "COMPLETED", "CANCELLED"],
        },
        changedAt: { type: Date, default: Date.now },
      },
    ],
    appointmentStatus: {
      type: String,
      required: true,
      enum: ["CREATED", "CONFIRMED", "COMPLETED", "CANCELLED"],
      default: "CREATED",
    },
    notes: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.NereAppointment ||
  mongoose.model("NereAppointment", NereAppointmentSchema);
