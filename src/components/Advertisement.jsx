import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const slides = [
        {
            id: 1,
            title: "PERMANENTLY SECURE YOUR OPEN/CONCEALED CARRY RIGHTS AND NEVER PAY INCOME TAX AGAIN LAWFULLY BY BECOMING AN AMERICAN STATE NATIONAL."
        },
        {
            id: 2,
            title: "NEVER PAY INCOME TAXES AGAIN*... LEGALLY BY BECOMING AN AMERICAN STATE NATIONAL. "
        },
        {
            id: 3,
            title: "PAY NO INCOME TAX AND OTHER BENEFITS"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="w-full bg-blue-800 flex items-center justify-center">
            <div className="relative w-full max-w-6xl mx-auto px-4">
                {/* Carousel Container */}
                <div className="relative h-96 flex items-center justify-center overflow-hidden rounded-lg">
                    {/* Slides */}
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <div className="bg-blue-800 w-full h-full flex items-center justify-center p-8 text-center">
                                <h1 className="text-white text-3xl md:text-3xl font-bold leading-tight">
                                    {slide.title}
                                </h1>
                            </div>
                        </div>
                    ))}

                    {/* Previous Button
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 md:translate-x-0 z-10 bg-transparent md:px-2 hover:bg-gray-200 rounded-full p-2 transition md:left-4"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button> */}

                    {/* Next Button
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 md:translate-x-0 z-10 bg-transparent md:pl-8 hover:bg-gray-200 rounded-full p-2 transition md:right-4"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button> */}
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-3 mt-8">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                ? 'bg-white w-8'
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Slide Counter */}
                <div className="text-center mt-6 text-white text-sm font-medium">
                    {currentSlide + 1} of {slides.length}
                </div>
            </div>
        </div>
    );
}