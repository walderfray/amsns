import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersList from "./pages/admin/UsersList";
import UserDetails from "./pages/admin/UserDetails";
import NotFound from "./pages/NotFound";

import Toast from "./components/Toast";
import ProtectedRoute from "./components/ProtectedRoute";

import { useUserQuery } from "./hooks/useAuth";

export default function App() {
  useUserQuery();

  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
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
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/:uid" element={<UserDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
