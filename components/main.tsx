import Link from "next/link";

export default function Main() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-white" id="home">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Trusted Healthcare Since 2005
            </span>

            <h1 className="text-5xl font-bold mt-6 leading-tight">
              Your Health Is Our
              <span className="text-blue-600"> Priority</span>
            </h1>

            <p className="text-gray-600 text-lg mt-6">
              Book appointments with experienced doctors. Get quality healthcare
              services with advanced medical facilities and compassionate care.
            </p>

            <div className="flex gap-4 mt-8">
              <Link href="/appointment">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700">
                  Book Appointment
                </button>
              </Link>

              <button className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold">
                Call Now
              </button>
            </div>

            <div className="flex gap-8 mt-10">
              <div>
                <h3 className="text-3xl font-bold text-blue-600">5000+</h3>
                <p className="text-gray-500">Patients</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-blue-600">50+</h3>
                <p className="text-gray-500">Doctors</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-blue-600">20+</h3>
                <p className="text-gray-500">Years</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative">
            <img
              src="/doctor.png"
              alt="Doctor"
              className="rounded-3xl shadow-2xl"
            />

            <div className="absolute top-8 -left-8 bg-white p-4 rounded-2xl shadow-lg">
              <h4 className="font-bold">Dr. Atul Shirale</h4>
              <p className="text-sm text-gray-500">Cardiologist</p>
            </div>

            <div className="absolute bottom-10 -right-8 bg-white p-4 rounded-2xl shadow-lg">
              <p className="font-semibold text-green-600">Available Today</p>
              <Link href="/appointment">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-700">
                  Book Appointment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
