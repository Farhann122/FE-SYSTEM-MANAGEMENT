// ProductTable.js
import React from "react";
import { Table } from "antd";

const ProductTable = ({ products, columns }) => {
  return (
    <Table
      columns={columns}
      dataSource={products}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ProductTable;
