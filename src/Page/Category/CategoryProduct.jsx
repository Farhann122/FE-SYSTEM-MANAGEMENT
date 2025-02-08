import React, { useState } from "react";
import Layout from "../../Component/Layout";
import SearchCategory from "../../Component/CompnCategory/SearchCategory";
import CategoryTable from "../../Component/CompnCategory/CategoryTable";
import EditCategoryModal from "../../Component/CompnCategory/EditCategoryModal";
import { Modal, Form, Input } from "antd";

const CategoryProduct = () => {
  // State untuk menyimpan daftar kategori
  const [categories, setCategories] = useState([
    { key: 1, name: "Elektronik" },
    { key: 2, name: "Fashion" },
    { key: 3, name: "Makanan & Minuman" },
  ]);

  // State pencarian kategori
  const [searchText, setSearchText] = useState("");

  // State modal tambah kategori
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State modal edit kategori
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  // Fungsi untuk menambahkan kategori baru
  const handleAddCategory = (values) => {
    const newCategory = { key: categories.length + 1, name: values.name };
    setCategories([...categories, newCategory]);
    setIsModalVisible(false);
  };

  // Fungsi untuk mengedit kategori
  const handleEditCategory = (values) => {
    setCategories(
      categories.map((category) =>
        category.key === currentCategory.key
          ? { ...category, name: values.name }
          : category
      )
    );
    setIsEditModalVisible(false);
  };

  // Fungsi untuk menghapus kategori
  const handleDeleteCategory = (key) => {
    setCategories(categories.filter((category) => category.key !== key));
  };

  // Filter kategori berdasarkan pencarian
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-gray-800 ">
        Kategori Produk
      </h1>
      <p className="font-poppins text-sm text-gray-600 mb-6">Filter kategori berdasarkan pencarian</p>

      {/* Komponen Search */}
      <SearchCategory
        searchText={searchText}
        setSearchText={setSearchText}
        setIsModalVisible={setIsModalVisible}
        exportToExcel={() => console.log("Export Excel")}
      />

      {/* Tabel Kategori */}
      <CategoryTable
        categories={filteredCategories}
        handleEdit={(record) => {
          setCurrentCategory(record);
          setIsEditModalVisible(true);
        }}
        handleDeleteCategory={handleDeleteCategory}
      />

      {/* Modal Tambah Kategori */}
      <Modal
        title="Tambah Kategori"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddCategory}>
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

      {/* Modal Edit Kategori */}
      <EditCategoryModal
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        handleEditCategory={handleEditCategory}
        currentCategory={currentCategory}
      />
    </Layout>
  );
};

export default CategoryProduct;
