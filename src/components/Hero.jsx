import React, { useState, useEffect } from 'react';
import Buildings from '../images/buildings.jpg';

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger fade-in animation after component mounts
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative h-[90vh] w-full overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${Buildings})`
                }}
            >
                {/* Dark Overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl text-center">
                    {/* Heading with fade-in animation */}
                    <h1
                        className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                            }`}
                    >
                        American State National Sovereignty
                    </h1>

                    {/* Subheading with delayed fade-in */}
                    <p
                        className={`text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                            }`}
                    >
                        Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                    </p>

                    {/* CTA Buttons with delayed fade-in */}
                    <div
                        className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                            }`}
                    >
                        <button className="bg-blue-800 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300 shadow-lg">
                            Get Started
                        </button>
                        <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transform hover:scale-105 transition duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
}