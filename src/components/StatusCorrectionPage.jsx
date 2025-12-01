import React, { useState } from 'react';
import { FileText, CheckCircle, DollarSign, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
export default function StatusCorrectionPage() {
    const [selectedDoc, setSelectedDoc] = useState(null);

    const documents = [
        { id: 1, name: "Deed of Re-conveyance", description: "Legal instrument returning property rights to the original owner" },
        { id: 2, name: "Declaration of Status", description: "Formal statement establishing your legal standing and capacity" },
        { id: 3, name: "Proof of Service", description: "Documentation showing proper delivery of legal notices" },
        { id: 4, name: "Judgment of Uh", description: "Court determination regarding your status correction" },
        { id: 5, name: "Rebutted Affidavit", description: "Sworn statement countering previous claims or allegations" },
        { id: 6, name: "Recording Cover Sheet", description: "Administrative form for official document recording" },
        { id: 7, name: "Affidavit of Repudiation", description: "Sworn declaration rejecting previous agreements or status" }
    ];

    const services = [
        "Custom preparation of your Affidavit of Repudiation",
        "Lawful citations and legal grounding",
        "Instructions for recording it properly",
        "Support throughout the process"
    ];

    return (
        <div className="min-h-screen bg-white relative top-40">
            <main className="max-w-6xl mx-auto px-6">
                {/* Introduction */}
                <section className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-slate-800 mb-4">Correct Your Legal Status</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Taking control of your legal status requires proper documentation and precise execution. Our comprehensive service provides you with all the necessary documents to correct your status according to lawful procedures.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        Each document has been carefully crafted to meet legal requirements and includes proper citations, grounding in law, and clear instructions for filing and recording.
                    </p>
                </section>

                {/* Documents Grid */}
                <section className="my-16">
                    <h2 className="text-2xl font-semibold text-slate-800 mb-6">Required Documents</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                onClick={() => setSelectedDoc(doc.id === selectedDoc ? null : doc.id)}
                                className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedDoc === doc.id ? 'ring-2 ring-blue-500' : ''
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <FileText className="text-blue-600 w-8 h-8" />
                                    <span className="text-sm font-semibold text-slate-500">#{doc.id}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">{doc.name}</h3>
                                <p className="text-sm text-slate-600">{doc.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="bg-blue-800 rounded-lg shadow-lg p-8 my-16 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0">
                            <div className="flex items-center mb-4">
                                <div>
                                    <h2 className="text-3xl font-bold">Affidavit of Repudiation (AOR)</h2>
                                    <p className="text-blue-100 mt-1">Complete preparation service</p>
                                </div>
                            </div>
                            <div className="text-5xl font-bold mb-4">$399</div>
                            <p className="text-blue-50">One-time fee, all-inclusive</p>
                        </div>
                        <Link to="/Payments" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-50 transition-colors duration-300">
                            Make Payment
                        </Link>
                    </div>
                </section>

                {/* What's Included */}
                <section className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-semibold text-slate-800 mb-6">What's Included</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {services.map((service, index) => (
                            <div key={index} className="flex items-start">
                                <CheckCircle className="text-green-500 w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                                <p className="text-slate-700 text-lg">{service}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-200">
                        <div className="flex items-center text-slate-600">
                            <Phone className="w-5 h-5 mr-2" />
                            <p>Need assistance? Our support team is here to help you every step of the way.</p>
                        </div>
                    </div>
                </section>

                {/* Disclaimer
                <section className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                        <strong>Important Notice:</strong> This service provides document preparation assistance. It does not constitute legal advice. For specific legal guidance regarding your situation, please consult with a qualified attorney in your jurisdiction.
                    </p>
                </section> */}
            </main>
            <Footer />

        </div>
    );
}