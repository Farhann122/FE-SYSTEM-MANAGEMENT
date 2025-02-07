import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import Layout from "../../Component/Layout";

const ProductIn = () => {
  const [products] = useState([
    {
      key: 1,
      name: "Laptop Dell",
      category: "Elektronik",
      price: 15000000,
      stock: 10,
      arrivalHistory: [{ date: "2024-02-01", addedStock: 10 }],
    },
    {
      key: 2,
      name: "iPhone 13",
      category: "Smartphone",
      price: 17000000,
      stock: 5,
      arrivalHistory: [
        { date: "2024-01-28", addedStock: 3 },
        { date: "2024-02-05", addedStock: 2 },
      ],
    },
  ]);

  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Konfigurasi kolom untuk Ant Design Table
  const columns = [
    {
      title: "Nama Produk",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      render: (price) => `Rp ${price.toLocaleString()}`,
    },
    {
      title: "Stok",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
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
        Riwayat Kedatangan Produk
      </h1>

      <Table
        dataSource={products}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />

      {/* Modal untuk menampilkan riwayat kedatangan produk */}
      <Modal
        title={`Riwayat Kedatangan - ${currentProduct?.name}`}
        open={isHistoryModalVisible}
        onCancel={() => setIsHistoryModalVisible(false)}
        footer={null}
      >
        {currentProduct ? (
          <ul className="list-disc pl-6">
            {currentProduct.arrivalHistory.map((history, index) => (
              <li key={index}>
                {history.date} - Tambah Stok: {history.addedStock}
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada data riwayat kedatangan.</p>
        )}
      </Modal>
    </Layout>
  );
};

export default ProductIn;
