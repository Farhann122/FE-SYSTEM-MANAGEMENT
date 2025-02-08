import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Page/Dashboard";
import Home from "./Page/Home";
import AllUser from "./Page/AllUser";
import GuideBook from "./Page/GuideBook";
import Transaction from "./Page/Transaction";
import SettingsProfile from "./Page/SettingsProfile";
import ManagementProduct from "./Page/Product/ManagementProduct";
import ProductIn from "./Page/Product/ProductIn";
import ProductOut from "./Page/Product/ProductOut";
import CategoryProduct from "./Page/Category/CategoryProduct";
import Login from "./Page/Login/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/managementproduct" element={<ManagementProduct />} />
      <Route path="/users" element={<AllUser />} />
      <Route path="/guide" element={<GuideBook />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/settings" element={<SettingsProfile />} />
      <Route path="/productin" element={<ProductIn />} />
      <Route path="/productout" element={<ProductOut />} />
      <Route path="/category" element={<CategoryProduct />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
