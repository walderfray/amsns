import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import GetStarted from "./components/GetStarted";
import Kyc from "./components/Kyc";
import StatusCorrection from "./components/StatusCorrection";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/GetStarted" element={<GetStarted />} />
        <Route path="/Kyc" element={<Kyc />} />
        <Route path="/StatusCorrection" element={<StatusCorrection />} />
      </Routes>
    </BrowserRouter>
  );
}
