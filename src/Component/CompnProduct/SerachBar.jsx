import React from "react";
import { Input, Button } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { FiPlusCircle } from "react-icons/fi";
import { AiFillPlusCircle, AiFillPlusSquare } from "react-icons/ai";
import { BsFilePlus } from "react-icons/bs";

const SearchBar = ({
  searchText,
  setSearchText,
  exportToExcel,
  setIsModalVisible,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      {/* Input Pencarian */}
      <Input
        placeholder="Cari produk..."
        allowClear
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full md:w-1/3"
      />

      <div className="flex gap-2">
        {/* Tombol Tambah Produk */}

        <button
          onClick={() => setIsModalVisible(true)}
          className="font-poppins text-sm bg-orange-500 w-44 rounded-lg hover:bg-orange-400 flex items-center justify-center gap-2 "
        >
          <PlusOutlined className="text-white" />
          <h1 className="text-white"> Tambah Product</h1>
        </button>

        {/* Tombol Export ke Excel */}
        <button
          onClick={exportToExcel}
          className="font-poppins text-sm bg-green-700 w-36 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 "
        >
          <FileExcelOutlined className="text-white" />
          <h1 className="text-white"> Export Excel</h1>
        </button>
        
      </div>
    </div>
  );
};

export default SearchBar;
