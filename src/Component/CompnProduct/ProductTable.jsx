import React from "react";
import { Table, Button } from "antd";

const ProductTable = ({ products, handleEdit, handleDeleteProduct }) => {
  const columns = [
    { title: "ID", dataIndex: "key", key: "key" },
    { title: "Nama Produk", dataIndex: "name", key: "name" },
    { title: "Kategori", dataIndex: "category", key: "category" },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      render: (text) => `Rp ${text.toLocaleString()}`,
    },
    { title: "Stok", dataIndex: "stock", key: "stock" },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-4">
          <button
            onClick={() => handleEdit(record)}
            className="font-poppins text-sm bg- w-16 h-6 bg-orange-500 rounded-md hover:bg-orange-600 flex items-center justify-center gap-2 text-white"
          >
            Edit
          </button>

          <button
            onClick={() => handleDeleteProduct(record.key)}
            className="font-poppins text-sm bg- w-16 h-6 bg-red-500 rounded-md hover:bg-red-600 flex items-center justify-center gap-2 text-white"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={products}
      pagination={{ pageSize: 8 }}
      rowKey="key"
    />
  );
};

export default ProductTable;
