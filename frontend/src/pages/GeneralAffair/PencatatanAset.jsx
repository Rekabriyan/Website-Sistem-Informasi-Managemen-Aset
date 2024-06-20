import React, { useState, useEffect } from "react";
import Navbar from "../../components/DashboardGA/Navbar";
import Sidebar from "../../components/DashboardGA/Sidebar";
import { Table } from "react-bootstrap";
import axios from "axios";

const AssetRecord = () => {
  const [selectedOption, setSelectedOption] = useState("Kartu Inventaris Aset");
  const [allAsset, setAllAsset] = useState([]);
  const [allPeminjaman, setAllPeminjaman] = useState([]);
  const [semuaAsset, setSemuaAsset] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Mesin Peralatan");
  const [selectDepartemen, setSelectDepartemen] = useState("General Affair");
  const [rekapMutasi, setRekapMutasi] = useState([]);

  useEffect(() => {
    loadAsset();
    loadAllAsset();
    loadAllPeminjaman();
    loadDaftarMutasiAset();
    console.log("selectedTab:", selectedTab);
    console.log("selectDepartemen:", selectDepartemen);
    console.log("semuaAsset:", semuaAsset);
  }, [selectedTab, selectDepartemen, selectedOption]);

  const loadAsset = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5005/assets/all/${selectedTab}`
      );
      setAllAsset(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.error("Error loading asset data:", error);
    }
  };

  const loadAllAsset = async () => {
    try {
      const result = await axios.get(`http://localhost:5005/assets`);
      setSemuaAsset(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.error("Error loading asset data:", error);
    }
  };

  const loadAllPeminjaman = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5005/peminjaman`
      );
      setAllPeminjaman(result.data.data);
    } catch (error) {
      console.error("Error loading asset data:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleDepartemenChange = (event) => {
    setSelectDepartemen(event.target.value);
  };

  const renderTabs = () => {
    return (
      <div className="d-flex justify-content-between mb-3">
        {[
          "Lahan Tanah",
          "Bangunan",
          "Mesin Peralatan",
          "Teknologi Informasi",
          "Tetap Lainnya",
          "Konstruksi Dalam Proses Pengerjaan",
        ].map((tab) => (
          <div key={tab} className="p-2 bd-highlight">
            <button
              className={`btn ${
                selectedTab === tab ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => handleTabChange(tab)}
            >
              KIA {tab}
            </button>
          </div>
        ))}
      </div>
    );
  };

  const loadDaftarMutasiAset = async () => {
    try {
      const result = await axios.get("http://localhost:5005/laporan");
      setRekapMutasi(result.data.data);
    } catch (error) {
      console.error("Error loading rekap mutasi data:", error);
    }
  };

  const renderTable = () => {
    if (selectedTab === "Lahan Tanah") {
      return (
        <>
          {renderTabs()}
          <h3 className="mb-4 text-center">KIA Lahan Tanah</h3>
          <Table striped bordered hover>
            <thead className="thead-dark">
              <tr className="text-center">
                <th rowSpan="3">No</th>
                <th rowSpan="3">Jenis Aset/Nama Aset</th>
                <th colSpan="2">Nomor</th>
                <th rowSpan="3">Luas (m²)</th>
                <th rowSpan="3">Tahun</th>
                <th rowSpan="3">Letak/Alamat</th>
                <th colSpan="3">Status Tanah</th>
                <th rowSpan="3">Penggunaan</th>
                <th rowSpan="3">Asal Usul</th>
                <th rowSpan="3">Harga</th>
                <th rowSpan="3">Ket</th>
              </tr>
              <tr className="text-center">
                <th rowSpan="2">Kode Aset</th>
                <th rowSpan="2">Register</th>
                <th rowSpan="2">Hak</th>
                <th colSpan="2">Sertifikat</th>
              </tr>
              <tr className="text-center">
                <th>Tanggal</th>
                <th>Nomor</th>
              </tr>
            </thead>
            <tbody>
              {allAsset
                .filter(
                  (asset) => asset.status_ketersediaan !== "Telah Dimutasi"
                )
                .map((asset, index) => (
                  <tr key={asset.kode_asset} className="text-center">
                    <td>{index + 1}</td>
                    <td>{asset.nama_asset}</td>
                    <td>{asset.kode_asset}</td>
                    <td>{asset.kode_register}</td>
                    <td>{asset.spesifikasi}</td>
                    <td>{new Date(asset.tanggal_pembelian).getFullYear()}</td>
                    <td>{asset.lokasi}</td>
                    <td>-</td>
                    <td>{new Date(asset.tanggal_pembelian).toLocaleDateString()}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>{asset.asal_usul_pembelian}</td>
                    <td>{asset.harga}</td>
                    <td>{asset.pengguna_asset}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      );
    } else if (selectedTab === "Bangunan") {
      return (
        <>
          {renderTabs()}
          <h3 className="mb-4 text-center">KIA Bangunan</h3>
          <Table striped bordered hover>
            <thead className="thead-dark">
              <tr className="text-center">
                <th rowSpan="2">No</th>
                <th rowSpan="2">Jenis Aset/Nama Aset</th>
                <th colSpan="2">Nomor</th>
                <th rowSpan="2">Kondisi Aset</th>
                <th colSpan="2">Konstruksi Aset</th>
                <th rowSpan="2">Luas Lantai (m²)</th>
                <th rowSpan="2">Letak/Lokasi/Alamat</th>
                <th colSpan="2">Dokumen Gedung</th>
                <th rowSpan="2">Luas (m²)</th>
                <th rowSpan="2">Status Aset</th>
                <th rowSpan="2">Asal Usul</th>
                <th rowSpan="2">Harga</th>
                <th rowSpan="2">Ket</th>
              </tr>
              <tr className="text-center">
                <th>Kode Aset</th>
                <th>Register</th>
                <th>Bertingkat/Tidak</th>
                <th>Beton/Tidak</th>
                <th>Tanggal</th>
                <th>Nomor</th>
              </tr>
            </thead>
            <tbody>
              {allAsset
                .filter(
                  (asset) => asset.status_ketersediaan !== "Telah Dimutasi"
                )
                .map((asset, index) => (
                  <tr key={asset.kode_asset} className="text-center">
                    <td>{index + 1}</td>
                    <td>{asset.nama_asset}</td>
                    <td>{asset.kode_asset}</td>
                    <td>{asset.kode_register}</td>
                    <td>{asset.kondisi_asset}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>{asset.lokasi}</td>
                    <td>{new Date(asset.tanggal_pembelian).toLocaleDateString()}</td>
                    <td>-</td>
                    <td>{asset.spesifikasi}</td>
                    <td>-</td>
                    <td>{asset.asal_usul_pembelian}</td>
                    <td>{asset.harga}</td>
                    <td>{asset.pengguna_asset}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      );
    } else if (selectedTab === "Tetap Lainnya") {
      return (
        <>
          {renderTabs()}
          <h3 className="mb-4 text-center">KIA Tetap Lainnya</h3>
          <Table striped bordered hover>
            <thead className="thead-dark">
              <tr className="text-center">
                <th rowSpan="2">No</th>
                <th rowSpan="2">Nama Aset/Jenis Aset</th>
                <th colSpan="2">Nomor</th>
                <th colSpan="2">Buku/Pustaka</th>
                <th colSpan="3">Barang Bercorak Kesenian/Kebudayaan</th>
                <th colSpan="3">Hewan/Ternak dan Tumbuhan</th>
                <th rowSpan="2">Jumlah</th>
                <th rowSpan="2">Tahun Cetak/Pembelian</th>
                <th rowSpan="2">Asal Usul</th>
                <th rowSpan="2">Harga</th>
                <th rowSpan="2">Ket</th>
              </tr>
              <tr className="text-center">
                <th>Kode Aset</th>
                <th>Register</th>
                <th>Judul/Pencipta</th>
                <th>Spesifikasi</th>
                <th>Asal Daerah</th>
                <th>Pencipta</th>
                <th>Bahan</th>
                <th>Jenis</th>
                <th>Ukuran</th>
              </tr>
            </thead>
            <tbody>
              {allAsset
                .filter(
                  (asset) => asset.status_ketersediaan !== "Telah Dimutasi"
                )
                .map((asset, index) => (
                  <tr key={asset.kode_asset} className="text-center">
                    <td>{index + 1}</td>
                    <td>{asset.nama_asset}</td>
                    <td>{asset.kode_asset}</td>
                    <td>{asset.kode_register}</td>
                    <td>{asset.judul_pencipta}</td>
                    <td>{asset.spesifikasi}</td>
                    <td>{asset.asal_daerah}</td>
                    <td>{asset.pencipta}</td>
                    <td>{asset.bahan}</td>
                    <td>{asset.jenis}</td>
                    <td>{asset.ukuran}</td>
                    <td>{asset.jumlah}</td>
                    <td>{new Date(asset.tahun_pembelian).getFullYear()}</td>
                    <td>{asset.asal_usul}</td>
                    <td>{asset.harga}</td>
                    <td>{asset.pengguna_aset} / {asset.lokasi}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      );
    } else {
      return (
        <>
          {renderTabs()}
          <h3 className="mb-4 text-center">KIA {selectedTab}</h3>
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
              {allAsset
                .filter(
                  (asset) => asset.status_ketersediaan !== "Telah Dimutasi"
                )
                .map((asset, index) => (
                  <tr key={asset.kode_asset} className="text-center">
                    <td>{index + 1}</td>
                    <td>{asset.kode_asset}</td>
                    <td>{asset.nama_asset}</td>
                    <td>{asset.kode_register}</td>
                    <td>{asset.kondisi_asset === "Baik" ? "B" : ""}</td>
                    <td>
                      {asset.kondisi_asset === "Rusak Ringan" ? "RR" : ""}
                    </td>
                    <td>{asset.kondisi_asset === "Rusak Berat" ? "RB" : ""}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      {new Date(asset.tanggal_pembelian).toLocaleDateString()}
                    </td>
                    <td>{asset.asal_usul_pembelian}</td>
                    <td>{asset.harga}</td>
                    <td>{asset.pengguna_aset}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      );
    }
  };

  const renderTableByOption = () => {
    switch (selectedOption) {
      case "Kartu Inventaris Aset":
        return (
          <>
            <h3 className="mb-4 text-center">Kartu Inventaris Aset</h3>
            {renderTable()}
          </>
        );
      case "Kartu Inventaris Ruangan":
        return (
          <>
            <div className="d-flex justify-content-between mb-3">
              <select
                className="form-select w-auto"
                value={selectDepartemen}
                onChange={handleDepartemenChange}
              >
                <option value="General Affair">General Affair</option>
                <option value="Human Resource">Human Resource</option>
              </select>
            </div>

            <h3 className="mb-4 text-center">Kartu Inventaris Ruangan</h3>
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
                  <th rowSpan="2">Harga Beli / Perolehan</th>
                  <th colSpan="3">Kondisi Aset</th>
                  <th rowSpan="2">Keterangan Mutasi dll</th>
                  <th rowSpan="2">Ket</th>
                </tr>
                <tr className="text-center">
                  <th>Baik (B)</th>
                  <th>Rusak Ringan (RR)</th>
                  <th>Rusak Berat (RB)</th>
                </tr>
              </thead>
              <tbody>
                {semuaAsset
                  .filter(
                    (asset) =>
                      asset.status_ketersediaan !== "Telah Dimutasi" &&
                      asset.lokasi === selectDepartemen
                  )
                  .map((asset, index) => (
                    <tr key={asset.kode_asset} className="text-center">
                      <td>{index + 1}</td>
                      <td>{asset.nama_asset}</td>
                      <td>{asset.spesifikasi}</td>
                      <td>{asset.aspek_legal}</td>
                      <td> - </td>
                      <td> - </td>
                      <td> - </td>
                      <td>{new Date(asset.tanggal_pembelian).getFullYear()}</td>
                      <td>{asset.jumlah_asset}</td>
                      <td>{asset.harga}</td>
                      {asset.kondisi_asset === "Baik" ? <td>B</td> : <td></td>}
                      {asset.kondisi_asset === "Rusak Ringan" ? (
                        <td>RR</td>
                      ) : (
                        <td></td>
                      )}
                      {asset.kondisi_asset === "Rusak Berat" ? (
                        <td>RB</td>
                      ) : (
                        <td></td>
                      )}
                      <td> - </td>
                      <td>{asset.keterangan}</td>
                    </tr>
                  ))}
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
                  <th>Aset</th>
                  <th>Harga</th>
                  <th>Aset</th>
                  <th>Harga</th>
                </tr>
              </thead>
              <tbody>
                      {rekapMutasi.map((rekap, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{rekap.kode_aset}</td>
                          <td>{rekap.nama_aset}</td>
                          <td className="text-center">{rekap.kode_register}</td>
                          <td className="text-center">{rekap.asset.spesifikasi}</td>
                          <td className="text-center">-</td>
                          <td className="text-center">{rekap.asset.aspek_legal}</td>
                          <td>
                            {new Date(rekap.asset.tanggal_pembelian).toLocaleDateString()}
                          </td>
                          <td className="text-center">{rekap.asset.asal_usul_pembelian}</td>
                          <td>{rekap.asset.harga}</td>
                          <td>{rekap.asset.kondisi_asset === "Baik" ? "B" : ""}</td>
                          <td>
                            {rekap.asset.kondisi_asset === "Rusak Ringan" ? "RR" : ""}
                          </td>
                          <td>{rekap.asset.kondisi_asset === "Rusak Berat" ? "RB" : ""}</td>
                          <td className="text-center">{rekap.jumlah_awal}</td>
                          <td className="text-center">{rekap.harga_awal}</td>
                          <td className="text-center">{rekap.perubahan_jumlah}</td>
                          <td className="text-center">{rekap.perubahan_harga}</td>
                          <td className="text-center">{rekap.jumlah_akhir}</td>
                          <td className="text-center">{rekap.harga_akhir}</td>
                          <td className="text-center">{rekap.asset.pengguna_asset}</td>
                        </tr>
                      ))}
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
                  <th rowSpan="2">Nama Aset / Jenis Aset</th>
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
              {allPeminjaman
                .map((peminjaman, index) => (
                  <tr key={peminjaman.id} className="text-center">
                    <td>{index + 1}</td>
                    <td>{peminjaman.nama_aset} / {peminjaman.jenis_asset}</td>
                    <td>{peminjaman.spesifikasi}</td>
                    <td>{peminjaman.aspek_legal}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>{new Date(peminjaman.tanggal_pembelian).getFullYear()}</td>
                    <td>{peminjaman.kode_register}</td>
                    <td>{peminjaman.kondisi_asset === "Baik" ? "B" : ""}</td>
                    <td>
                      {peminjaman.kondisi_asset === "Rusak Ringan" ? "RR" : ""}
                    </td>
                    <td>{peminjaman.kondisi_asset === "Rusak Berat" ? "RB" : ""}</td>
                    <td>
                      {new Date(peminjaman.tanggal_peminjaman).toLocaleDateString()}
                    </td>
                    <td>{peminjaman.nama_peminjam}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                ))}
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
      <div id="wrapper" className="d-flex">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column w-100">
          <div id="content">
            <Navbar />
            <div className="container-fluid mt-4">
              <h1 className="mb-4">Pencatatan Aset</h1>
              <div className="d-flex align-items-center mb-3">
                <select
                  className="form-select w-auto"
                  value={selectedOption}
                  onChange={handleSelectChange}
                >
                  <option value="Kartu Inventaris Aset">
                    Kartu Inventaris Aset
                  </option>
                  <option value="Kartu Inventaris Ruangan">
                    Kartu Inventaris Ruangan
                  </option>
                  <option value="Daftar Mutasi Aset">Daftar Mutasi Aset</option>
                  <option value="Daftar Peminjaman Aset">
                    Daftar Peminjaman Aset
                  </option>
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
