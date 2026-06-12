"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [showButton, setShowButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
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

          <h2 className="font-bold text-2xl text-blue-600">Nere Hospital</h2>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link href="/#home">Home</Link>
          {/* <Link href="/#doctors">Doctors</Link> */}
          <Link href="/#services">Services</Link>
          <Link href="/#testimonials">Testimonials</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/#reviews">Reviews</Link>
          <Link href="/#contact">Contact us</Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <nav className="flex flex-col p-4 space-y-4">
              <Link href="/#home" onClick={() => setIsOpen(false)}>
                Home
              </Link>

              <Link href="/#services" onClick={() => setIsOpen(false)}>
                Services
              </Link>

              <Link href="/#testimonials" onClick={() => setIsOpen(false)}>
                Testimonials
              </Link>

              <Link href="/#faq" onClick={() => setIsOpen(false)}>
                FAQ
              </Link>

              <Link href="/#reviews" onClick={() => setIsOpen(false)}>
                Reviews
              </Link>

              <Link href="/#contact" onClick={() => setIsOpen(false)}>
                Contact Us
              </Link>
              <Link
                href="/appointment"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
              >
                Book Appointment
              </Link>
            </nav>
          </div>
        )}

        {showButton && (
          <div className="hidden md:block">
            <Link
              href="/appointment"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Book Appointment
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
