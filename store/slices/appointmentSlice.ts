import { createSlice } from "@reduxjs/toolkit";
import { fetchAppointments } from "../thunk";
import { IAppointment } from "@/interface/appointment";

interface AppointmentState {
  appointments: {
    appointments: IAppointment[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  appointments: {
    appointments: [],
  },
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default appointmentSlice.reducer;
