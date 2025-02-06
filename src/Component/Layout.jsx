import React from "react";
import Sidebar from "./SideBar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>

      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Content Wrapper */}
        <div className="flex-1 p-6 bg-white shadow-md rounded-md m-6">
          {children}
        </div>
      </div>
        
     
    </div>
  );
};

export default Layout;
