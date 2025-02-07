import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";

const ProductModal = ({
  isModalVisible,
  setIsModalVisible,
  handleAddProduct,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    handleAddProduct(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Tambah Produk"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Nama Produk"
          name="name"
          rules={[{ required: true, message: "Nama produk harus diisi!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kategori"
          name="category"
          rules={[{ required: true, message: "Kategori harus diisi!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Harga"
          name="price"
          rules={[{ required: true, message: "Harga harus diisi!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Stok Awal"
          name="stock"
          rules={[{ required: true, message: "Stok awal harus diisi!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
