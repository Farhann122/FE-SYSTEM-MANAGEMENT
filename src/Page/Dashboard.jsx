import React from "react";
import Layout from "../Component/Layout";
import { FiUsers, FiBox, FiShoppingCart, FiPackage } from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";

// Registrasi komponen Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Title);

const Dashboard = () => {
  // Labels manual untuk bulan
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Pendapatan",
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 50, 65], // Sesuaikan dengan jumlah label
        backgroundColor: "rgba(255, 165, 0, 0.5)",
        borderColor: "rgb(255, 165, 0)",
        borderWidth: 1,
      },
    ],
  };

  const weeklyLabels = ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"];

  const weeklyData = {
    labels: weeklyLabels,
    datasets: [
      {
        label: "Pendapatan Mingguan",
        data: [15, 20, 18, 25], // Sesuaikan dengan data aktual
        backgroundColor: "rgba(255, 165, 0, 0.5)", // Orange transparan
        borderColor: "rgb(255, 165, 0)", // Orange solid
        borderWidth: 1,
      },
    ],
  };

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Dashboard Admin
        </h1>
        <p className="text-gray-600">
          Pantau data dan aktivitas terbaru di sistem.
        </p>
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
          <FiPackage className="text-red-600 text-4xl" />
          <div>
            <h2 className="text-gray-600">Total Kategori</h2>
            <p className="text-2xl font-semibold text-gray-800">152</p>
          </div>
        </div>
      </div>

      {/* Grafik Pendapatan */}
      <div className="bg-white p-6 rounded-xl shadow-md mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Grafik Pendapatan Bulanan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {/* Grafik 1 */}
          {/* Grafik Pendapatan Mingguan */}
          <div className="p-4 rounded-lg shadow-sm">
            <h3 className="text-md font-semibold text-gray-600 mb-2 text-center">
              Pendapatan Bulan Ini
            </h3>
            <div className="w-full h-80 flex justify-center pt-6">
              <Bar data={weeklyData} />
            </div>
          </div>

          {/* Grafik 2 */}
          <div className=" p-4 rounded-lg shadow-sm">
            <h3 className="text-md font-semibold text-gray-600 mb-2 text-center">
              Pendapatan Tahun Ini
            </h3>
            <div className="w-full h-80 items-center flex justify-center pt-6">
              <Bar data={data} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
