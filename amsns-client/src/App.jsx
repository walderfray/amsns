import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import GetStarted from "./pages/GetStarted";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Kyc from "./pages/Kyc";
import PrivateTrustPage from "./pages/PrivateTrustPage";
import StatusCorrectionPage from "./pages/StatusCorrectionPage";

import Toast from "./components/Toast";
import ProtectedRoute from "./components/ProtectedRoute";

import { useUserQuery } from "./hooks/useAuth";

export default function App() {
  useUserQuery();

  return (
    <BrowserRouter>
      <Navbar />
      <Toast />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/private-trust" element={<PrivateTrustPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<GetStarted />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* authed pages  */}
        <Route
          path="/kyc"
          element={
            <ProtectedRoute>
              <Kyc />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StatusCorrectionPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
