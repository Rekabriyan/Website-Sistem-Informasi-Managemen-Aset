import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/DashboardGA/Navbar";
import Sidebar from "../../components/DashboardGA/Sidebar";

const PermintaanLaporan = () => {
  const data = [
    { id: 1, jenis: "Buku Inventaris", kategori: "Periode Aset" },
    { id: 2, jenis: "Rekapitulasi Mutasi Aset", kategori: "Jenis Aset" },
    { id: 3, jenis: "Buku Inventaris", kategori: "Jenis Aset" },
    { id: 4, jenis: "Rekapitulasi Mutasi Aset", kategori: "Periode Aset" },
  ];

  return (
    <div id="wrapper" className="d-flex">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column w-100">
        <div id="content">
          <Navbar />
          <div className="container-fluid mt-4 px-4">
            <h1 className="mb-4">Permintaan Laporan</h1>
            <div className="table-responsive mt-3">
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>No</th>
                    <th>Jenis Laporan</th>
                    <th>Kategori</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}.</td>
                      <td>{item.jenis}</td>
                      <td>{item.kategori}</td>
                      <td>
                        <button className="btn btn-primary">Kirim</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermintaanLaporan;
