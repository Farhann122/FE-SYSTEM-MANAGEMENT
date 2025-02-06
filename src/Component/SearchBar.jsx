// SearchBar.js
import React from 'react';
import { Input, Button } from 'antd';
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';

const SearchBar = ({ setSearchText, exportToExcel, setIsModalVisible }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Input
        placeholder="Cari produk..."
        className="w-64"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Tambah Produk
        </Button>
        <Button
          type="default"
          icon={<ExportOutlined />}
          onClick={exportToExcel}
          className="ml-2"
        >
          Export ke Excel
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
