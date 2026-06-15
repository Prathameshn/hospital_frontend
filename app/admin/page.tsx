"use client";

export default function AdminDashboard() {
  const logout = async () => {
    await fetch("/api/admin-logout", {
      method: "POST",
    });

    window.location.href = "/admin-login";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          href="/admin/doctors"
          className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Manage Doctors
        </a>

        <a
          href="/admin/appointments"
          className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700 transition"
        >
          Manage Appointments
        </a>

        <a
          href="/admin/reviews"
          className="bg-yellow-600 text-white p-6 rounded-lg shadow hover:bg-yellow-700 transition"
        >
          Manage Reviews
        </a>
      </div>
    </div>
  );
}
