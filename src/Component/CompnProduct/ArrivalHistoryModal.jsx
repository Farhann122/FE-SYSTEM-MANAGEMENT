import React from "react";
import { Modal, Table } from "antd";

const ArrivalHistoryModal = ({ isHistoryModalVisible, setIsHistoryModalVisible, currentProduct }) => {
  const columns = [
    { title: "Tanggal", dataIndex: "date", key: "date" },
    { title: "Stok Ditambahkan", dataIndex: "addedStock", key: "addedStock" },
  ];

  return (
    <Modal title="Riwayat Kedatangan" visible={isHistoryModalVisible} onCancel={() => setIsHistoryModalVisible(false)} footer={null}>
      <Table columns={columns} dataSource={currentProduct?.arrivalHistory || []} rowKey="date" />
    </Modal>
  );
};

export default ArrivalHistoryModal;
