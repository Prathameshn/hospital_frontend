export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white" id="contact">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">Nere Hospital</h3>

            <p className="text-gray-400">
              Trusted healthcare provider offering quality treatment and
              compassionate care.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>

            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>Doctors</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>

            <ul className="space-y-2 text-gray-400">
              <li>Cardiology</li>
              <li>Orthopedics</li>
              <li>Pediatrics</li>
              <li>Neurology</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>

            <ul className="space-y-2 text-gray-400">
              <li>📍 Nere, Maharashtra</li>
              <li>📞 +91 9876543210</li>
              <li>✉ info@nerehospital.in</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 py-6 text-center text-gray-400">
        © 2026 Nere Hospital. All Rights Reserved.
      </div>
    </footer>
  );
}
