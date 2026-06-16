"use client";

import { DoctorForm, DoctorModal } from "@/components/DoctorModel";
import { useEffect, useState } from "react";
import { fetchDoctors } from "@/store/thunk";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";

export default function DoctorsPage() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { doctors, loading, error } = useAppSelector((state) => state.doctor);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorForm | undefined>(
    undefined,
  );

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Create New
          </button>
          <button
            onClick={() => router.back()}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Back
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {doctors.data.map((doctor) => (
          <div key={doctor._id} className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold text-lg">{doctor.name}</h3>

            <p className="text-gray-600 mt-2">
              <strong>Specialization:</strong> {doctor.specialization}
            </p>

            <p className="text-gray-600">
              <strong>Experience:</strong> {doctor.experience} Years
            </p>

            <button
              onClick={() => handleEdit(doctor)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full"
            >
              Edit
            </button>
          </div>
        ))}
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
