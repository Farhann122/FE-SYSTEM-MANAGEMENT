import React, { useState } from "react";
import { Table, DatePicker, Button, Card, Col, Row } from "antd";
import moment from "moment";
import Layout from "../Component/Layout"; // Assuming Layout is in this path

const Transaction = () => {
  // State untuk menyimpan transaksi dan filter
  const [transactions, setTransactions] = useState([
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
  ]);

  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [selectedDate, setSelectedDate] = useState(null);

  // Kolom tabel
  const columns = [
    { title: "Produk", dataIndex: "product", key: "product" },
    { title: "Pelanggan", dataIndex: "customer", key: "customer" },
    {
      title: "Jumlah Pembelian",
      dataIndex: "amount",
      key: "amount",
      render: (text) => `Rp ${text.toLocaleString()}`,
    },
    { title: "Tanggal Pembelian", dataIndex: "date", key: "date" },
  ];

  // Fungsi untuk menyaring transaksi berdasarkan tanggal
  const handleFilterChange = (date, dateString) => {
    setSelectedDate(dateString);
    if (dateString) {
      const filtered = transactions.filter((transaction) => {
        const transactionDate = moment(transaction.date);
        return (
          transactionDate.isSame(date, "day") ||
          transactionDate.isSame(date, "month") ||
          transactionDate.isSame(date, "year")
        );
      });
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  };

  // Fungsi untuk menghitung total penjualan harian
  const getDailyTotalSales = () => {
    if (!selectedDate) return 0;
    return filteredTransactions.reduce((total, transaction) => {
      const transactionDate = moment(transaction.date).format("YYYY-MM-DD");
      if (transactionDate === selectedDate) {
        return total + transaction.amount;
      }
      return total;
    }, 0);
  };

  // Fungsi untuk menghitung total penjualan bulanan
  const getMonthlyTotalSales = () => {
    if (!selectedDate) return 0;
    return filteredTransactions.reduce((total, transaction) => {
      const transactionDate = moment(transaction.date).format("YYYY-MM");
      if (transactionDate === moment(selectedDate).format("YYYY-MM")) {
        return total + transaction.amount;
      }
      return total;
    }, 0);
  };

  // Fungsi untuk menghitung total penjualan tahunan
  const getYearlyTotalSales = () => {
    return filteredTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Transaksi Pembelian
        </h1>
        <p className="text-gray-600">
          Lihat transaksi pembelian yang terjadi berdasarkan hari, bulan, dan
          tahun.
        </p>
      </div>

      {/* Filter berdasarkan tanggal (hari, bulan, tahun) */}
      <div className="flex justify-between items-center mb-4">
        <DatePicker
          picker="date"
          defaultValue={selectedDate ? moment(selectedDate) : moment()}
          onChange={handleFilterChange}
          className="w-64"
          placeholder="Pilih tanggal"
        />
      </div>

      {/* Tampilkan Total Penjualan Harian, Bulanan, dan Tahunan */}
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
        columns={columns}
        dataSource={filteredTransactions}
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />
    </Layout>
  );
};

export default Transaction;
