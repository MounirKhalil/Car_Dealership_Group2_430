import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import CarSection from "./components/viewall/CarSection";
import Landing from "./components/landing/Landing";
import AdminPanel from "./components/admin/landing/AdminPanel";
import Profile from "./components/profile/Profile";

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        /*<Route path="/admin" element={<AdminPanel />} /> 
        <Route path="/ViewCars" element={<CarSection />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
