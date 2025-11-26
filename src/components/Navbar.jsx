import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../images/Logo.jpeg';
import { Link } from 'react-router-dom';
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md py-4 fixed z-50 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/" className="text-2xl font-bold text-blue-600">
                            <img src={Logo} alt="Logo" className="w-16 h-16 md:w-24 md:h-24" />
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 transition duration-200">
                            Home
                        </Link>
                        <Link to="/services" className="text-gray-700 hover:text-blue-600 transition duration-200">
                            Services
                        </Link>
                        <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition duration-200">
                            Contact
                        </Link>
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="text-gray-700 border border-blue-800 hover:text-white hover:bg-blue-700 px-4 py-2 rounded-md transition duration-200">
                            <Link to="/Login" className="">
                                Login
                            </Link>
                        </button>
                        <button className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                            <Link to="/GetStarted" className="">
                                Get Started
                            </Link>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <Link
                            to="/"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            to="/services"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition duration-200"
                        >
                            Services
                        </Link>
                        <Link
                            to="/contact"
                            className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition duration-200"
                        >
                            Contact
                        </Link>
                        <div className="pt-2 space-y-2">

                            <button className="w-full bg-white text-gray-700 border border-gray-200 px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                                <Link to="/Login">
                                    Login
                                </Link>
                            </button>
                            <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                                <Link to="/GetStarted">
                                    Get Started
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}