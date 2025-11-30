import Logo from "../images/TransparentLogo.png";
export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-gray-300 py-8 mt-10">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
                {/* Brand */}
                <div>
                    <img src={Logo} alt="Logo" className="w-16 h-16 md:w-24 md:h-24" />
                    <h1 className="text-lg text-white">
                        American State National Sovereignty
                    </h1>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
                    <ul className="space-y-1 text-gray-400 text-sm">
                        <li className="hover:text-white transition cursor-pointer">Home</li>
                        <li className="hover:text-white transition cursor-pointer">Services</li>
                        <li className="hover:text-white transition cursor-pointer">Contact</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Contact</h4>
                    <p className="text-sm text-gray-400">Email: support@yourbrand.com</p>
                    <p className="text-sm text-gray-400">Phone: +234 810 123 4567</p>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} AMSNS. All rights reserved.
            </div>
        </footer>
    );
}