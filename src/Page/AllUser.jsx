import React, { useState } from "react";
import Layout from "../Component/Layout"; // Assuming your layout component is here
import { Table, Input, Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const AllUser = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Sample user data
  const users = [
    {
      key: 1,
      name: "John Doe",
      alamat:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos itaque facilis nostrum unde necessitatibus architecto quia voluptates vitae consectetur tenetur.",
      role: "Distributor",
      phone: "08123456789",
    },
    {
      key: 2,
      name: "Jane Smith",
      alamat:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos itaque facilis nostrum unde necessitatibus architecto quia voluptates vitae consectetur tenetur.",
      role: "Reseler",
      phone: "08123456789",
    },
    {
      key: 3,
      name: "Emily Johnson",
      alamat:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos itaque facilis nostrum unde necessitatibus architecto quia voluptates vitae consectetur tenetur.",
      role: "Member",
      phone: "08123456789",
    },
    {
      key: 4,
      name: "Michael Brown",
      alamat:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos itaque facilis nostrum unde necessitatibus architecto quia voluptates vitae consectetur tenetur.",
      role: "Member",
      phone: "08123456789",
    },
  ];

  // Columns for the table
  const columns = [
    { title: "ID", dataIndex: "key", key: "key" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    { title: "Alamat", dataIndex: "alamat", key: "alamat" },
    { title: "Nomer Telpon", dataIndex: "phone", key: "phone" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Detail",
      key: "detail",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleViewDetail(record)}>
          View Detail
        </Button>
      ),
    },
  ];

  // Handle search input
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Open the modal with user details
  const handleViewDetail = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">All Users</h1>
        <p className="text-gray-600">
          Manage and view all users in the system.
        </p>
      </div>

      <div className="flex mb-4">
        <Input
          placeholder="Search users by name"
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          className="w-64"
        />
      </div>

      <Table
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 5 }}
      />

      {/* User Detail Modal */}
      <Modal
        title="User Detail"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedUser && (
          <div>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Alamat:</strong> {selectedUser.alamat}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default AllUser;
