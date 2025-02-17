import React, { useState } from "react";
import { Table, Select } from "antd";
import Layout from "../../Component/Layout";

const { Option } = Select;

const HistoryUser = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
    },
  ];

  const allData = [
    {
      key: "1",
      userName: "John Doe",
      productName: "Face Cream",
      quantity: 2,
      price: 20.99,
      purchaseDate: "2024-02-09",
    },
    {
      key: "2",
      userName: "John Doe",
      productName: "Sunscreen Lotion",
      quantity: 1,
      price: 15.49,
      purchaseDate: "2024-02-09",
    },
    {
      key: "3",
      userName: "Jane Smith",
      productName: "Moisturizer",
      quantity: 3,
      price: 35.99,
      purchaseDate: "2024-02-08",
    },
    {
      key: "4",
      userName: "Jane Smith",
      productName: "Face Wash",
      quantity: 2,
      price: 12.99,
      purchaseDate: "2024-02-08",
    },
    {
      key: "5",
      userName: "Michael Johnson",
      productName: "Serum",
      quantity: 1,
      price: 40.99,
      purchaseDate: "2024-02-07",
    },
    {
      key: "6",
      userName: "Michael Johnson",
      productName: "Toner",
      quantity: 2,
      price: 18.99,
      purchaseDate: "2024-02-07",
    },
  ];

  const uniqueUsers = [...new Set(allData.map((item) => item.userName))];
  const filteredData = selectedUser
    ? allData.filter((item) => item.userName === selectedUser)
    : [];

  return (
    <Layout>
      <div style={{ padding: 20 }}>
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">History Transaction User</h1>
          <p className="text-gray-600">
            Manage and view transaction users in the system.
          </p>
        </div>
        <Select
          placeholder="Select a user"
          style={{ width: 200, marginBottom: 20 }}
          onChange={(value) => setSelectedUser(value)}
        >
          {uniqueUsers.map((user) => (
            <Option key={user} value={user}>
              {user}
            </Option>
          ))}
        </Select>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </Layout>
  );
};

export default HistoryUser;
