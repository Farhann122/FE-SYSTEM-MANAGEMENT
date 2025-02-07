import React from "react";
import Layout from "../../Component/Layout";
import { Table } from "antd";
import SearchBar from "../../Component/CompnProduct/SerachBar";

const CategoryProduct = () => {
  return <Layout >Category Product
    <SearchBar/>
    <Table/>
  </Layout>;
};

export default CategoryProduct;
