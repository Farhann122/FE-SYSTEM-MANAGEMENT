import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import Layout from "../../Component/Layout";

const ProductOut = () => {
  const [products] = useState([
    {
      key: 1,
      name: "Laptop Dell",
      category: "Elektronik",
      price: 15000000,
      stock: 2, // Sisa stok setelah pengeluaran
      outHistory: [{ date: "2024-02-10", quantity: 3 }],
    },
    {
      key: 2,
      name: "iPhone 13",
      category: "Smartphone",
      price: 17000000,
      stock: 1,
      outHistory: [
        { date: "2024-01-15", quantity: 2 },
        { date: "2024-02-05", quantity: 2 },
      ],
    },
  ]);

  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Konfigurasi kolom tabel
  const columns = [
    { title: "Nama Produk", dataIndex: "name", key: "name" },
    { title: "Kategori", dataIndex: "category", key: "category" },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      render: (price) => `Rp ${price.toLocaleString()}`,
    },
    { title: "Sisa Stok", dataIndex: "stock", key: "stock" },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Button
          type="default"
          className="bg-orange-500 border-orange-500 text-white hover:bg-orange-400"
          onClick={() => {
            setCurrentProduct(record);
            setIsHistoryModalVisible(true);
          }}
        >
          Lihat Riwayat
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Riwayat Produk Keluar
      </h1>

      {/* Tabel Produk */}
      <Table
        dataSource={products}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />

      {/* Modal Riwayat Pengeluaran */}
      <Modal
        title={`Riwayat Pengeluaran - ${currentProduct?.name}`}
        open={isHistoryModalVisible}
        onCancel={() => setIsHistoryModalVisible(false)}
        footer={null}
      >
        {currentProduct ? (
          <ul className="list-disc pl-6">
            {currentProduct.outHistory.map((history, index) => (
              <li key={index}>
                {history.date} - Jumlah Keluar: {history.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada riwayat pengeluaran.</p>
        )}
      </Modal>
    </Layout>
  );
};

export default ProductOut;
