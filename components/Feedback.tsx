"use client";

import { useEffect, useState } from "react";

export default function Feedback() {
  const [feedbackObj, setFeedbackObj] = useState({
    name: "",
    email: "",
    rating: 0,
    feedback: "",
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: feedbackObj.name,
        email: feedbackObj.email,
        rating: feedbackObj.rating,
        feedback: feedbackObj.feedback,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Feedback Submitted Successfully!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/feedback", {
        method: "GET",
      });

      const data = await response.json();
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <section id="feedback" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Your Feedback/Suggestions valuable for us
        </h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <form className="bg-white p-8 rounded-2xl shadow-lg">
            {/* Name */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-lg p-3"
                value={feedbackObj.name}
                onChange={(e) =>
                  setFeedbackObj({ ...feedbackObj, name: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg p-3"
                value={feedbackObj.email}
                onChange={(e) =>
                  setFeedbackObj({ ...feedbackObj, email: e.target.value })
                }
              />
            </div>

            {/* Rating */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Rating</label>

              <div className="flex gap-1 text-3xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setFeedbackObj({ ...feedbackObj, rating: star })
                    }
                  >
                    {star <= feedbackObj.rating ? "⭐" : "☆"}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Feedback</label>

              <textarea
                rows={5}
                placeholder="Share your experience..."
                className="w-full border rounded-lg p-3"
                value={feedbackObj.feedback}
                onChange={(e) =>
                  setFeedbackObj({ ...feedbackObj, feedback: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
