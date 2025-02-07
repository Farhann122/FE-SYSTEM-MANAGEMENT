import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import Layout from "../Component/Layout";

const SettingsProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Simulasi penyimpanan data profil
  const handleSave = (values) => {
    setLoading(true);
    setTimeout(() => {
      message.success("Profil berhasil diperbarui!");
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout>
        <div>
            <h1 className="text-2xl font-poppins font-semibold">Profile Admin</h1>
            <h1 className=" font-poppins font-light  text-gray-400">Seting akun anda disini.</h1>
        </div>
      <div className="max-w-lg mx-auto bg-slate-200 p-6 rounded-lg shadow-md mt-6">
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Pengaturan Profil
        </h2>
        <p className="text-gray-600 mb-6">Perbarui informasi profil Anda.</p>

        {/* Form untuk mengedit profil */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            name: "Muhammad Farhan Hamdi",
            email: "farhan@example.com",
            phone: "081234567890",
            address: "Jl. Mawar No. 10, Padang",
          }}
        >
          {/* Nama */}
          <Form.Item
            label="Nama Lengkap"
            name="name"
            rules={[{ required: true, message: "Nama tidak boleh kosong!" }]}
          >
            <Input placeholder="Masukkan nama lengkap" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email tidak boleh kosong!" },
              { type: "email", message: "Masukkan email yang valid!" },
            ]}
          >
            <Input placeholder="Masukkan email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password tidak boleh kosong!" },
            ]}
          >
            <Input.Password placeholder="Masukkan password" />
          </Form.Item>

          {/* Nomor Telepon */}
          <Form.Item
            label="Nomor Telepon"
            name="phone"
            rules={[
              { required: true, message: "Nomor telepon tidak boleh kosong!" },
              {
                pattern: /^[0-9]+$/,
                message: "Nomor telepon hanya boleh berisi angka!",
              },
            ]}
          >
            <Input placeholder="Masukkan nomor telepon" />
          </Form.Item>

          {/* Alamat */}
          <Form.Item
            label="Alamat"
            name="address"
            rules={[{ required: true, message: "Alamat tidak boleh kosong!" }]}
          >
            <Input.TextArea placeholder="Masukkan alamat lengkap" rows={3} />
          </Form.Item>

          {/* Tombol Simpan */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Simpan Perubahan
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default SettingsProfile;
