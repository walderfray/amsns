import React from 'react';
import Video from '../images/Video.mp4';

export default function VideoComponent() {
    return (
        <div className="w-full bg-white my-10 from-gray-50 to-gray-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
                    Discover How to lawfully STOP paying income taxes.
                </h1>

                {/* Video Container */}
                <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl">
                    {/* Aspect Ratio Container */}
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <video
                            className="absolute inset-0 w-full h-full"
                            controls
                            controlsList="nodownload"

                        >
                            <source src={Video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-8 text-center">
                    <p className="text-gray-700 text-lg">
                        Learn the legal strategies and methods to reduce your tax burden and understand your rights as a taxpayer.
                    </p>
                </div>
            </div>
        </div>
    );
}