export default function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      review:
        "Excellent doctors and friendly staff. Highly recommended.",
    },
    {
      name: "Priya Patil",
      review:
        "Very smooth appointment process and excellent treatment.",
    },
    {
      name: "Anita Joshi",
      review:
        "Modern facilities and experienced doctors.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Patient Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <div className="text-yellow-500 text-xl mb-3">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-600 mb-4">
                "{review.review}"
              </p>

              <h4 className="font-bold">
                {review.name}
              </h4>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}