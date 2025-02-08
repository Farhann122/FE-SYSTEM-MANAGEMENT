import React from "react";
import { Input } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";

const SearchCategory = ({
  searchText,
  setSearchText,
  exportToExcel,
  setIsModalVisible,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      {/* Input Pencarian */}
      <Input
        placeholder="Cari kategori..."
        allowClear
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full md:w-1/3"
      />

      <div className="flex gap-2">
        {/* Tombol Tambah Kategori */}
        <button
          onClick={() => setIsModalVisible(true)}
          className="font-poppins text-sm bg-orange-500 w-44 h-8 rounded-lg hover:bg-orange-400 flex items-center justify-center gap-2 text-white"
        >
          <PlusOutlined />
          Tambah Kategori
        </button>

        {/* Tombol Export ke Excel */}
        <button
          onClick={exportToExcel}
          className="font-poppins text-sm bg-green-700 w-36 h-8 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 text-white"
        >
          <FileExcelOutlined />
          Export Excel
        </button>
      </div>
    </div>
  );
};

export default SearchCategory;
