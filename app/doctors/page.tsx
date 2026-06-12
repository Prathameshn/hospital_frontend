"use client";

import { DoctorModal } from "@/components/DoctorModel";
import { useState } from "react";

export default function DoctorsPage() {
  const [showModal, setShowModal] = useState(false);

  const doctors = [
    {
      _id: "1",
      name: "Dr. John",
      specialization: "Cardiology",
      experience: 10,
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Doctors</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Create New
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Specialization</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td className="p-4">{doctor.name}</td>

                <td className="p-4">{doctor.specialization}</td>

                <td className="p-4">{doctor.experience} Years</td>

                <td className="p-4">
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <DoctorModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
