// ProductModal.js
import React from "react";
import { Modal, Form, Input, InputNumber, Select } from "antd";

const { Option } = Select;

const ProductModal = ({
  isModalVisible,
  setIsModalVisible,
  form,
  handleAddProduct,
}) => {
  return (
    <Modal
      title="Tambah Produk"
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleAddProduct}>
        <Form.Item
          name="name"
          label="Nama Produk"
          rules={[{ required: true, message: "Nama produk harus diisi!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Kategori"
          rules={[{ required: true, message: "Pilih kategori!" }]}
        >
          <Select placeholder="Pilih kategori">
            <Option value="Elektronik">Elektronik</Option>
            <Option value="Smartphone">Smartphone</Option>
            <Option value="Furniture">Furniture</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="price"
          label="Harga"
          rules={[{ required: true, message: "Masukkan harga!" }]}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          name="stock"
          label="Stok"
          rules={[{ required: true, message: "Masukkan jumlah stok!" }]}
        >
          <InputNumber className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
