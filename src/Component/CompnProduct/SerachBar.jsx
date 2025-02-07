import React from "react";
import { Input, Button } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";

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
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Tambah Produk
        </Button>

        {/* Tombol Export ke Excel */}
        <Button
          type="default"
          icon={<FileExcelOutlined />}
          onClick={exportToExcel}
        >
          Export Excel
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
