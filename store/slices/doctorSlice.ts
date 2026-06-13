import { DoctorForm } from "@/components/DoctorModel";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

interface DoctorState {
  doctors: {
    data: DoctorForm[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: DoctorState = {
  doctors: {
    data: [],
  },
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default doctorSlice.reducer;
