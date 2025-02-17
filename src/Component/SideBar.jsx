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
  const [isUserOpen, setIsUserOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { href: "/home", label: "Home", icon: <AiFillHome /> },
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
    {
      label: "Users",
      icon: <AiOutlineUser />,
      isDropdown: true,
      subItems: [
        { href: "/users", label: "All Users", icon: <AiOutlineUser /> },
        {
          href: "/historyusers",
          label: "History Users",
          icon: <AiOutlineUser />,
        },
      ],
    },
    {
      href: "/transaction",
      label: "Transaction",
      icon: <AiOutlineTransaction />,
    },
    { href: "/guide", label: "Guide Book", icon: <AiFillBook /> },
    {
      href: "/settings",
      label: "Settings Profile",
      icon: <AiOutlineSetting />,
    },
  ];

  useEffect(() => {
    if (
      menuItems[2].subItems.some((sub) =>
        location.pathname.startsWith(sub.href)
      )
    ) {
      setIsProductOpen(true);
    }
    if (
      menuItems[4].subItems.some((sub) =>
        location.pathname.startsWith(sub.href)
      )
    ) {
      setIsUserOpen(true);
    }
  }, [location.pathname]);

  return (
    <main
      className={`flex ${
        isOpen ? "w-52" : "w-20"
      } transition-all duration-300 min-h-screen bg-white relative shadow-xl`}
    >
      <div className="flex flex-col w-full px-5 py-8 overflow-hidden">
        <a href="#" className="flex gap-2 items-center">
          <img
            src="https://i.pinimg.com/736x/e9/20/06/e92006c2fc56e0d6b0761dce065e708d.jpg"
            alt="Logo"
            className={`transition-all duration-300 rounded-full object-cover aspect-square ${
              isOpen ? "w-10" : "w-6"
            }`}
          />
          {isOpen && (
            <h1 className="font-poppins text-sm  font-semibold text-gray-800">
              Shineskin Skincare
            </h1>
          )}
        </a>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="flex-1 -mx-3 space-y-3">
            {menuItems.map((item, index) => {
              const isActive = item.isDropdown
                ? item.subItems.some((subItem) =>
                    location.pathname.startsWith(subItem.href)
                  )
                : location.pathname === item.href;

              return item.isDropdown ? (
                <div key={index}>
                  <button
                    onClick={() =>
                      item.label === "Product"
                        ? setIsProductOpen(!isProductOpen)
                        : setIsUserOpen(!isUserOpen)
                    }
                    className={`flex items-center w-full px-3 py-2 rounded-md transition-colors duration-300 ${
                      isActive
                        ? "bg-orange-500 text-white font-semibold"
                        : "text-gray-800 hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    {isOpen && (
                      <span className="mx-2 text-sm font-medium">
                        {item.label}
                      </span>
                    )}
                    {isOpen &&
                    (item.label === "Product" ? isProductOpen : isUserOpen) ? (
                      <FiChevronUp className="ml-auto" />
                    ) : (
                      <FiChevronDown className="ml-auto" />
                    )}
                  </button>
                  {(item.label === "Product" ? isProductOpen : isUserOpen) && (
                    <div className="ml-6 space-y-2 pt-3">
                      {item.subItems.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          className={`flex items-center px-3 py-2 rounded-md transition-colors duration-300 ${
                            location.pathname === subItem.href
                              ? "bg-orange-500 text-white font-semibold"
                              : "text-gray-800 hover:bg-orange-500 hover:text-white"
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
                <a
                  key={index}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "bg-orange-500 text-white font-semibold"
                      : "text-gray-800 hover:bg-orange-500 hover:text-white"
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
        <div className="flex justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`transition-all duration-300 absolute bottom-12 ${
              isOpen ? "w-48 h-8" : "w-14 h-8"
            } flex justify-center items-center bg-orange-500 text-white`}
          >
            {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
