"use client";
import { useRouter } from "next/navigation";

export default function ReviewsPage() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <div className="p-8 relative">
      <button
        onClick={goBack}
        className="absolute top-8 right-8 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-6">Reviews</h1>
      <p className="text-gray-600">This is the reviews page.</p>
    </div>
  );
}
