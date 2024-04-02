import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Team from "./pages/Team";
import CreateUserForm from "./components/CreateUserForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <>
      <Navbar setIsFormOpen={setIsFormOpen} />
      {isFormOpen && <CreateUserForm setIsFormOpen={setIsFormOpen} />}
      <ToastContainer className="fixed top-[10vh]" />
      <div className="h-[13vh]"></div>
      <div className="w-[95%] m-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
