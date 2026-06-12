"use client";

import { useState } from "react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      question: "How can I book an appointment?",
      answer:
        "You can book online through our website or call us directly.",
    },
    {
      question: "Do you provide emergency services?",
      answer:
        "Yes, our emergency services are available 24/7.",
    },
    {
      question: "Can I choose a specific doctor?",
      answer:
        "Yes, you can select your preferred doctor during booking.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl mb-4 overflow-hidden"
          >
            <button
              className="w-full text-left p-5 font-semibold"
              onClick={() =>
                setOpen(open === index ? null : index)
              }
            >
              {faq.question}
            </button>

            {open === index && (
              <div className="p-5 bg-gray-50">
                {faq.answer}
              </div>
            )}
          </div>
        ))}

      </div>
    </section>
  );
}