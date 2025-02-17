import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // Modal Show Logout Profile
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="w-full h-16 bg-white flex items-center px-4 md:px-6 shadow-md justify-between flex-wrap">
      {/* Nama Brand */}
      <div className="text-gray-800 text-lg font-poppins">
        <h1 className="text-sm md:text-lg">Shineskin Skincare </h1>
      </div>

      {/* Profil User */}
      <div className="flex items-center gap-2 md:gap-4 cursor-pointer">
        <h1 className="text-gray-800 font-poppins font-light hidden md:flex">
          {username}
        </h1>
        <AiOutlineUser
          size={28}
          className="text-gray-800 hover:scale-110 transition-transform"
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
          <Button key="logout" type="primary" danger onClick={handleLogout}>
            Logout
          </Button>,
        ]}
      >
        <div className="font-poppins text-justify">
          <p>Nama : {username}</p>
          <p>Email: {email}</p>
          <p>Role: {role}</p>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
