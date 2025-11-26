import { useState } from "react";

export default function Assistance() {
    const [open, setOpen] = useState(false);

    return (
        <div className=" w-full max-w-4xl md:max-w-6xl mx-auto">
            {/* Accordion Header */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-4 py-5 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition"
            >
                <span>Click For Land Patent Assistance</span>
                <span>{open ? "−" : "+"}</span>
            </button>

            {/* Dropdown Content */}
            {open && (
                <div className={"mt-3 p-4 border rounded-lg bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out " + (open ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0")}>
                    <h1 className="text-red-700 text-lg mb-3">
                        Would you like Ron's Help bringing your land patent forward?
                    </h1>
                    <p className="text-gray-700 mb-3 text-justify">
                        If completing your chain of title all the way back to the government's grant of the original
                        land patent, Or obtaining certified copies of your land patent from the Bureau of Land management
                        is not too overwhelming for you. Then you might be interested in Ron's "Silver" Land Patent
                        Assistance where you do most of the hardwork and ron does the rest. Please use the form below
                        for the first inquiry about a new land patent project.
                    </p>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setOpen(false);
                        }}
                        className="grid gap-4"
                    >
                        <div className="grid gap-1">

                            <input
                                type="text"
                                required
                                className="border rounded-md p-4"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="grid gap-1">

                            <input
                                type="email"
                                required
                                className="border rounded-md p-4"
                                placeholder="Enter your email"

                            />
                        </div>
                        <div className="grid gap-1">

                            <input
                                type="number"
                                required
                                className="border rounded-md p-4"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="grid gap-1">

                            <textarea
                                className="border rounded-md p-4"
                                placeholder="Write your message..."
                                rows={3}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-800 text-white py-4 rounded-lg hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>

                        <div className="grid gap-1">

                            <input
                                type="text"
                                required
                                className="border rounded-md p-4"
                                placeholder="AMG Contact helping you (if Applicable)"
                            />
                        </div>

                    </form>
                </div>
            )}
        </div>
    );
}
