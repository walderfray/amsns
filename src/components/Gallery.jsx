import React from 'react';
import Whatsapp1 from '../images/Whatsapp1.jpeg';
import Whatsapp2 from '../images/Whatsapp2.jpeg';
import Whatsapp3 from '../images/Whatsapp3.jpeg';
import Whatsapp4 from '../images/Whatsapp4.jpeg';
import Whatsapp5 from '../images/Whatsapp5.jpeg';
import Whatsapp6 from '../images/Whatsapp6.jpeg';

export default function PictureGallery() {
    const images = [
        {
            id: 1,
            src: Whatsapp1,
            alt: 'Mountain landscape',
            title: 'Mountain Peak'
        },
        {
            id: 2,
            src: Whatsapp2,
            alt: 'Ocean waves',
            title: 'Ocean Waves'
        },
        {
            id: 3,
            src: Whatsapp3,
            alt: 'Beach sunset',
            title: 'Beach Sunset'
        },
        {
            id: 4,
            src: Whatsapp4,
            alt: 'Forest trees',
            title: 'Forest'
        },
        {
            id: 5,
            src: Whatsapp5,
            alt: 'City lights',
            title: 'City Lights'
        },
        {
            id: 6,
            src: Whatsapp6,
            alt: 'Desert dunes',
            title: 'Desert Dunes'
        }
    ];

    return (
        <div className="w-full bg-white py-12 px-4">
            <div className="max-w-7xl mx-auto">


                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {images.map((image) => (
                        <div key={image.id} className="overflow-hidden rounded-lg shadow-md">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-64 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}