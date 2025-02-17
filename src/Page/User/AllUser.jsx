import React, { useState, useEffect } from "react";
import Layout from "../../Component/Layout";
import { Table, Input, Button, Modal, Form, Select, message } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import axiosInstance from "../../../axiosInstance"; // Gunakan axiosInstance untuk API

const { Option } = Select;

const AllUser = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();

  // Fetch all users from API saat pertama kali masuk halaman
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users"); // Sesuaikan dengan URL backend Anda
      setUsers(response.data.data); // Simpan data users dari API
    } catch (error) {
      message.error("Failed to fetch users");
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Show modal for Add/Edit User
  const showModal = (user = null) => {
    setIsModalVisible(true);
    setIsEditMode(!!user);
    setSelectedUser(user);
    form.setFieldsValue(
      user || { fullname: "", address: "", role: "", phoneNumber: "" }
    );
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    form.resetFields();
  };

  // Save (Create/Update) user
  const handleSaveUser = () => {
    form.validateFields().then(async (values) => {
      try {
        if (isEditMode && selectedUser) {
          // UPDATE USER
          await axiosInstance.put(`/update/user/${selectedUser.id}`, values);
          message.success("User updated successfully");
        } else {
          // CREATE USER
          await axiosInstance.post("/create/user", values);
          message.success("User added successfully");
        }
        fetchUsers(); // Refresh data users
        handleCloseModal();
      } catch (error) {
        message.error("Failed to save user");
      }
    });
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      await axiosInstance.delete(`/delete/user/${id}`);
      message.success("User deleted successfully");
      fetchUsers(); // Refresh data
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  // Kolom tabel
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        record.fullname.toLowerCase().includes(value.toLowerCase()),
    },
    { title: "Alamat", dataIndex: "address", key: "address" },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="gap-2 flex">
          <button
            onClick={() => showModal(record)}
            className="bg-orange-500 hover:bg-orange-400 text-white w-20 rounded-md"
          >
            <PlusOutlined /> Edit
          </button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteUser(record.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">All Users</h1>
        <p className="text-gray-600">
          Manage and view all users in the system.
        </p>
      </div>

      <div className="flex mb-4 gap-3">
        <Input
          placeholder="Search users by name"
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          className="w-64"
        />

        <button
          onClick={() => showModal()}
          className="bg-orange-500 hover:bg-orange-400 text-white w-28 text-sm rounded-md"
        >
          <PlusOutlined /> Add User
        </button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 5 }}
      />

      {/* Modal Tambah & Edit User */}
      <Modal
        title={isEditMode ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onOk={handleSaveUser}
        okText={isEditMode ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select role">
              <Option value="Distributor">Distributor</Option>
              <Option value="Reseller">Reseller</Option>
              <Option value="Member">Member</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AllUser;
