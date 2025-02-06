// ProductPage.js
import React, { useState } from "react";
import Layout from "../Component/Layout";
import SearchBar from "../Component/SearchBar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ProductTable from "../Component/ProductTable";
import ProductModal from "../Component/ProductModal";
import { Form } from "antd"; // Correct import from 'antd'

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
  const [form] = Form.useForm(); 
  const [searchText, setSearchText] = useState("");

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
  ];

  const handleAddProduct = (values) => {
    setProducts([...products, { key: products.length + 1, ...values }]);
    setIsModalVisible(false);
    form.resetFields();
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(products);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Produk");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(data, "produk.xlsx");
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

      {/* ProductTable Component */}
      <ProductTable columns={columns} products={products} />

      {/* ProductModal Component */}
      <ProductModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        form={form}
        handleAddProduct={handleAddProduct}
      />
    </Layout>
  );
};

export default ProductPage;
