"use client";

import { DoctorForm, DoctorModal } from "@/components/DoctorModel";
import { useEffect, useState } from "react";
import { fetchDoctors } from "@/store/slices/doctorSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";

export default function DoctorsPage() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const { doctors, loading, error } = useAppSelector((state) => state.doctor);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorForm | undefined>(
    undefined,
  );

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEdit = (doctor: DoctorForm) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const refreshDoctors = () => {
    dispatch(fetchDoctors());
  };

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
            {doctors.data.map((doctor) => (
              <tr key={doctor._id}>
                <td className="p-4">{doctor.name}</td>

                <td className="p-4">{doctor.specialization}</td>

                <td className="p-4">{doctor.experience} Years</td>

                <td className="p-4">
                  <button
                    onClick={() => handleEdit(doctor)}
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

      {showModal && (
        <DoctorModal
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            refreshDoctors();
            setSelectedDoctor(undefined);
          }}
          doctor={selectedDoctor}
        />
      )}
    </div>
  );
}
