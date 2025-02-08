import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";

const EditProductModal = ({
  isEditModalVisible,
  setIsEditModalVisible,
  handleEditProduct,
  currentProduct,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (currentProduct) {
      form.setFieldsValue({ ...currentProduct, stock: 0 });
    }
  }, [currentProduct, form]);

  return (
    <Modal
      title="Edit Produk"
      open={isEditModalVisible}
      onCancel={() => setIsEditModalVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleEditProduct}>
        <Form.Item label="Nama Produk" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Kategori"
          name="category"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Harga"
          name="Harga"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Tambah Stok" name="stock">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
