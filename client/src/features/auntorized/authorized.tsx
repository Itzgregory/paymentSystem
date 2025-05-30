import React from "react";
import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
      <p className="text-lg text-gray-700 mb-8">
        You do not have permission to view this page.
      </p>
      <Link href="/login" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Go Back to Home
      </Link>
    </div>
  );
};

export default Unauthorized;