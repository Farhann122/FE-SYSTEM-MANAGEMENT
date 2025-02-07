import React from "react";
import { Table, Button } from "antd";

const ProductTable = ({
  products,
  handleEdit,
  handleOpenHistory,
  handleDeleteProduct,
}) => {
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
        <div>
          <Button
            onClick={() => handleEdit(record)}
            type="primary"
            size="small"
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>

          <Button
            onClick={() => handleDeleteProduct(record.key)}
            type="danger"
            size="small"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={products} rowKey="key" />;
};

export default ProductTable;
