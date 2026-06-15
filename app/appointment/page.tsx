"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchDoctors, setDoctor } from "@/store/slices/doctorSlice";

export default function AppointmentPage() {
  const dispatch = useAppDispatch();
  const { doctor, doctors, loading, error } = useAppSelector(
    (state) => state.doctor,
  );
  const [date, setDate] = useState<Date | null>(new Date());
  const [slot, setSlot] = useState({ start: "", end: "", isBooked: false });
  const [slots, setSlots] = useState<
    { start: string; end: string; isBooked: boolean }[]
  >([]);
  const [showModal, setShowModal] = useState(false);

  const fetchSlotsForDate = async (selectedDate: Date | null) => {
    const response = await fetch(
      `/api/doctors/${doctor?._id}/slots?date=${selectedDate?.toISOString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Fetched Slots:", data);
      return data.slots;
    } else {
      alert("Failed to fetch slots");
    }
    setSlot({ start: "", end: "", isBooked: false });
  };

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (doctor) {
      const fetchSlots = async () => {
        const slots = await fetchSlotsForDate(date);
        setSlots(slots || []);
        setSlot(
          slots && slots.length > 0
            ? slots[0]
            : { start: "", end: "", isBooked: true },
        );
      };
      fetchSlots();
    }
  }, [doctor, date]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleBooking = () => {
    console.log({
      doctor,
      date,
      slot,
      patient: form,
    });

    alert("Appointment Booked Successfully");

    setShowModal(false);
  };

  const handleSelectDoctor = (doc: any) => {
    dispatch(setDoctor(doc));
  };

  const handleSelectDate = async (
    selectedDate: SetStateAction<Date | null>,
  ) => {
    setDate(selectedDate);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Book Appointment
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Doctor */}
          <div className="mb-8">
            <h2 className="font-semibold mb-4">Select Doctor</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {doctors.data.map((doc) => (
                <div
                  key={doc._id}
                  onClick={() => handleSelectDoctor(doc)}
                  className={`cursor-pointer border rounded-xl p-4 ${
                    doctor && doctor._id === doc._id
                      ? "border-blue-600 bg-blue-50"
                      : ""
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-bold">{doc.name}</h3>
                      <p className="text-gray-500">{doc.specialization}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="mb-8 w-full">
            <label className="font-semibold block mb-2">Select Date</label>

            <DatePicker
              selected={date}
              onChange={handleSelectDate}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              placeholderText="Select a date"
              className="border p-3 rounded-lg w-full"
              wrapperClassName="w-full"
              isClearable
              showMonthDropdown
              showYearDropdown
            />
          </div>

          {/* Slots */}
          <div className="mb-8">
            <h2 className="font-semibold mb-4">Available Slots</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {slots.map((s) => (
                <button
                  key={s.start}
                  onClick={() => setSlot(s)}
                  className={`p-3 rounded-lg border ${
                    slot === s ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {s.start} - {s.end}
                </button>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          {date && slot && (
            <div className="bg-blue-50 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-lg mb-3">Booking Summary</h3>

              <p>
                <strong>Doctor:</strong> {doctor ? doctor.name : "N/A"}
              </p>

              <p>
                <strong>Date:</strong> {date ? date.toDateString() : "N/A"}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {slot ? `${slot.start} - ${slot.end}` : "N/A"}
              </p>
            </div>
          )}

          <button
            disabled={!date || !slot}
            onClick={() => setShowModal(true)}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold disabled:bg-gray-300"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Patient Details</h2>

            <div className="space-y-4">
              <input
                placeholder="First Name"
                className="border p-3 rounded-lg w-full"
                onChange={(e) =>
                  setForm({
                    ...form,
                    firstName: e.target.value,
                  })
                }
              />

              <input
                placeholder="Last Name"
                className="border p-3 rounded-lg w-full"
                onChange={(e) =>
                  setForm({
                    ...form,
                    lastName: e.target.value,
                  })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="border p-3 rounded-lg w-full"
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />

              <input
                placeholder="Phone Number"
                className="border p-3 rounded-lg w-full"
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border py-3 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleBooking}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
