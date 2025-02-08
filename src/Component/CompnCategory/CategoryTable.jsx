import React from "react";
import { Table } from "antd";

const CategoryTable = ({ categories, handleEdit, handleDeleteCategory }) => {
  const columns = [
    { title: "ID", dataIndex: "key", key: "key" },
    { title: "Nama Kategori", dataIndex: "name", key: "name" },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          {/* Tombol Edit */}
          <button
            onClick={() => handleEdit(record)}
            className="font-poppins text-sm w-16 h-7 bg-orange-500 rounded-md hover:bg-orange-400 flex items-center justify-center text-white"
          >
            Edit
          </button>

          {/* Tombol Delete */}
          <button
            onClick={() => handleDeleteCategory(record.key)}
            className="font-poppins text-sm w-16 h-7 bg-red-500 rounded-md hover:bg-red-400 flex items-center justify-center text-white"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={categories} rowKey="key" />;
};

export default CategoryTable;
