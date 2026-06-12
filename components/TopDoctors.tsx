export default function TopDoctors() {
  const doctors = [
    {
      name: "Dr. Atul Shirale",
      specialization: "Cardiologist",
      image: "/doctor.png",
    },
    {
      name: "Dr. Amit Patil",
      specialization: "Orthopedic",
      image: "/doctor.png",
    },
    {
      name: "Dr. Neha Kulkarni",
      specialization: "Pediatrician",
      image: "/doctor.png",
    },
  ];

  return (
    <section className="py-20 scroll-mt-24" id="doctors">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Top Doctors</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold">{doctor.name}</h3>

                <p className="text-blue-600 mb-4">{doctor.specialization}</p>

                <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
