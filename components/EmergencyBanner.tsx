export default function EmergencyBanner() {
  return (
    <section className="bg-red-600 text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold">24/7 Emergency Services</h2>

            <p>Immediate medical assistance available anytime.</p>
          </div>

          <a
            href="tel:+919999999999"
            className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold"
          >
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
