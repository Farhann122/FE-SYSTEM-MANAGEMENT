import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, message } from "antd";
import axiosInstance from "../../../axiosInstance";

const { Option } = Select;

const ProductModal = ({
  isModalVisible,
  setIsModalVisible,
  onProductAdded,
}) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
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

    if (isModalVisible) fetchCategories();
  }, [isModalVisible]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const productData = {
        name: values.name,
        stock: values.stock,
        categoryName: values.categoryName,
        prices: {
          MEMBER: values.memberPrice,
          RESELLER: values.resellerPrice,
          DISTRIBUTOR: values.distributorPrice,
        },
      };

      const response = await axiosInstance.post("/create/product", productData);

      if (response.status === 201 && response.data.status === "success") {
        message.success("Produk berhasil ditambahkan!");
        form.resetFields();
        setIsModalVisible(false);

        if (onProductAdded) {
          onProductAdded({
            key: response.data.product.id,
            name: productData.name,
            stock: productData.stock,
            category: productData.categoryName,
            price: productData.prices.MEMBER,
          });
        }
      } else {
        message.error("Gagal menambahkan produk: " + response.data.msg);
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
      message.error("Terjadi kesalahan saat menambahkan produk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Tambah Produk Baru"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Nama Produk"
          name="name"
          rules={[{ required: true, message: "Nama produk wajib diisi!" }]}
        >
          <Input placeholder="Masukkan nama produk" />
        </Form.Item>

        <Form.Item
          label="Stok"
          name="stock"
          rules={[{ required: true, message: "Stok produk wajib diisi!" }]}
        >
          <InputNumber
            placeholder="Masukkan jumlah stok"
            min={0}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Kategori"
          name="categoryName"
          rules={[{ required: true, message: "Kategori wajib dipilih!" }]}
        >
          <Select placeholder="Pilih kategori">
            {categories.map((category) => (
              <Option key={category.id} value={category.name}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Harga untuk Member" name="memberPrice">
          <InputNumber
            placeholder="Harga untuk Member"
            min={0}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Harga untuk Reseller" name="resellerPrice">
          <InputNumber
            placeholder="Harga untuk Reseller"
            min={0}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Harga untuk Distributor" name="distributorPrice">
          <InputNumber
            placeholder="Harga untuk Distributor"
            min={0}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            Tambahkan Produk
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
