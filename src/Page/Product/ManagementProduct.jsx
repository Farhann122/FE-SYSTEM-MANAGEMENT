import React, { useState, useEffect } from "react";
import Layout from "../../Component/Layout";
import ProductTable from "../../Component/CompnProduct/ProductTable";
import ProductModal from "../../Component/CompnProduct/ProductModal";
import EditProductModal from "../../Component/CompnProduct/EditProductModal";
import axiosInstance from "../../../axiosInstance";
import { Select, Button, message } from "antd";
import * as XLSX from "xlsx"; // Import the xlsx library

const { Option } = Select;

const ManagementProduct = () => {
  const [products, setProducts] = useState([]); // Product data from API
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedRole, setSelectedRole] = useState("MEMBER"); // Default to 'MEMBER'

  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        const { data } = response;

        if (data.status === "success") {
          const formattedProducts = data.data.map((product) => {
            const priceForRole =
              product.userPrice.find((price) => price.role === selectedRole)
                ?.price || 0;

            return {
              key: product.id,
              name: product.name,
              category: product.category.name,
              price: priceForRole,
              stock: product.stock,
              prices: product.userPrice.reduce((acc, price) => {
                acc[price.role] = price.price;
                return acc;
              }, {}),
            };
          });

          setProducts(formattedProducts);
        } else {
          console.error("Failed to fetch products:", data.msg);
        }
      } catch (err) {
        console.error("Error fetching products:", err.message);
      }
    };

    fetchProducts();
  }, [selectedRole]);

  // Handle Add Product
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  // Handle Product Update
  const handleProductUpdate = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.key === updatedProduct.key
          ? {
              ...updatedProduct,
              price: updatedProduct.prices[selectedRole],
            }
          : product
      )
    );
  };

  // Handle Delete Product
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axiosInstance.delete(
        `/delete/product/${productId}`
      );

      if (response.status === 200) {
        message.success("Produk berhasil dihapus");

        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.key !== productId)
        );
      } else {
        message.error("Gagal menghapus produk: " + response.data.message);
      }
    } catch (err) {
      console.error("Error deleting product:", err.message);
      message.error("Terjadi kesalahan saat menghapus produk.");
    }
  };

  // Handle Edit Product
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditModalVisible(true);
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  // Export to Excel Function
  const exportToExcel = () => {
    const formattedData = products.map((product) => ({
      "Product Name": product.name,
      Category: product.category,
      Price: product.price,
      Stock: product.stock,
      ...product.prices, // Add dynamic pricing for each role
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Export the workbook to Excel file
    XLSX.writeFile(workbook, "products.xlsx");
  };

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-gray-800">Manajemen Produk</h1>
      <p className="text-gray-600 mb-6">
        Untuk menambah, mengedit, dan menghapus produk.
      </p>

      {/* Role Selection */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <label className="text-sm mr-2">Pilih Role Harga :</label>
          <Select
            defaultValue="MEMBER"
            style={{ width: 200 }}
            onChange={handleRoleChange}
          >
            <Option value="MEMBER">Member</Option>
            <Option value="RESELLER">Reseller</Option>
            <Option value="DISTRIBUTOR">Distributor</Option>
          </Select>
          <div>
            <Button
              className=""
              type="primary"
              onClick={() => setIsModalVisible(true)}
            >
              Tambah Produk
            </Button>
            <Button
              className="ml-2 bg-green-700 text-white hover:bg-green-500"
            type="text"
              onClick={exportToExcel} // Call export function
            >
              Export to Excel
            </Button>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <ProductTable
        products={products}
        handleEdit={handleEdit}
        handleDeleteProduct={handleDeleteProduct}
      />

      {/* Modals */}
      <ProductModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onProductAdded={handleAddProduct}
      />

      <EditProductModal
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        currentProduct={currentProduct}
        onProductUpdated={handleProductUpdate}
      />
    </Layout>
  );
};

export default ManagementProduct;
