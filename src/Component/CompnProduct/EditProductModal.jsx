import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, message } from "antd";
import axiosInstance from "../../../axiosInstance";

const { Option } = Select;

const EditProductModal = ({
  isEditModalVisible,
  setIsEditModalVisible,
  currentProduct,
  onProductUpdated,
}) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories for dropdown
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category");
        if (response.data.status === "success") {
          setCategories(response.data.data);
        } else {
          message.error("Gagal memuat kategori");
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        message.error("Terjadi kesalahan saat memuat kategori");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (currentProduct) {
      form.setFieldsValue({
        name: currentProduct.name,
        stock: currentProduct.stock,
        categoryName: currentProduct.category,
        memberPrice: currentProduct.prices?.MEMBER || 0,
        resellerPrice: currentProduct.prices?.RESELLER || 0,
        distributorPrice: currentProduct.prices?.DISTRIBUTOR || 0,
      });
    }
  }, [currentProduct, form]);

  const handleSubmit = async (values) => {
    try {
      const {
        name,
        stock,
        categoryName,
        memberPrice,
        resellerPrice,
        distributorPrice,
      } = values;

      // Send update request to the backend
      const response = await axiosInstance.put(
        `/update/product/${currentProduct.key}`,
        {
          name,
          stock,
          categoryName,
          prices: {
            MEMBER: memberPrice,
            RESELLER: resellerPrice,
            DISTRIBUTOR: distributorPrice,
          },
        }
      );

      if (response.data.status === "success") {
        message.success("Produk berhasil diperbarui");
        onProductUpdated({
          ...currentProduct,
          name,
          stock,
          category: categoryName,
          prices: {
            MEMBER: memberPrice,
            RESELLER: resellerPrice,
            DISTRIBUTOR: distributorPrice,
          },
        });
        setIsEditModalVisible(false);
      } else {
        message.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error updating product:", error.message);
      message.error("Terjadi kesalahan saat memperbarui produk");
    }
  };

  return (
    <Modal
      title="Edit Produk"
      visible={isEditModalVisible}
      onCancel={() => setIsEditModalVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Nama Produk"
          name="name"
          rules={[{ required: true, message: "Nama produk harus diisi" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Stok"
          name="stock"
          rules={[{ required: true, message: "Stok harus diisi" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Kategori"
          name="categoryName"
          rules={[{ required: true, message: "Kategori harus dipilih" }]}
        >
          <Select placeholder="Pilih kategori">
            {categories.map((category) => (
              <Option key={category.id} value={category.name}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Harga (Member)"
          name="memberPrice"
          rules={[{ required: true, message: "Harga member harus diisi" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Harga (Reseller)"
          name="resellerPrice"
          rules={[{ required: true, message: "Harga reseller harus diisi" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Harga (Distributor)"
          name="distributorPrice"
          rules={[{ required: true, message: "Harga distributor harus diisi" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
