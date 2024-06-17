import React, { useState } from 'react';
import Navbar from "../../components/DashboardGA/Navbar";
import Sidebar from '../../components/DashboardGA/Sidebar';
import { Table } from 'react-bootstrap';

const AssetRecord = () => {
  const [selectedOption, setSelectedOption] = useState("Kartu Inventaris Aset");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderTable = () => {
    switch (selectedOption) {
      case "Kartu Inventaris Aset":
        return (
          <Table striped bordered hover>
            <thead className="thead-dark">
              <tr className='text-center'>
                <th>Kode Aset</th>
                <th>Nama Aset</th>
                <th>Jenis Aset</th>
                <th>Aspek Legal</th>
                <th>Spesifikasi</th>
                <th>Harga</th>
                <th>Tahun Perolehan</th>
                <th>Riwayat Perolehan</th>
                <th>Kondisi</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {/* Isi data Kartu Inventaris Aset */}
            </tbody>
          </Table>
        );
      case "Kartu Inventaris Ruangan":
        return (
          <Table striped bordered hover>
            <thead className="thead-dark">
              <tr className='text-center'>
                <th>Kode Ruangan</th>
                <th>Nama Ruangan</th>
                <th>Jenis Aset</th>
                <th>Jumlah Aset</th>
                <th>Kondisi</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {/* Isi data Kartu Inventaris Ruangan */}
            </tbody>
          </Table>
        );
      case "Daftar Mutasi Aset":
        return (
            <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr className="text-center">
                <th rowSpan="2">No</th>
                <th rowSpan="2">Kode Aset</th>
                <th rowSpan="2">Jenis Aset/ Nama Aset</th>
                <th rowSpan="2">Nomor Register</th>
                <th rowSpan="2">Spesifikasi</th>
                <th rowSpan="2">Ukuran</th>
                <th rowSpan="2">Aspek Legal</th>
                <th rowSpan="2">Tanggal Perolehan</th>
                <th rowSpan="2">Asal Usul Perolehan</th>
                <th rowSpan="2">Harga (Rp Ribu)</th>
                <th colSpan="3">Kondisi Aset</th>
                <th colSpan="2">Jumlah Awal</th>
                <th colSpan="2">Mutasi Perubahan</th>
                <th colSpan="2">Jumlah Akhir</th>
                <th rowSpan="2">Ket</th>
              </tr>
              <tr className="text-center">
                <th>B</th>
                <th>RR</th>
                <th>RB</th>
                <th>Aset</th>
                <th>Harga</th>
                <th>Berkurang Aset</th>
                <th>Berkurang Harga</th>
                <th>Bertambah Aset</th>
                <th>Bertambah Harga</th>
              </tr>
            </thead>
            <tbody>
              {/* Isi data di sini */}
            </tbody>
          </table>
        );
      case "Daftar Peminjaman Aset":
        return (
            <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr className="text-center">
            <th rowSpan="2">No</th>
            <th rowSpan="2">Jenis Aset/ Nama Aset</th>
            <th rowSpan="2">Spesifikasi</th>
            <th rowSpan="2">Aspek Legal</th>
            <th rowSpan="2">Nomor Seri Pabrik</th>
            <th rowSpan="2">Ukuran</th>
            <th rowSpan="2">Bahan</th>
            <th rowSpan="2">Tahun Pembuatan / Pembelian</th>
            <th rowSpan="2">Jumlah Aset / Register</th>
            <th colSpan="3">Kondisi Aset</th>
            <th colSpan="2">Peminjaman</th>
            <th colSpan="2">Pengembalian</th>
            <th rowSpan="2">Ket</th>
          </tr>
          <tr className="text-center">
            <th>Baik (B)</th>
            <th>Rusak Ringan (RR)</th>
            <th>Rusak Berat (RB)</th>
            <th>Tanggal</th>
            <th>Peminjam</th>
            <th>Tanggal</th>
            <th>Peminjam</th>
          </tr>
        </thead>
        <tbody>
          {/* Isi data di sini */}
        </tbody>
      </table>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div id="wrapper" className='d-flex'>
        <Sidebar />
        <div id="content-wrapper" className='d-flex flex-column w-100'>
          <div id="content">
            <Navbar />
            <div className='container-fluid mt-4'>
              <h1 className='mb-4'>Pencatatan Aset</h1>
              <div className="d-flex align-items-center mb-3">
                <select className="form-select w-auto" value={selectedOption} onChange={handleSelectChange}>
                  <option value="Kartu Inventaris Aset">Kartu Inventaris Aset</option>
                  <option value="Kartu Inventaris Ruangan">Kartu Inventaris Ruangan</option>
                  <option value="Daftar Mutasi Aset">Daftar Mutasi Aset</option>
                  <option value="Daftar Peminjaman Aset">Daftar Peminjaman Aset</option>
                </select>
              </div>
              <h3 className='mb-4 text-center'>{selectedOption}</h3>
              <div className="table-responsive mt-3">
                {renderTable()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetRecord;
