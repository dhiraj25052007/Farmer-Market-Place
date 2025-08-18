import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import React from "react";

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-green-300 to-lime-300 overflow-hidden">
      {/* Fixed Navbar */}
      <NavBar className=" fixed flex-shrink-0" />

      {/* Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Fixed Footer */}
      <Footer className=" fixed flex-shrink-0" />
    </div>
  );
}
