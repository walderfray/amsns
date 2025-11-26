import React, { useState, useEffect } from 'react';

export default function Overview() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger fade-up animation after component mounts
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl md:max-w-6xl mx-auto">
                {/* Header with underline */}
                <div
                    className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Overview</h2>
                    <div className="w-24 h-1 bg-blue-800 mx-auto"></div>
                </div>

                {/* Content text */}
                <div
                    className={`text-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <p className="text-lg text-gray-700 leading-relaxed">
                        The truth is, country hasn't felt "beautiful" for a long time. Too many people are living under government control without even realizing it — taxed, licensed, and processed in courts as if they're just corporate entities, not living individuals. That's why so many feel trapped, paying for mortgages and obligations that were never fully explained, while their own rights and private interests stay hidden behind paperwork they never claimed.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mt-6">
                        Correcting your status is how you stop letting the system define you. It's how you reclaim your position, operate privately, and set boundaries so the government can't interfere in every part of your life. If you're ready to break out of that cycle and take control of your own affairs, you can order for the Affidavit of repudiation (AOR).
                    </p>
                </div>
            </div>
        </div>
    );
}