import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const EditCategoryModal = ({
  isEditModalVisible,
  setIsEditModalVisible,
  handleEditCategory,
  currentCategory,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentCategory) {
      form.setFieldsValue({ ...currentCategory });
    }
  }, [currentCategory, form]);

  return (
    <Modal
      title="Edit Kategori"
      open={isEditModalVisible}
      onCancel={() => setIsEditModalVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleEditCategory}>
        <Form.Item
          label="Nama Kategori"
          name="name"
          rules={[{ required: true, message: "Nama kategori wajib diisi" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCategoryModal;
