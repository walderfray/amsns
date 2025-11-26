import React, { useState, useEffect } from 'react';
import jeremy from '../images/jeremy.jpg';
import Assistance from './Assistance';
export default function Founder() {
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
            <div className="md:max-w-6xl max-w-4xl mx-auto">
                {/* Header with underline */}
                <div
                    className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">The Founder</h2>
                    <div className="w-24 h-1 bg-blue-800 mx-auto"></div>
                </div>

                {/* Content text */}
                <div className="flex justify-between space-x-0 md:space-x-12 flex-col space-y-6 md:space-y-0 md:flex-row">
                    <div>
                        <img src={jeremy} alt="Founder" width="900" height="900" />
                    </div>
                    <div
                        className={`text-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
                        <p className="text-lg text-gray-700 leading-relaxed text-justify my-4">
                            Ron Gibson is a Co-founder of AMG, and built the Ron Gibson/AMG land patent assistance program with Robert and Krista beginning
                            in 2019. Ron's AMG program has grown over the years helping Ron Gibson and AMG to become known internationally for land patent
                            teaching assistance. Ron and Robert Provided seminars and webinars, traveling around the country together for 6 years teaching
                            land law and sacred honor to tens of thousands of people. Ron and his family want AMG to continue his work through his AMG land
                            program. Therefore, AMG is dedicated to continue the program in his honor.
                        </p>
                        <div>
                            <Assistance />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
