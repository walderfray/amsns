import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cloud from '../images/Cloud.jpg';
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Must be at least 6 characters").required("Password is required"),
    });

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-center bg-cover relative"
            style={{
                backgroundImage: `url(${Cloud})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Login Form */}
            <div className="relative bg-white p-8 rounded-xl w-full max-w-md mx-4 md:mx-0 max-w-xl shadow-xl">
                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log("Login Data:", values);
                    }}
                >
                    <Form className="grid gap-4">
                        <div className="grid gap-1">
                            <label className="text-sm font-medium">Email</label>
                            <Field
                                name="email"
                                type="email"
                                className="border rounded-md p-4 w-full"
                                placeholder="Enter your email"
                            />
                            <ErrorMessage
                                name="email"
                                component="p"
                                className="text-red-600 text-sm"
                            />
                        </div>

                        <div className="grid gap-1">
                            <label className="text-sm font-medium">Password</label>
                            <div className="relative">
                                <Field
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="border rounded-md p-4 w-full pr-10"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <ErrorMessage
                                name="password"
                                component="p"
                                className="text-red-600 text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-800 text-white p-4 rounded-lg hover:bg-blue-700 transition w-full mt-2"
                        >
                            Login
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
