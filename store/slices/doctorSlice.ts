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
  doctor: DoctorForm | null;
  loading: boolean;
  error: string | null;
}

const initialState: DoctorState = {
  doctors: {
    data: [],
  },
  doctor: null,
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctor: (state, action) => {
      state.doctor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
        state.doctor =
          action.payload.data.length > 0 ? action.payload.data[0] : null;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setDoctor } = doctorSlice.actions;

export default doctorSlice.reducer;
