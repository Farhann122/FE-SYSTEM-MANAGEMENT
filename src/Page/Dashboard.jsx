import React from "react";
import Layout from "../Component/Layout";
import { Table } from "antd";
import { FiUsers, FiBox, FiShoppingCart, FiTrendingUp } from "react-icons/fi";

const Dashboard = () => {
 
  

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard Admin</h1>
        <p className="text-gray-600">Pantau data dan aktivitas terbaru di sistem.</p>
      </div>

      {/* Statistik Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <FiUsers className="text-blue-600 text-4xl" />
          <div>
            <h2 className="text-gray-600">Total Pengguna</h2>
            <p className="text-2xl font-semibold text-gray-800">1,245</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <FiBox className="text-green-600 text-4xl" />
          <div>
            <h2 className="text-gray-600">Total Produk</h2>
            <p className="text-2xl font-semibold text-gray-800">320</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <FiShoppingCart className="text-orange-600 text-4xl" />
          <div>
            <h2 className="text-gray-600">Total Transaksi</h2>
            <p className="text-2xl font-semibold text-gray-800">10,453</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <FiTrendingUp className="text-red-600 text-4xl" />
          <div>
            <h2 className="text-gray-600">Aktivitas Hari Ini</h2>
            <p className="text-2xl font-semibold text-gray-800">152</p>
          </div>
        </div>
      </div>

      {/* Grafik Placeholder (Tambahkan Recharts atau Chart.js jika perlu) */}
      <div className="bg-white p-6 rounded-xl shadow-md mt-6 h-48 flex items-center justify-center">
        <p className="text-gray-600">[Grafik Aktivitas Akan Ditampilkan di Sini]</p>
      </div>

      {/* Tabel Data Pengguna */}
     
    </Layout>
  );
};

export default Dashboard;
