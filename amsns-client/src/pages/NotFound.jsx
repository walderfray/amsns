import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="bg-red-50 p-4 rounded-full">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-800">Page Not Found</h2>
          <p className="text-lg text-gray-600">
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all transform hover:scale-105 shadow-lg font-medium"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
