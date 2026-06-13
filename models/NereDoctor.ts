import mongoose from "mongoose";

const NereDoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    specialization: { type: [String], required: true },
    experience: { type: Number, required: true },
    dob: { type: Date },
    eachSlotDuration: { type: Number, required: true, default: 20 },
    allowLessThanDurationSlot: { type: Boolean, default: true },
    availableTimings: {
      type: [
        {
          start: { type: String, required: true },
          end: { type: String, required: true },
          _id: false,
        },
      ],
      default: [{ start: "09:00", end: "17:00" }],
    },
    availableDays: {
      type: [String],
      default: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    image: String,
    languages: [String],
    qualifications: [String],
    awards: [String],
    about: String,
    consultationFee: { type: Number, default: 0 },
    registrationNumber: {
      type: String,
      unique: true,
    },
    isMainDoctor: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.NereDoctor ||
  mongoose.model("NereDoctor", NereDoctorSchema);
