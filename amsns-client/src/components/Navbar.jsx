import React, { useEffect, useState } from "react";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import Logo from "../images/Logo.jpeg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuthStore();

  const isAuthPage = ["/login", "/register", "/forgot-password"].includes(
    location.pathname
  );
  const isDarkPage = [
    "/services",
    "/kyc",
    "/status-correction",
    "/payments",
  ].includes(location.pathname);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isAuthPage) return null;

  const showDarkNav = isScrolled || isOpen || isDarkPage;

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-300 ${
        showDarkNav
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
          : "bg-white/60 py-4 shadow"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={Logo}
                alt="Logo"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              />
              <span
                className={`text-xl font-bold tracking-tight ${
                  showDarkNav ? "text-gray-900" : "text-gray-900 "
                } transition-colors`}
              >
                AMSNS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Private Trust", path: "/private-trust" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === link.path
                    ? "text-blue-600"
                    : showDarkNav
                    ? "text-gray-700"
                    : "text-gray-700 lg:text-gray-800 lg:hover:text-black"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons / Auth State */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium ${
                    showDarkNav ? "text-gray-700" : "text-gray-800"
                  } hover:text-blue-600`}
                >
                  Dashboard
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
                <div className="flex items-center gap-2 pl-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xs">
                    {user?.firstName?.[0] || "U"}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button
                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                      showDarkNav
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    Log in
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-5 py-2 text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-800 shadow-sm hover:shadow transition-all">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md transition-colors ${
                showDarkNav
                  ? "text-gray-700 hover:bg-gray-800 hover:text-white"
                  : "text-gray-800 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg transition-all duration-300 ease-in-out origin-top ${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 h-0"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          <div className="space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Private Trust", path: "/private-trust" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                    {user?.firstName?.[0] || "U"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <Link to="/dashboard" className="block w-full">
                  <button className="w-full px-4 py-3 text-center text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link to="/login" className="block w-full">
                  <button className="w-full px-4 py-3 text-center text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    Log in
                  </button>
                </Link>
                <Link to="/register" className="block w-full">
                  <button className="w-full px-4 py-3 text-center text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-800 shadow-sm transition-colors">
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
