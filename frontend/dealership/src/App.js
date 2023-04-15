import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import CarSection from "./components/viewall/CarSection";
import Landing from "./components/landing/Landing";
import AdminPanel from "./components/admin/landing/AdminPanel";

function App() {
  // const handleSignIn = async (email, password) => {
  //   try {
  //     const response = await fetch("/signin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     const data = await response.json();
  //     const token = data.token;
  //     const decodedToken = JSON.parse(atob(token.split(".")[1]));
  //     const user = decodedToken.user;
  //     if (data.admin) {
  //       setUser({ ...user, isAdmin: true });
  //     } else {
  //       setUser(user);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSignOut = () => {
  //   setUser(null);
  // };

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/ViewCars" element={<CarSection />} />
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
