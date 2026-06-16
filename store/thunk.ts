import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDoctors = createAsyncThunk(
  "doctor/fetchDoctors",
  async () => {
    const response = await fetch("/api/doctors");

    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }

    return response.json();
  },
);

export const fetchAppointments = createAsyncThunk(
  "appointment/fetchAppointments",
  async ({ doctorId, date }: { doctorId: string; date: string }) => {
    const response = await fetch(
      `/api/doctors/${doctorId}/getappointments?date=${date}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch appointments");
    }
    return response.json();
  },
);
