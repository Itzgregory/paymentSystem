import Link from "next/link";

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-700 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Go Back to Home
        </Link>
      </div>
    );
  }