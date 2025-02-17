import React, { useEffect, useState } from "react";
import Layout from "../../Component/Layout";
import SearchCategory from "../../Component/CompnCategory/SearchCategory";
import CategoryTable from "../../Component/CompnCategory/CategoryTable";
import EditCategoryModal from "../../Component/CompnCategory/EditCategoryModal";
import { Modal, Form, Input, message } from "antd";
import axiosInstance from "../../../axiosInstance";

const CategoryProduct = () => {
  const [categories, setCategories] = useState([]); // State untuk menyimpan daftar kategori
  const [searchText, setSearchText] = useState(""); // State pencarian kategori
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal tambah kategori
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Modal edit kategori
  const [currentCategory, setCurrentCategory] = useState(null); // Data kategori yang sedang diedit
  const [form] = Form.useForm();

  // 🔥 Fetch all categories saat pertama kali halaman dimuat
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category");
      console.log("API Response:", response.data.data); // 🔍 Cek hasil API
      setCategories(response.data.data);
    } catch (error) {
      message.error("Failed to fetch categories");
    }
  };

  // ✅ Tambah atau Update kategori ke database
  const handleSaveCategory = async (values) => {
    try {
      if (isEditModalVisible && currentCategory) {
        // 🔄 UPDATE KATEGORI
        await axiosInstance.put(
          `/update/category/${currentCategory.id}`,
          values
        );
        message.success("Category updated successfully");
      } else {
        // ✅ CREATE KATEGORI BARU
        await axiosInstance.post("/create/category", values);
        message.success("Category added successfully");
      }
      fetchCategories(); // Refresh data kategori
      setIsModalVisible(false);
      setIsEditModalVisible(false);
    } catch (error) {
      message.error("Failed to save category");
    }
  };

  // ✅ Hapus kategori
  const handleDeleteCategory = async (id) => {
    try {
      await axiosInstance.delete(`/delete/category/${id}`);
      message.success("Category deleted successfully");
      fetchCategories(); // Refresh data kategori setelah dihapus
    } catch (error) {
      message.error("Failed to delete category");
    }
  };

  // ✅ Filter kategori berdasarkan pencarian
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-gray-800">Kategori Produk</h1>
      <p className="font-poppins text-sm text-gray-800 mb-6">
        Filter kategori berdasarkan pencarian
      </p>

      {/* 🔍 Komponen Search */}
      <SearchCategory
        searchText={searchText}
        setSearchText={setSearchText}
        setIsModalVisible={setIsModalVisible}
        exportToExcel={() => console.log("Export Excel")}
      />

      {/* 📋 Tabel Kategori */}
      <CategoryTable
        categories={filteredCategories}
        handleEdit={(record) => {
          setCurrentCategory(record); // Set kategori yang akan diedit
          setIsEditModalVisible(true); // Buka modal edit
          form.setFieldsValue({ name: record.name }); // Set nilai form edit
        }}
        handleDeleteCategory={handleDeleteCategory}
      />

      {/* ➕ Modal Tambah Kategori */}
      <Modal
        title="Tambah Kategori"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleSaveCategory}>
          <Form.Item
            label="Nama Kategori"
            name="name"
            rules={[{ required: true, message: "Nama kategori harus diisi" }]}
          >
            <Input />
          </Form.Item>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 px-4 rounded"
          >
            Simpan
          </button>
        </Form>
      </Modal>

      {/* ✏ Modal Edit Kategori */}
      <EditCategoryModal
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        handleEditCategory={handleSaveCategory}
        currentCategory={currentCategory}
        form={form}
      />
    </Layout>
  );
};

export default CategoryProduct;
