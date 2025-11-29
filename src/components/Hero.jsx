import React, { useEffect, useState } from 'react';
import Logo from '../images/Logo.jpeg';

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="w-full py-12 md:py-20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-0 mt-20">
                <div className="flex flex-col md:flex-row md:space-x-64 md:px-8 items-center gap-8 md:gap-12 md:justify-between">
                    {/* Text Content */}
                    <div className={`flex-1 text-center md:text-left transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                        }`}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                            AMERICAN STATE NATIONAL SOVEREIGNTY
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
                            Discover amazing features and services that will transform the way you work. Our platform is designed to help you achieve your goals with ease and efficiency.
                        </p>
                        <button className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition">
                            Get Started
                        </button>
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