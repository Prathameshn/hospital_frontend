type Props = {
  onClose: () => void;
};

export function DoctorModal({ onClose }: Props) {
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
          <input placeholder="Doctor Name" className="border p-3 rounded-lg" />

          <input placeholder="Email" className="border p-3 rounded-lg" />

          <input placeholder="Mobile" className="border p-3 rounded-lg" />

          <input
            placeholder="Specialization"
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Experience"
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Consultation Fee"
            className="border p-3 rounded-lg"
          />
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

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
