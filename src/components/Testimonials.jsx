export default function Testimonials() {
    const quotes = [
        {
            name: "Sarah Johnson",
            text: "This platform exceeded my expectations. The experience was seamless and enjoyable!",
        },
        {
            name: "Michael Adewale",
            text: "I love how simple everything is. It has made my workflow so much faster.",
        },
        {
            name: "Emily Carter",
            text: "A truly outstanding service! I’ve recommended it to all my folks. It does Absolutely Everything i need",
        },
        {
            name: "James Thompson",
            text: "Great user experience and exceptional support. Highly satisfied! I highly recommend this platform",
        },
    ];

    return (
        <div className="py-8 px-4 md:px-0 w-full max-w-3xl md:max-w-6xl mx-auto">
            <h2 className="text-4xl text-center font-bold text-gray-900 mb-2">Testimonials</h2>
            <div className="w-24 h-1 bg-blue-800 mx-auto "></div>
            <div className="grid md:grid-cols-2 gap-6 py-10">
                {quotes.map((q, i) => (
                    <div
                        key={i}
                        className="p-4 border shadow md rounded-xl bg-white hover:shadow-lg transition"
                    >
                        <p className="text-gray-700 italic mb-3">“{q.text}”</p>
                        <p className="text-sm font-semibold text-gray-900">— {q.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
