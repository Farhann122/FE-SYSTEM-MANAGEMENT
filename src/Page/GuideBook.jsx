import React from "react";
import Layout from "../Component/Layout";

const GuideBook = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Panduan Penggunaan Sistem
        </h1>
        <p className="text-gray-600">
          Berikut adalah panduan lengkap untuk memahami dan menggunakan sistem
          ini.
        </p>
      </div>

      {/* Bagian Panduan Umum */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Panduan Umum</h2>
        <p className="text-gray-700 mt-2">
          Sistem ini dirancang untuk membantu Anda mengelola produk, pengguna,
          transaksi, dan berbagai data lainnya dengan mudah.
        </p>
      </div>

      {/* Langkah-langkah Menggunakan Fitur */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Langkah-langkah Menggunakan Fitur
        </h2>
        <ol className="list-decimal pl-5 text-gray-700 mt-2">
          <li className="mb-2">
            <strong>Login</strong> ke akun Anda dengan username dan password
            yang sudah terdaftar.
          </li>
          <li className="mb-2">
            <strong>Dashboard</strong>: Di sini Anda bisa melihat statistik dan
            ringkasan data seperti pengguna, produk, dan transaksi.
          </li>
          <li className="mb-2">
            <strong>Manajemen Produk</strong>: Untuk menambah, mengedit, dan
            menghapus produk. Anda bisa melihat daftar produk, harga, stok, dan
            kategori.
          </li>
          <li className="mb-2">
            <strong>Manajemen Pengguna</strong>: Mengelola pengguna yang
            terdaftar dalam sistem ini. Anda dapat menambah, mengedit, atau
            menghapus pengguna.
          </li>
          <li className="mb-2">
            <strong>Pengaturan</strong>: Sesuaikan pengaturan akun Anda seperti
            profil dan preferensi sistem.
          </li>
        </ol>
      </div>

      {/* FAQ */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Tanya Jawab (FAQ)
        </h2>

        <div className="mt-4">
          <p className="font-semibold text-gray-800">
            Q: Bagaimana cara menambah produk?
          </p>
          <p className="text-gray-700">
            A: Untuk menambah produk, buka menu "Manajemen Produk" dan klik
            tombol "Tambah Produk". Isi form dengan nama, kategori, harga, dan
            stok produk, lalu klik "Simpan".
          </p>
        </div>

        <div className="mt-4">
          <p className="font-semibold text-gray-800">
            Q: Apakah saya bisa mengedit data pengguna?
          </p>
          <p className="text-gray-700">
            A: Ya, Anda dapat mengedit data pengguna melalui menu "Manajemen
            Pengguna". Cari pengguna yang ingin diedit dan klik ikon edit.
          </p>
        </div>

        <div className="mt-4">
          <p className="font-semibold text-gray-800">
            Q: Apa yang harus dilakukan jika saya lupa password?
          </p>
          <p className="text-gray-700">
            A: Anda dapat mengklik tombol "Lupa Password" pada halaman login
            untuk melakukan reset password melalui email.
          </p>
        </div>
      </div>

      {/* Kontak Bantuan */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Kontak Bantuan</h2>
        <p className="text-gray-700 mt-2">
          Jika Anda memerlukan bantuan lebih lanjut, jangan ragu untuk
          menghubungi tim kami melalui email di{" "}
          <strong>support@sistem.com</strong> atau hubungi nomor{" "}
          <strong>+62 123 456 789</strong>.
        </p>
      </div>
    </Layout>
  );
};

export default GuideBook;
