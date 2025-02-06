import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Page/Dashboard";
import Home from "./Page/Home";
import Product from "./Page/Product";
import AllUser from "./Page/AllUser";
import GuideBook from "./Page/GuideBook";
import Transaction from "./Page/Transaction";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/product" element={<Product />} />
      <Route path="/users" element={<AllUser />} />
      <Route path="/guide" element={<GuideBook />} />
      <Route path="/transaction" element={<Transaction />} />
    </Routes>
  );
};

export default App;
