import React, { useState } from "react";
import * as XLSX from "xlsx"; // Import untuk Export Excel
import Layout from "../../Component/Layout";
import SearchBar from "../../Component/CompnProduct/SerachBar";
import ProductTable from "../../Component/CompnProduct/ProductTable";
import ProductModal from "../../Component/CompnProduct/ProductModal";
import EditProductModal from "../../Component/CompnProduct/EditProductModal";

const ManagementProduct = () => {
  const [products, setProducts] = useState([
    {
      key: 1,
      name: "Laptop Dell",
      category: "Elektronik",
      price: 15000000,
      stock: 10,
      arrivalHistory: [{ date: "2024-02-01", addedStock: 10 }],
    },
    {
      key: 2,
      name: "iPhone 13",
      category: "Smartphone",
      price: 17000000,
      stock: 5,
      arrivalHistory: [
        { date: "2024-01-28", addedStock: 3 },
        { date: "2024-02-05", addedStock: 2 },
      ],
    },
  ]);

  const [searchText, setSearchText] = useState(""); // State untuk pencarian
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Fungsi Export ke Excel tanpa Arrival History
  const exportToExcel = () => {
    const dataForExcel = products.map((product) => ({
      "Nama Produk": product.name,
      Kategori: product.category,
      "Harga (IDR)": product.price,
      "Stok Sekarang": product.stock,
    }));

    // Konversi ke Sheet Excel
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Manajemen Produk");

    // Simpan File Excel
    XLSX.writeFile(workbook, "Manajemen_Produk.xlsx");
  };

  // Filter produk berdasarkan searchText
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-gray-800 ">
        Manajemen Produk
      </h1>
      <p className="text-gray-600 mb-6">
        Untuk menambah, mengedit, dan menghapus produk. Anda dapat melihat
      </p>

      {/* Menggunakan SearchBar dengan searchText, setSearchText, dan exportToExcel */}
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        exportToExcel={exportToExcel}
        setIsModalVisible={setIsModalVisible}
      />

      {/* Hanya menampilkan produk yang sudah difilter */}
      <ProductTable
        products={filteredProducts}
        handleEdit={(product) => {
          setCurrentProduct(product);
          setIsEditModalVisible(true);
        }}
        handleDeleteProduct={(key) => {
          setProducts(products.filter((product) => product.key !== key));
        }}
      />

      <ProductModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleAddProduct={(newProduct) => {
          const existingProduct = products.find(
            (p) => p.name === newProduct.name
          );
          if (existingProduct) {
            const updatedProducts = products.map((product) =>
              product.name === newProduct.name
                ? {
                    ...product,
                    stock: product.stock + newProduct.stock,
                  }
                : product
            );
            setProducts(updatedProducts);
          } else {
            setProducts([
              ...products,
              {
                key: products.length + 1,
                ...newProduct,
              },
            ]);
          }
          setIsModalVisible(false);
        }}
      />

      <EditProductModal
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        handleEditProduct={(updatedProduct) => {
          const updatedProducts = products.map((product) =>
            product.key === currentProduct.key
              ? { ...product, ...updatedProduct }
              : product
          );
          setProducts(updatedProducts);
          setIsEditModalVisible(false);
        }}
        currentProduct={currentProduct}
      />
    </Layout>
  );
};

export default ManagementProduct;
