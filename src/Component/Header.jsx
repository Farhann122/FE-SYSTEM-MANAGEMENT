import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Modal, Button } from "antd";

const Header = () => {
  // Modal Show Logout Profile
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="w-full h-16 bg-zinc-800 flex items-center px-4 md:px-6 shadow-md justify-between flex-wrap">
      {/* Nama Brand */}
      <div className="text-white text-lg font-poppins">
        <h1 className="text-sm md:text-lg">Shineskin Skincare </h1>
      </div>

      {/* Profil User */}
      <div className="flex items-center gap-2 md:gap-4 cursor-pointer">
        <h1 className="text-white font-poppins font-light hidden md:flex">
          Muhammad Farhan Hamdi
        </h1>
        <AiOutlineUser
          size={28}
          className="text-white hover:scale-110 transition-transform"
          onClick={handleShowModal}
        />
      </div>

      {/* Modal Logout/Profile */}
      <Modal
        title="Profil Pengguna"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Batal
          </Button>,
          <Button
            key="logout"
            type="primary"
            danger
            onClick={() => alert("Logout Berhasil!")}
          >
            Logout
          </Button>,
        ]}
      >
        <div className="font-poppins text-justify">
        <p>Nama: Muhammad Farhan Hamdi</p>
        <p>Email: farhan@example.com</p>
        <p>Role: Admin</p>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
