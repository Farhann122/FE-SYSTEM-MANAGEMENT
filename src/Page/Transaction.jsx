import React, { useState } from "react";
import { Table, DatePicker, Card, Col, Row } from "antd";
import moment from "moment";
import Layout from "../Component/Layout"; // Pastikan path Layout benar

const Transaction = () => {
  // Data transaksi awal
  const transactions = [
    {
      key: 1,
      product: "Laptop Dell",
      customer: "John Doe",
      amount: 15000000,
      date: "2025-02-10",
    },
    {
      key: 2,
      product: "iPhone 13",
      customer: "Jane Smith",
      amount: 17000000,
      date: "2025-02-12",
    },
    {
      key: 3,
      product: "Kursi Gaming",
      customer: "Chris Johnson",
      amount: 5000000,
      date: "2025-01-25",
    },
    {
      key: 4,
      product: "Samsung Galaxy S21",
      customer: "Alice Brown",
      amount: 18000000,
      date: "2025-02-15",
    },
  ];

  const [selectedDate, setSelectedDate] = useState(null);

  // Filter transaksi berdasarkan tanggal yang dipilih
  const filteredTransactions = transactions.filter((transaction) => {
    if (!selectedDate) return true; // Jika tidak ada tanggal dipilih, tampilkan semua transaksi
    return transaction.date === selectedDate; // Bandingkan langsung dengan format string
  });

  // Fungsi untuk menghitung total penjualan harian
  const getDailyTotalSales = () => {
    if (!selectedDate) return 0; // Jika belum memilih tanggal, return 0
    return filteredTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  };

  // Fungsi untuk menghitung total penjualan bulanan
  const getMonthlyTotalSales = () => {
    if (!selectedDate) return 0;
    return transactions.reduce((total, transaction) => {
      return moment(transaction.date).isSame(moment(selectedDate), "month")
        ? total + transaction.amount
        : total;
    }, 0);
  };

  // Fungsi untuk menghitung total penjualan tahunan
  const getYearlyTotalSales = () => {
    if (!selectedDate) return 0;
    return transactions.reduce((total, transaction) => {
      return moment(transaction.date).isSame(moment(selectedDate), "year")
        ? total + transaction.amount
        : total;
    }, 0);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Transaksi Pembelian
        </h1>
        <p className="text-gray-600">
          Lihat transaksi pembelian berdasarkan hari, bulan, dan tahun.
        </p>
      </div>

      {/* Filter berdasarkan tanggal */}
      <div className="flex justify-between items-center mb-4">
        <DatePicker
          picker="date"
          value={selectedDate ? moment(selectedDate, "YYYY-MM-DD") : null}
          onChange={(date) =>
            setSelectedDate(date ? date.format("YYYY-MM-DD") : null)
          }
          className="w-64"
          placeholder="Pilih tanggal"
        />
      </div>

      {/* Tampilkan Total Penjualan */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Total Penjualan</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Total Penjualan Harian" bordered={false}>
              <div className="text-xl font-semibold text-gray-800">
                Rp {getDailyTotalSales().toLocaleString()}
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Penjualan Bulanan" bordered={false}>
              <div className="text-xl font-semibold text-gray-800">
                Rp {getMonthlyTotalSales().toLocaleString()}
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Penjualan Tahunan" bordered={false}>
              <div className="text-xl font-semibold text-gray-800">
                Rp {getYearlyTotalSales().toLocaleString()}
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Tabel Transaksi */}
      <Table
        columns={[
          { title: "Pelanggan", dataIndex: "customer", key: "customer" },
          {
            title: "Jumlah Pembelian",
            dataIndex: "amount",
            key: "amount",
            render: (text) => `Rp ${text.toLocaleString()}`,
          },
          { title: "Tanggal Pembelian", dataIndex: "date", key: "date" },
        ]}
        dataSource={filteredTransactions}
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />
    </Layout>
  );
};

export default Transaction;
