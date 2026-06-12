"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SetStateAction, useState } from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Atul Shirale",
    specialization: "General Physician",
    image: "/doctor.png",
  },
  {
    id: 2,
    name: "Dr. Priya Patil",
    specialization: "Pediatrician",
    image: "/doctor.png",
  },
];

const slots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

export default function AppointmentPage() {
  const [doctor, setDoctor] = useState(doctors[0]);
  const [date, setDate] = useState<Date | null>(new Date());
  const [slot, setSlot] = useState("");
  const [showModal, setShowModal] = useState(false);

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
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setDoctor(doc)}
                  className={`cursor-pointer border rounded-xl p-4 ${
                    doctor.id === doc.id ? "border-blue-600 bg-blue-50" : ""
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
              onChange={(selectedDate: SetStateAction<Date | null>) =>
                setDate(selectedDate)
              }
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
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`p-3 rounded-lg border ${
                    slot === s ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          {date && slot && (
            <div className="bg-blue-50 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-lg mb-3">Booking Summary</h3>

              <p>
                <strong>Doctor:</strong> {doctor.name}
              </p>

              <p>
                <strong>Date:</strong> {date.toDateString()}
              </p>

              <p>
                <strong>Time:</strong> {slot}
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
