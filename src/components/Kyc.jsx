const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
    if (errors[name]) {
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    }
};

const handleFileChange = (e, side) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Store the file in formData
    if (side === 'front') {
        setFormData(prev => ({
            ...prev,
            driverLicenseFront: file
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            driverLicenseBack: file
        }));
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
        if (side === 'front') {
            setPreviewFront(event.target.result);
        } else {
            setPreviewBack(event.target.result);
        }
    };
    reader.readAsDataURL(file);

    // Clear error
    setErrors(prev => ({
        ...prev,
        [`driverLicense${side === 'front' ? 'Front' : 'Back'}`]: ''
    }));
}; import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

export default function KYCForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        driverLicenseFront: null,
        driverLicenseBack: null,
        nin: '',
        occupation: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [previewFront, setPreviewFront] = useState(null);
    const [previewBack, setPreviewBack] = useState(null);

    const handleFileChange = (e, side) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (side === 'front') {
            setFormData(prev => ({
                ...prev,
                driverLicenseFront: file
            }));
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewFront(event.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prev => ({
                ...prev,
                driverLicenseBack: file
            }));
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewBack(event.target.result);
            };
            reader.readAsDataURL(file);
        }

        setErrors(prev => ({
            ...prev,
            [`driverLicense${side === 'front' ? 'Front' : 'Back'}`]: ''
        }));
    };

    const validateStep = (currentStep) => {
        const newErrors = {};

        if (currentStep === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        } else if (currentStep === 2) {
            if (!formData.driverLicenseFront) {
                newErrors.driverLicenseFront = 'Driver\'s license front image is required';
            }
            if (!formData.driverLicenseBack) {
                newErrors.driverLicenseBack = 'Driver\'s license back image is required';
            }
            if (!formData.nin.trim()) newErrors.nin = 'NIN is required';
        } else if (currentStep === 3) {
            if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const handlePrev = () => {
        setStep(step - 1);
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = () => {
        if (validateStep(step)) {
            setSubmitted(true);
            console.log('Form submitted:', formData);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-100 rounded-full p-3">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Submission Successful!</h2>
                    <p className="text-gray-600 mb-6">Your KYC information has been submitted successfully.</p>
                    <div className="bg-gray-50 rounded p-4 mb-6 text-left">
                        <h3 className="font-semibold text-gray-800 mb-3">Submitted Information:</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                            <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                            <p><span className="font-medium">Driver's License Front:</span> {formData.driverLicenseFront?.name}</p>
                            <p><span className="font-medium">Driver's License Back:</span> {formData.driverLicenseBack?.name}</p>
                            <p><span className="font-medium">NIN:</span> {formData.nin}</p>
                            <p><span className="font-medium">Occupation:</span> {formData.occupation}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setSubmitted(false);
                            setStep(1);
                            setFormData({ firstName: '', lastName: '', driverLicenseNumber: '', nin: '', occupation: '' });
                        }}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Submit Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 py-8">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Step {step} of 3</span>
                        <span className="text-sm font-medium text-indigo-600">{Math.round((step / 3) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">KYC Verification</h1>
                <p className="text-gray-600 mb-6">Complete your identity verification</p>

                <div>
                    {/* Step 1: Personal Information */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter your first name"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter your last name"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Identification */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Identification Details</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Driver's License - Front
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, 'front')}
                                        className="hidden"
                                        id="driverLicenseFront"
                                    />
                                    <label
                                        htmlFor="driverLicenseFront"
                                        className={`flex items-center justify-center w-full px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition ${errors.driverLicenseFront ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-indigo-500 bg-gray-50 hover:bg-indigo-50'
                                            }`}
                                    >
                                        {previewFront ? (
                                            <img src={previewFront} alt="Front preview" className="max-h-40 max-w-full rounded" />
                                        ) : (
                                            <div className="text-center">
                                                <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                                                <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {errors.driverLicenseFront && (
                                    <p className="text-red-500 text-sm mt-1">{errors.driverLicenseFront}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Driver's License - Back
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, 'back')}
                                        className="hidden"
                                        id="driverLicenseBack"
                                    />
                                    <label
                                        htmlFor="driverLicenseBack"
                                        className={`flex items-center justify-center w-full px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition ${errors.driverLicenseBack ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-indigo-500 bg-gray-50 hover:bg-indigo-50'
                                            }`}
                                    >
                                        {previewBack ? (
                                            <img src={previewBack} alt="Back preview" className="max-h-40 max-w-full rounded" />
                                        ) : (
                                            <div className="text-center">
                                                <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                                                <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {errors.driverLicenseBack && (
                                    <p className="text-red-500 text-sm mt-1">{errors.driverLicenseBack}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Social Security Number (SSN)
                                </label>
                                <input
                                    type="text"
                                    name="nin"
                                    value={formData.nin}
                                    onChange={handleChange}
                                    placeholder="Enter your SSN"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.nin ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.nin && <p className="text-red-500 text-sm mt-1">{errors.nin}</p>}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Occupation */}
                    {step === 3 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Professional Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Occupation
                                </label>
                                <input
                                    type="text"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                    placeholder="Enter your occupation"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.occupation ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
                            </div>

                            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mt-6">
                                <p className="text-sm text-indigo-800">
                                    Please review your information before submitting. You can go back to edit any details.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 mt-8">
                        {step > 1 && (
                            <button
                                onClick={handlePrev}
                                className="flex items-center justify-center gap-2 flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </button>
                        )}

                        {step < 3 ? (
                            <button
                                onClick={handleNext}
                                className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                            >
                                <Check className="w-4 h-4" />
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}