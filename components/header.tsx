"use client";

import { useEffect, useState } from "react";

export default function Header() {

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  return (
    <header className="fixed top-0 w-full bg-white shadow z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <div className="flex items-center gap-3">
        <img
            src="/NereHospitallogo.png"
            alt="Nere Hospital Logo"
            className="h-12 w-12 object-contain"
        />

        <h2 className="font-bold text-2xl text-blue-600">
            Nere Hospital
        </h2>
        </div>
        <nav className="hidden md:flex gap-8">
          <a href="#home">Home</a>
          <a href="#doctors">Doctors</a>
          <a href="#services">Services</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>

        {showButton && (
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Book Appointment
          </button>
        )}

      </div>

    </header>
  );
}