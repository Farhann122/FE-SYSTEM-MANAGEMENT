import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  AiFillBook,
  AiFillDashboard,
  AiFillHome,
  AiOutlineSetting,
  AiOutlineTransaction,
  AiOutlineUser,
} from "react-icons/ai";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { FaBoxOpen, FaBox } from "react-icons/fa";
import logo from "../assets/logo.png";
import { BiCategory } from "react-icons/bi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { href: "/", label: "Home", icon: <AiFillHome /> },
    { href: "/dashboard", label: "Dashboard", icon: <AiFillDashboard /> },
    {
      label: "Product",
      icon: <MdOutlineCategory />,
      isDropdown: true,
      subItems: [
        {
          href: "/managementproduct",
          label: "Management Product",
          icon: <FaBox />,
        },
        { href: "/productin", label: "Product Masuk", icon: <FaBoxOpen /> },
        { href: "/productout", label: "Product Keluar", icon: <FaBox /> },
      ],
    },

    { href: "/category", label: "Category Product", icon: <BiCategory /> },
    { href: "/users", label: "Users", icon: <AiOutlineUser /> },
    { href: "/guide", label: "Guide Book", icon: <AiFillBook /> },
    {
      href: "/transaction",
      label: "Transaction",
      icon: <AiOutlineTransaction />,
    },
    {
      href: "/settings",
      label: "Settings Profile",
      icon: <AiOutlineSetting />,
    },
  ];

  // Toggle submenu based on current path
  useEffect(() => {
    if (
      menuItems[2].subItems.some((sub) =>
        location.pathname.startsWith(sub.href)
      )
    ) {
      setIsProductOpen(true);
    }
  }, [location.pathname]);

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
              const isActive = item.isDropdown
                ? item.subItems.some((subItem) =>
                    location.pathname.startsWith(subItem.href)
                  )
                : location.pathname === item.href;

              return item.isDropdown ? (
                // Dropdown menu untuk Product
                <div key={index}>
                  <button
                    onClick={() => setIsProductOpen(!isProductOpen)}
                    className={`flex items-center w-full px-3 py-2 rounded-md transition-colors duration-300 ${
                      isActive
                        ? "bg-white text-black font-semibold"
                        : "text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    {item.icon}
                    {isOpen && (
                      <span className="mx-2 text-sm font-medium">
                        {item.label}
                      </span>
                    )}
                    {isOpen &&
                      (isProductOpen ? (
                        <FiChevronUp className="ml-auto" />
                      ) : (
                        <FiChevronDown className="ml-auto" />
                      ))}
                  </button>

                  {/* Submenu untuk Product */}
                  {isProductOpen && (
                    <div className="ml-6 space-y-2 pt-3">
                      {item.subItems.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          className={`flex items-center px-3 py-2 rounded-md transition-colors duration-300 ${
                            location.pathname === subItem.href
                              ? "bg-white text-black font-semibold"
                              : "text-white hover:bg-white hover:text-black"
                          }`}
                        >
                          {subItem.icon}
                          {isOpen && (
                            <span className="mx-2 text-sm font-medium">
                              {subItem.label}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Item menu biasa
                <a
                  key={index}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "bg-white text-black font-semibold"
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
            className={`transition-all duration-300 absolute bottom-12 ${
              isOpen ? "w-48 h-8" : "w-14 h-8"
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
