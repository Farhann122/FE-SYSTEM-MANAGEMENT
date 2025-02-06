import React from "react";
import Layout from "../Component/Layout";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center h-full">
        <h1 className="text-4xl font-pacifico text-gray-800">
          Selamat Datang di Management System Shineskin !
        </h1>
        <p className="text-lg font-poppins text-gray-600 mt-2 max-w-xl">
          Disini anda dapat mengontrol sebuah bisnis anda dengan mudah, sebelum
          menggunakan sistem ini alangkah lebih baik membaca dokumentasi untuk menggunakan sistem ini.
        </p>

        {/* CTA Button */}
        <div className="mt-6">
          <button className="px-6 py-3 text-lg font-medium text-white bg-zinc-800 rounded-lg shadow-lg hover:bg-zinc-600 transition-all">
            Baca Sekarang
          </button>
        </div>

        {/* Ilustrasi atau Gambar */}
        {/* <div className="mt-8">
          <img
            src="https://source.unsplash.com/600x400/?technology"
            alt="Welcome Illustration"
            className="rounded-lg shadow-lg"
          />
        </div> */}
      </div>
    </Layout>
  );
};

export default Home;
