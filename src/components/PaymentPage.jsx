import React, { useState } from 'react';
import { Copy, Check, Menu, X } from 'lucide-react';
import Btc from '../images/Btc.png';
import Xrp from '../images/Xrp.png';
import Xlm from '../images/Xlm.png';
import Gold from '../images/Gold.png';
import Silver from '../images/Silver.png';
import Footer from './Footer';

export default function CompletePaymentPage() {
    const [copiedAddress, setCopiedAddress] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const cryptoCoins = [
        {
            id: 1,
            name: 'Bitcoin',
            symbol: 'BTC',
            address: 'bc1qudjnyw0vc9d7fkkptexq2n0u6c5kke9hy0jlk7',
            image: Btc
        },
        {
            id: 2,
            name: 'Ripple',
            symbol: 'XRP',
            address: 'r9KfpE13i67kBvQM6d74G2iJdDTCnNPNK8',
            image: Xrp
        },
        {
            id: 3,
            name: 'Stellar Lumens',
            symbol: 'XLM',
            address: 'GAQY5IZIHKFF7ZFRP62ZYKZ3ZXYBQFXARPAQYQGUGTFTP6BW7OMOCY4A',
            image: Xlm
        }
    ];

    const physicalAssets = [
        {
            id: 1,
            name: 'Gold',
            address: '120 TAMARRON PKWY SE ',
            image: Gold
        },
        {
            id: 2,
            name: 'Silver',
            address: 'ATLANTA GA 30339',
            image: Silver
        }
    ];

    const handleCopy = (address, identifier) => {
        navigator.clipboard.writeText(address);
        setCopiedAddress(identifier);
        setTimeout(() => setCopiedAddress(null), 2000);
    };

    return (
        <div className="w-full min-h-screen bg-white flex flex-col">
            {/* Navbar */}
            <nav className="bg-blue-600 shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <span className="text-white text-2xl font-bold">PaymentHub</span>
                        </div>

                        <div className="hidden md:flex space-x-8">
                            <a href="#" className="text-white hover:text-blue-200 transition">Home</a>
                            <a href="#" className="text-white hover:text-blue-200 transition">Payment</a>
                            <a href="#" className="text-white hover:text-blue-200 transition">About</a>
                            <a href="#" className="text-white hover:text-blue-200 transition">Contact</a>
                        </div>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-white"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <div className="md:hidden pb-4">
                            <a href="#" className="block text-white hover:text-blue-200 py-2 transition">Home</a>
                            <a href="#" className="block text-white hover:text-blue-200 py-2 transition">Payment</a>
                            <a href="#" className="block text-white hover:text-blue-200 py-2 transition">About</a>
                            <a href="#" className="block text-white hover:text-blue-200 py-2 transition">Contact</a>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Payment Options
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Choose your preferred payment method - cryptocurrency or physical assets
                        </p>
                    </div>

                    {/* Cryptocurrency Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Send Cryptocurrency
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {cryptoCoins.map((coin) => (
                                <div
                                    key={coin.id}
                                    className="bg-white rounded-lg border border-gray-200 p-6 shadow-md hover:shadow-lg transition"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <img
                                            src={coin.image}
                                            alt={coin.name}
                                            className="w-16 h-16"
                                        />
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">{coin.name}</h3>
                                            <p className="text-gray-600 text-sm">{coin.symbol}</p>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4">
                                        <label className="text-gray-700 text-sm font-medium block mb-2">
                                            Wallet Address
                                        </label>
                                        <p className="text-gray-900 text-xs md:text-sm break-all font-mono">
                                            {coin.address}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleCopy(coin.address, coin.symbol)}
                                        className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${copiedAddress === coin.symbol
                                            ? 'bg-green-600 text-white'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}
                                    >
                                        {copiedAddress === coin.symbol ? (
                                            <>
                                                <Check className="w-5 h-5" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-5 h-5" />
                                                Copy Address
                                            </>
                                        )}
                                    </button>

                                    <div className="bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-3 mt-4">
                                        <p className="text-yellow-800 text-xs">
                                            ⚠️ Verify the address before sending funds.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Physical Assets Section */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Send Physical Assets
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {physicalAssets.map((asset) => (
                                <div
                                    key={asset.id}
                                    className="bg-white rounded-lg border border-gray-200 p-6 shadow-md hover:shadow-lg transition"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <img
                                            src={asset.image}
                                            alt={asset.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <h3 className="text-2xl font-bold text-gray-900">{asset.name}</h3>
                                    </div>

                                    <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4">
                                        <label className="text-gray-700 text-sm font-medium block mb-2">
                                            Shipping Address
                                        </label>
                                        <p className="text-gray-900 text-sm leading-relaxed">
                                            {asset.address}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleCopy(asset.address, asset.name)}
                                        className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${copiedAddress === asset.name
                                            ? 'bg-green-600 text-white'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}
                                    >
                                        {copiedAddress === asset.name ? (
                                            <>
                                                <Check className="w-5 h-5" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-5 h-5" />
                                                Copy Address
                                            </>
                                        )}
                                    </button>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                                        <p className="text-blue-800 text-xs">
                                            ℹ️ Ensure proper packaging and insurance for your {asset.name.toLowerCase()} shipment.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <h4 className="font-bold text-gray-900 mb-2">Important Shipping Notes:</h4>
                            <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                                <li>Use certified and insured shipping methods</li>
                                <li>Include tracking information with your shipment</li>
                                <li>Package items securely to prevent damage</li>
                                <li>Contact support before shipping large quantities</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}