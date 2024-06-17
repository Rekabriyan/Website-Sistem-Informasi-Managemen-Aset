import React, { useState } from 'react';
import Navbar from "../../components/DashboardGA/Navbar";
import Sidebar from '../../components/DashboardGA/Sidebar';
import { Table } from 'react-bootstrap';

const AssetRecord = () => {
  const [selectedOption, setSelectedOption] = useState("Kartu Inventaris Aset");
  const [selectedTab, setSelectedTab] = useState("KIA Mesin Peralatan");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const renderTabs = () => {
    return (
      <div className="d-flex justify-content-between mb-3">
        {["KIA Lahan Tanah", "KIA Bangunan", "KIA Mesin Peralatan", "KIA Teknologi Informasi", "KIA Tetap Lainnya", "KIA Konstruksi Dalam Proses Pengerjaan"].map((tab) => (
          <div key={tab} className="p-2 bd-highlight">
            <button
              className={`btn ${selectedTab === tab ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderTableByTab = () => {
    switch (selectedTab) {
      case "KIA Lahan Tanah":
        return (
          <>
            <h3 className="mb-4 text-center">KIA Lahan Tanah</h3>
            <Table striped bordered hover>
              <thead className="thead-dark">
                <tr className="text-center">
                  <th>No</th>
                  <th>Kode Aset</th>
                  <th>Jenis Aset/ Nama Aset</th>
                  <th>Kode Register</th>
                  <th>Luas</th>
                  <th>Status Hak</th>
                  <th>Penggunaan</th>
                  <th>Asal Usul Perolehan</th>
                  <th>Harga</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {/* Isi data KIA Lahan Tanah */}
              </tbody>
            </Table>
          </>
        );
      case "KIA Bangunan":
        return (
          <>
            <h3 className="mb-4 text-center">KIA Bangunan</h3>
            <Table striped bordered hover>
              <thead className="thead-dark">
                <tr className="text-center">
                  <th>No</th>
                  <th>Kode Aset</th>
                  <th>Jenis Aset/ Nama Aset</th>
                  <th>Kode Register</th>
                  <th>Konstruksi</th>
                  <th>Luas</th>
                  <th>Lokasi</th>
                  <th>Tanggal Perolehan</th>
                  <th>Harga</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {/* Isi data KIA Bangunan */}
              </tbody>
            </Table>
          </>
        );
      case "KIA Mesin Peralatan":
        return (
          <>
            <h3 className="mb-4 text-center">KIA Mesin Peralatan</h3>
            <Table striped bordered hover>
              <thead className="thead-dark">
                <tr className="text-center">
                  <th rowSpan="2">No</th>
                  <th rowSpan="2">Kode Aset</th>
                  <th rowSpan="2">Jenis Aset/ Nama Aset</th>
                  <th rowSpan="2">Kode Register</th>
                  <th colSpan="3">Kondisi Aset</th>
                  <th rowSpan="2">Merek/Tipe</th>
                  <th rowSpan="2">Ukuran</th>
                  <th rowSpan="2">Bahan</th>
                  <th rowSpan="2">Tanggal Perolehan</th>
                  <th rowSpan="2">Asal Usul Perolehan</th>
                  <th rowSpan="2">Harga</th>
                  <th rowSpan="2">Ket</th>
                </tr>
                <tr className="text-center">
                  <th>B</th>
                  <th>RR</th>
                  <th>RB</th>
                </tr>
              </thead>
              <tbody>
                {/* Isi data KIA Mesin Peralatan */}
              </tbody>
            </Table>
          </>
        );
      case "KIA Teknologi Informasi":
        return (
          <>
            <h3 className="mb-4 text-center">KIA Teknologi Informasi</h3>
            <Table striped bordered hover>
              <thead className="thead-dark">
                <tr className="text-center">
                  <th>No</th>
                  <th>Kode Aset</th>
                  <th>Jenis Aset/ Nama Aset</th>
                  <th>Kode Register</th>
                  <th>Merek/Tipe</th>
                  <th>Spesifikasi</th>
                  <th>Asal Usul Perolehan</th>
                  <th>Tanggal Perolehan</th>
                  <th>Harga</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {/* Isi data KIA Teknologi Informasi */}
              </tbody>
            </Table>
          </>
        );
      case "KIA Tetap Lainnya":
        return (
          <>
            <h3 className="mb-4 text-center">KIA Tetap Lainnya</h3>
            <Table striped bordered hover>
              <thead className="thead-dark">
                <tr className="text-center">
                  <th>No</th>
                  <th>Kode Aset</th>
                  <th>Jenis Aset/ Nama Aset</th>
                  <th>Kode Register</th>
                  <th>Jumlah</th>
                  <th>Satuan</th>
                  <th>Harga</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {/* Isi data KIA Tetap Lainnya */}
              </tbody>
            </Table>
          </>
        );
      case "KIA Konstruksi Dalam Proses Pengerjaan":
        return (
          <>
            <h3 className="mb-4 text-center">KIA Konstruksi Dalam Proses Pengerjaan</h3>
            <Table striped bordered hover>
              <thead className="thead-dark">
                <tr className="text-center">
                  <th>No</th>
                  <th>Kode Aset</th>
                  <th>Jenis Aset/ Nama Aset</th>
                  <th>Kode Register</th>
                  <th>Lokasi</th>
                  <th>Tanggal Mulai</th>
                  <th>Perkiraan Selesai</th>
                  <th>Persentase</th>
                  <th>Harga</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {/* Isi data KIA Konstruksi Dalam Proses Pengerjaan */}
              </tbody>
            </Table>
          </>
        );
      default:
        return null;
    }
  };

  const renderTableByOption = () => {
    switch (selectedOption) {
      case "Kartu Inventaris Aset":
        return (
          <>
            <h3 className="mb-4 text-center">Kartu Inventaris Aset</h3>
            {renderTabs()}
            {renderTableByTab()}
          </>
        );
      case "Kartu Inventaris Ruangan":
        return (
          <>
            <h3 className="mb-4 text-center">Kartu Inventaris Ruangan</h3>
            <Table striped bordered hover>
              <thead className="thead-dark">
                <tr className='text-center'>
                  <th rowSpan="2">No</th>
                  <th rowSpan="2">Jenis Aset/ Nama Aset</th>
                  <th rowSpan="2">Spesifikasi</th>
                  <th rowSpan="2">Aspek Legal</th>
                  <th rowSpan="2">Nomor Seri Pabrik</th>
                  <th rowSpan="2">Ukuran</th>
                  <th rowSpan="2">Bahan</th>
                  <th rowSpan="2">Tahun Pembuatan / Pembelian</th>
                  <th rowSpan="2">Jumlah Aset / Register</th>
                  <th rowSpan="2">Harga Beli / Perolehan</th>
                  <th colSpan="3">Kondisi Aset</th>
                  <th rowSpan="2">Keterangan Mutasi dll</th>
                  <th rowSpan="2">Ket</th>
                </tr>
                <tr className='text-center'>
                  <th>Baik (B)</th>
                  <th>Rusak Ringan (RR)</th>
                  <th>Rusak Berat (RB)</th>
                </tr>
              </thead>
              <tbody>
                {/* Isi data Kartu Inventaris Ruangan */}
              </tbody>
            </Table>
          </>
        );
      case "Daftar Mutasi Aset":
        return (
          <>
            <h3 className="mb-4 text-center">Daftar Mutasi Aset</h3>
            <Table striped bordered hover>
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
            </Table>
          </>
        );
      case "Daftar Peminjaman Aset":
        return (
          <>
            <h3 className="mb-4 text-center">Daftar Peminjaman Aset</h3>
            <Table striped bordered hover>
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
            </Table>
          </>
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
              <div className="table-responsive mt-3">
                {renderTableByOption()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetRecord;
