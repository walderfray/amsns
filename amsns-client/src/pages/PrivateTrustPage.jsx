import React from "react";
import {
  Shield,
  Lock,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  Building,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function PrivateTrustPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-40 pb-32 overflow-hidden bg-blue-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-blue-900/80 to-blue-900/90"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
              Irrevocable{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400">
                Private Trust
              </span>{" "}
              Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 font-light leading-relaxed">
              Protect What Matters. Build a Legacy That Lasts.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-white text-blue-900 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start Your Trust <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#details"
                className="px-8 py-4 bg-blue-800/50 text-white border border-blue-700 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-all backdrop-blur-sm flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 leading-relaxed">
              An Irrevocable Private Trust is one of the most powerful
              estate-planning tools available for individuals who want long-term
              protection, privacy, and stability for their families. Once
              established, the assets placed in an irrevocable trust are no
              longer owned personally — they are managed for the benefit of the
              chosen beneficiaries according to the instructions you set.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Asset Protection
              </h3>
              <p className="text-gray-600">
                Enhanced asset protection from future lawsuits or creditors,
                securing your wealth for generations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Family Security
              </h3>
              <p className="text-gray-600">
                Long-term financial security for children, family members, or
                charitable causes with clear distribution rules.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Tax Advantages
              </h3>
              <p className="text-gray-600">
                Potential tax advantages depending on your jurisdiction and
                circumstances, optimizing your estate's value.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy</h3>
              <p className="text-gray-600">
                Greater privacy, as trust assets generally avoid public probate
                proceedings, keeping your affairs confidential.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Clear Instructions
              </h3>
              <p className="text-gray-600">
                Clear distribution rules, ensuring your intentions are honored
                without confusion or dispute.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Building className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Professional Structure
              </h3>
              <p className="text-gray-600">
                We provide clear, responsibly structured options that align with
                recognized legal standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Secure your legacy. Protect your future.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Explore whether an Irrevocable Private Trust is right for you. Our
            experts are here to guide you through every step of the process.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started Now <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
