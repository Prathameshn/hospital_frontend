import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export interface DoctorForm {
  _id?: string;
  name: string;
  email: string;
  mobile: string;
  experience: number | null;
  dob: Date | null;
  eachSlotDuration: number | null;
  allowLessThanDurationSlot: boolean;
  availableTimings: { start: string; end: string }[];
  availableDays: string[];
  image: string;
  languages: string[];
  qualifications: string[];
  awards: string[];
  about: string;
  consultationFee: number | null;
  registrationNumber: string;
  specialization: string[];
}

type Props = {
  onClose: () => void;
  doctor?: DoctorForm;
};

export function DoctorModal({ onClose, doctor }: Props) {
  console.log("Received doctor data:", doctor);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [doctorForm, setDoctorForm] = useState<DoctorForm>({
    name: doctor?.name || "",
    email: doctor?.email || "",
    mobile: doctor?.mobile || "",
    specialization: doctor?.specialization || [],
    experience: doctor?.experience || null,
    dob: doctor?.dob || null,
    eachSlotDuration: doctor?.eachSlotDuration || null,
    allowLessThanDurationSlot: doctor?.allowLessThanDurationSlot || true,
    availableTimings: doctor?.availableTimings || [
      { start: "09:00", end: "17:00" },
    ],
    availableDays: doctor?.availableDays || [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    image: doctor?.image || "",
    languages: doctor?.languages || [],
    qualifications: doctor?.qualifications || [],
    awards: doctor?.awards || [],
    about: doctor?.about || "",
    consultationFee: doctor?.consultationFee || null,
    registrationNumber: doctor?.registrationNumber || "",
  });

  const onSave = async (e: { preventDefault: () => void }) => {
    try {
      const isEdit = doctor?._id;
      e.preventDefault();
      setLoading(true);
      setMessage("");

      const response = await fetch(
        isEdit ? `/api/doctors/${doctor._id}` : "/api/doctors",
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctorForm),
        },
      );

      const data = await response.json();

      console.log("Response from API:", data);

      if (data.success) {
        setMessage("Doctor Details Submitted Successfully!");
        onClose(); // Close the modal after submission
      } else {
        setMessage("Failed to submit doctor details. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting doctor details:", error);
      setMessage("Failed to submit doctor details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addSlot = () => {
    setDoctorForm({
      ...doctorForm,
      availableTimings: [
        ...doctorForm.availableTimings,
        {
          start: "",
          end: "",
        },
      ],
    });
  };

  const removeSlot = (index: number) => {
    setDoctorForm({
      ...doctorForm,
      availableTimings: doctorForm.availableTimings.filter(
        (_, i) => i !== index,
      ),
    });
  };

  const updateSlot = (index: number, field: "start" | "end", value: string) => {
    const updated = [...doctorForm.availableTimings];

    updated[index][field] = value;

    setDoctorForm({
      ...doctorForm,
      availableTimings: updated,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-4xl rounded-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Doctor Details</h2>

          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Doctor Name"
            value={doctorForm.name}
            onChange={(e) =>
              setDoctorForm({ ...doctorForm, name: e.target.value })
            }
            className="border p-3 rounded-lg"
          />

          <input
            placeholder="Email"
            value={doctorForm.email}
            onChange={(e) =>
              setDoctorForm({ ...doctorForm, email: e.target.value })
            }
            className="border p-3 rounded-lg"
          />

          <input
            placeholder="Mobile"
            value={doctorForm.mobile}
            onChange={(e) =>
              setDoctorForm({ ...doctorForm, mobile: e.target.value })
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Consultation Fee"
            value={doctorForm.consultationFee ?? ""}
            onChange={(e) =>
              setDoctorForm({
                ...doctorForm,
                consultationFee: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="border p-3 rounded-lg"
          />
          <input
            placeholder="Specialization (comma separated)"
            value={doctorForm.specialization.join(", ")}
            onChange={(e) =>
              setDoctorForm({
                ...doctorForm,
                specialization: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="border p-3 rounded-lg"
          />
          <input
            placeholder="Qualification (comma separated)"
            value={doctorForm.qualifications.join(", ")}
            onChange={(e) =>
              setDoctorForm({
                ...doctorForm,
                qualifications: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="border p-3 rounded-lg"
          />
          <input
            type="number"
            min={0}
            value={doctorForm.experience ?? ""}
            onChange={(e) =>
              setDoctorForm({
                ...doctorForm,
                experience: e.target.value ? Number(e.target.value) : null,
              })
            }
            placeholder="Experience (in years)"
            className="border p-3 rounded-lg"
          />

          <DatePicker
            placeholderText="Date of Birth"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="border p-3 rounded-lg w-full"
            selected={doctorForm.dob}
            onChange={(date: Date | null) =>
              setDoctorForm({ ...doctorForm, dob: date })
            }
            maxDate={new Date()}
          />
          <Select
            isMulti
            options={[
              { value: "English", label: "English" },
              { value: "Hindi", label: "Hindi" },
              { value: "Marathi", label: "Marathi" },
            ]}
            value={doctorForm.languages.map((lang) => ({
              value: lang,
              label: lang,
            }))}
            onChange={(selectedOptions) =>
              setDoctorForm({
                ...doctorForm,
                languages: selectedOptions.map((option) => option.value),
              })
            }
            placeholder="Select Languages"
            className="border p-3 rounded-lg"
          />

          <Select
            isMulti
            value={doctorForm.availableDays.map((day) => ({
              value: day,
              label: day,
            }))}
            onChange={(selectedOptions) =>
              setDoctorForm({
                ...doctorForm,
                availableDays: selectedOptions.map((option) => option.value),
              })
            }
            options={[
              { value: "Monday", label: "Monday" },
              { value: "Tuesday", label: "Tuesday" },
              { value: "Wednesday", label: "Wednesday" },
              { value: "Thursday", label: "Thursday" },
              { value: "Friday", label: "Friday" },
              { value: "Saturday", label: "Saturday" },
              { value: "Sunday", label: "Sunday" },
            ]}
            placeholder="Select Available Days"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Awards (comma separated)"
            value={doctorForm.awards.join(", ")}
            onChange={(e) =>
              setDoctorForm({
                ...doctorForm,
                awards: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            min={0}
            value={doctorForm.eachSlotDuration ?? ""}
            onChange={(e) =>
              setDoctorForm({
                ...doctorForm,
                eachSlotDuration: e.target.value
                  ? Number(e.target.value)
                  : null,
              })
            }
            placeholder="Each Slot Duration (in minutes)"
            className="border p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Registration Number"
            value={doctorForm.registrationNumber}
            onChange={(e) =>
              setDoctorForm({
                ...doctorForm,
                registrationNumber: e.target.value,
              })
            }
            className="border p-3 rounded-lg"
          />
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-3">
            <label className="font-medium">Available Timings</label>

            <button
              type="button"
              onClick={addSlot}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg"
            >
              + Add Slot
            </button>
          </div>

          {doctorForm.availableTimings.map((slot, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_auto] gap-4 mb-3"
            >
              <input
                type="time"
                value={slot.start}
                onChange={(e) => updateSlot(index, "start", e.target.value)}
                className="border p-3 rounded-lg"
              />

              <input
                type="time"
                value={slot.end}
                onChange={(e) => updateSlot(index, "end", e.target.value)}
                className="border p-3 rounded-lg"
              />

              {doctorForm.availableTimings.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSlot(index)}
                  className="bg-red-500 text-white px-3 rounded-lg"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <textarea
          placeholder="About Doctor"
          className="border p-3 rounded-lg w-full mt-4"
          rows={5}
        />

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded-lg">
            Cancel
          </button>

          <button
            onClick={onSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}

            {loading ? "Saving..." : "Save"}
          </button>
          {message && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                message.includes("Successfully")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
