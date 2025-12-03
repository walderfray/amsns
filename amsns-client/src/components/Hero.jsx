import React, { useEffect, useState } from "react";
import Logo from "../images/Logo.jpeg";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full py-16 md:py-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-0 mt-20">
        <div className="flex flex-col md:flex-row md:space-x-64 md:px-8 items-center gap-8 md:gap-12 md:justify-between">
          {/* Text Content */}
          <div
            className={`flex-1 text-center md:text-left transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              AMERICAN STATE NATIONAL SOVEREIGNTY
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
              Taking control of your legal status with proper documentation and
              precise execution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/register"
                className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition text-center"
              >
                Get Started
              </Link>
              <Link
                to={isAuthenticated ? "/dashboard" : "/private-trust"}
                className="bg-white border-2 border-blue-800 text-blue-800 hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg transition text-center"
              >
                Private Trust
              </Link>
            </div>
          </div>

          {/* Image Content */}
          <div className="flex-1">
            <img
              src={Logo}
              alt="Hero image"
              className="w-full h-auto rounded-lg w-80 h-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
