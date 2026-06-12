export default function Services() {
  const services = [
    {
      title: "Cardiology",
      icon: "❤️",
      description: "Advanced heart care and diagnostics",
    },
    {
      title: "Orthopedics",
      icon: "🦴",
      description: "Bone and joint treatment",
    },
    {
      title: "Pediatrics",
      icon: "👶",
      description: "Healthcare for children",
    },
    {
      title: "Neurology",
      icon: "🧠",
      description: "Brain and nervous system care",
    },
  ];

  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Our Services
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Comprehensive healthcare services for your family.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="text-5xl mb-4">{service.icon}</div>

              <h3 className="text-xl font-bold mb-2">
                {service.title}
              </h3>

              <p className="text-gray-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}