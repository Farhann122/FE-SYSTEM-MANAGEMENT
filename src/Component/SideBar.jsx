import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import {
  AiFillBook,
  AiFillDashboard,
  AiFillHome,
  AiFillProduct,
  AiOutlineSetting,
  AiOutlineTransaction,
  AiOutlineUser,
} from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Icon for toggle
import logo from "../assets/logo.png";

const Sidebar = () => {
  // State untuk toggle sidebar
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation(); // Dapatkan path saat ini

  const menuItems = [
    { href: "/", label: "Home", icon: <AiFillHome /> },
    { href: "/dashboard", label: "Dashboard", icon: <AiFillDashboard /> },
    { href: "/product", label: "Product", icon: <AiFillProduct /> },
    { href: "/users", label: "Users", icon: <AiOutlineUser /> },
    { href: "/guide", label: "Guide Book", icon: <AiFillBook /> },
    { href: "/transaction", label: "Transaction", icon: <AiOutlineTransaction /> },
    { href: "/settings", label: "Settings Profile", icon: <AiOutlineSetting /> },
  ];

  return (
    <main
      className={`flex ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 min-h-screen bg-zinc-800 relative`}
    >
      <div className="flex flex-col w-full px-5 py-8 overflow-hidden">
        {/* Logo */}
        <a href="#">
          <img
            src={logo}
            alt="Logo"
            className={`transition-all duration-300 ${isOpen ? "" : "w-6"}`}
          />
        </a>

        {/* Menu Navigasi */}
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="flex-1 -mx-3 space-y-3">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.href; // Cek apakah menu aktif
              return (
                <a
                  key={index}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "bg-white text-black font-semibold" // Style aktif
                      : "text-white hover:bg-white hover:text-black"
                  }`}
                >
                  {item.icon}
                  {isOpen && (
                    <span className="mx-2 text-sm font-medium">
                      {item.label}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Tombol Toggle Sidebar */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={` transition-all duration-300 absolute bottom-8 ${
              isOpen ? "w-48 h-8" : " w-14 h-8"
            } flex justify-center items-center bg-gray-700 text-white`}
          >
            {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
