"use client";

import { fetchAppointments, fetchDoctors } from "@/store/thunk";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setDoctor } from "@/store/slices/doctorSlice";
import ReactSelect from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IAppointment } from "@/interface/appointment";

export default function AppointmentsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { appointments, loading } = useAppSelector(
    (state) => state.appointment,
  );

  const { doctor, doctors } = useAppSelector((state) => state.doctor);

  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);

  const [date, setDate] = useState<Date | null>(new Date());

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const doctorOptions = (doctors?.data || []).map((doc) => ({
    value: doc._id,
    label: doc.name,
  }));

  const fetchAppointmentsForDoctor = useCallback(
    (doctorId: string, selectedDate: Date) => {
      dispatch(
        fetchAppointments({
          doctorId,
          date: selectedDate.toISOString(),
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    if (!doctor?._id || !date) return;

    fetchAppointmentsForDoctor(doctor._id, date);
  }, [doctor?._id, date, fetchAppointmentsForDoctor]);

  const getStatusClass = (status: string) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Appointments</h1>

        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-5 mb-8">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="font-semibold block mb-2">Select Doctor</label>

            <ReactSelect
              instanceId="doctor-select"
              inputId="doctor-select"
              options={doctorOptions}
              value={
                doctor
                  ? {
                      value: doctor._id,
                      label: doctor.name,
                    }
                  : null
              }
              onChange={(option) => {
                const selectedDoc = doctors?.data?.find(
                  (doc) => doc._id === option?.value,
                );

                if (selectedDoc) {
                  dispatch(setDoctor(selectedDoc));
                }
              }}
              placeholder="Select Doctor"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">Select Date</label>

            <DatePicker
              selected={date}
              onChange={(date: Date | null) => setDate(date)}
              dateFormat="dd/MM/yyyy"
              className="border p-3 rounded-lg w-full"
              wrapperClassName="w-full"
              showMonthDropdown
              showYearDropdown
            />
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty State */}
      {!loading && appointments?.appointments?.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center shadow">
          <p className="text-gray-500">No appointments found.</p>
        </div>
      )}

      {/* Desktop Table */}
      {!loading && appointments?.appointments?.length > 0 && (
        <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Patient</th>
                  <th className="p-4 text-left">Mobile</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Slot</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.appointments.map((appointment: IAppointment) => (
                  <tr
                    key={appointment._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4">
                      {appointment.patientDetails.firstName}{" "}
                      {appointment.patientDetails.lastName}
                    </td>

                    <td className="p-4">{appointment.patientDetails.phone}</td>

                    <td className="p-4">
                      {new Date(
                        appointment.appointmentDate,
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      {appointment.appointmentTime.startTime} -{" "}
                      {appointment.appointmentTime.endTime}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                          appointment.appointmentStatus,
                        )}`}
                      >
                        {appointment.appointmentStatus}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => setSelectedAppointment(appointment)}
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile Cards */}
      {!loading && (
        <div className="md:hidden space-y-4">
          {appointments?.appointments?.map((appointment: IAppointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-xl shadow p-4"
            >
              <h3 className="font-bold">
                {appointment.patientDetails.firstName}{" "}
                {appointment.patientDetails.lastName}
              </h3>

              <p className="text-gray-600">
                📞 {appointment.patientDetails.phone}
              </p>

              <p className="text-gray-600">
                📅 {new Date(appointment.appointmentDate).toLocaleDateString()}
              </p>

              <p className="text-gray-600">
                🕒 {appointment.appointmentTime.startTime}
                {" - "}
                {appointment.appointmentTime.endTime}
              </p>

              <button
                onClick={() => setSelectedAppointment(appointment)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center border-b p-5">
              <h2 className="text-xl font-bold">Appointment Details</h2>

              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p>
                <strong>Name:</strong>{" "}
                {selectedAppointment.patientDetails.firstName}{" "}
                {selectedAppointment.patientDetails.lastName}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {selectedAppointment.patientDetails.phone}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  selectedAppointment.appointmentDate,
                ).toLocaleDateString()}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {selectedAppointment.appointmentTime.startTime}
                {" - "}
                {selectedAppointment.appointmentTime.endTime}
              </p>

              <p>
                <strong>Status:</strong> {selectedAppointment.appointmentStatus}
              </p>
            </div>

            <div className="border-t p-5 flex justify-end">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
