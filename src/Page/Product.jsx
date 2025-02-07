// ProductPage.js
import React, { useState } from "react";
import Layout from "../Component/Layout";
import SearchBar from "../Component/SearchBar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ProductTable from "../Component/ProductTable";
import ProductModal from "../Component/ProductModal";
import { Form, Modal, Button, Select } from "antd"; // Import Modal, Button, Select

const ProductPage = () => {
  const [products, setProducts] = useState([
    {
      key: 1,
      name: "Laptop Dell",
      category: "Elektronik",
      price: 15000000,
      stock: 10,
    },
    {
      key: 2,
      name: "iPhone 13",
      category: "Smartphone",
      price: 17000000,
      stock: 5,
    },
    {
      key: 3,
      name: "Kursi Gaming",
      category: "Furniture",
      price: 2500000,
      stock: 15,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Product being edited
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Handle Add Product
  const handleAddProduct = (values) => {
    setProducts([...products, { key: products.length + 1, ...values }]);
    setIsModalVisible(false);
    form.resetFields();
  };

  // Handle Edit Product
  const handleEditProduct = (values) => {
    const updatedProducts = products.map((product) =>
      product.key === currentProduct.key ? { ...product, ...values } : product
    );
    setProducts(updatedProducts);
    setIsEditModalVisible(false);
    setCurrentProduct(null);
  };

  // Handle Delete Product
  const handleDeleteProduct = (key) => {
    const updatedProducts = products.filter((product) => product.key !== key);
    setProducts(updatedProducts);
  };

  // Filter by Category
  const handleCategoryFilter = (value) => {
    setCategoryFilter(value);
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(products);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Produk");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(data, "produk.xlsx");
  };

  // Columns for Product Table
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Nama Produk",
      dataIndex: "name",
      key: "name",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
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
      render: (text, record) => (
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

  // Handle Edit action
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditModalVisible(true);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Manajemen Produk
        </h1>
        <p className="text-gray-600">Kelola dan pantau data produk Anda.</p>
      </div>

      {/* SearchBar Component */}
      <SearchBar
        setSearchText={setSearchText}
        exportToExcel={exportToExcel}
        setIsModalVisible={setIsModalVisible}
      />

      {/* Filter by Category */}
      <div className="mb-4">
        <Select
          style={{ width: 200 }}
          placeholder="Filter by Kategori"
          onChange={handleCategoryFilter}
          value={categoryFilter}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="Elektronik">Elektronik</Select.Option>
          <Select.Option value="Smartphone">Smartphone</Select.Option>
          <Select.Option value="Furniture">Furniture</Select.Option>
        </Select>
      </div>

      {/* Product Table Component */}
      <ProductTable
        columns={columns}
        products={
          categoryFilter
            ? products.filter((product) => product.category === categoryFilter)
            : products
        }
      />

      {/* Product Add Modal */}
      <ProductModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        form={form}
        handleAddProduct={handleAddProduct}
      />

      {/* Product Edit Modal */}
      <Modal
        title="Edit Produk"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          initialValues={currentProduct}
          onFinish={handleEditProduct}
        >
          <Form.Item
            label="Nama Produk"
            name="name"
            rules={[{ required: true, message: "Nama produk harus diisi" }]}
          >
            <input />
          </Form.Item>
          <Form.Item
            label="Kategori"
            name="category"
            rules={[{ required: true, message: "Kategori harus dipilih" }]}
          >
            <input />
          </Form.Item>
          <Form.Item
            label="Harga"
            name="price"
            rules={[{ required: true, message: "Harga harus diisi" }]}
          >
            <input type="number" />
          </Form.Item>
          <Form.Item
            label="Stok"
            name="stock"
            rules={[{ required: true, message: "Stok harus diisi" }]}
          >
            <input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ProductPage;
