import React, { useState } from 'react';
import Navbar from "../../components/DashboardGA/Navbar";
import Sidebar from '../../components/DashboardGA/Sidebar';
import { Table, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PermintaanAset = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Semua Aset');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching for:', searchTerm, 'with filter:', filter);
    // You can implement filtering logic here
  };

  const data = [
    { kode: '03.010.04.01', nama: 'Daihatsu Terios', jenis: 'Mesin dan Peralatan', jumlah: 1, pengajuan: 'Ari', departemen: 'Logistik', tanggal: '20/5/2024', status: 'Belum Dikonfirmasi' },
    { kode: '03.011.01.01', nama: 'Honda Revo', jenis: 'Mesin dan Peralatan', jumlah: 1, pengajuan: 'Asep', departemen: 'Logistik', tanggal: '20/5/2024', status: 'Ditolak' },
    { kode: '03.02.74.01', nama: 'Asus Zenbook', jenis: 'Teknologi Informasi', jumlah: 1, pengajuan: 'Bagus', departemen: 'Keuangan', tanggal: '20/5/2024', status: 'Diterima' },
    { kode: '03.02.597.01', nama: 'Lenovo Ideapad', jenis: 'Teknologi Informasi', jumlah: 1, pengajuan: 'Bagas', departemen: 'Keuangan', tanggal: '20/5/2024', status: 'Diterima' },
  ];

  return (
    <>
      <div id='wrapper' className='d-flex'>
        <Sidebar />
        <div id='content-wrapper' className='d-flex flex-column w-100'>
          <div id='content'>
            <Navbar />
            <div className="container-fluid mt-4">
              <h1 className="mb-4">Permintaan Aset</h1>
              <div className="d-flex mb-3">
                <InputGroup className="me-3">
                  <Form.Control
                    type="text"
                    placeholder="Cari aset"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <Button variant="primary" onClick={handleSearch}>
                    <i className="fas fa-search"></i> Cari
                  </Button>
                </InputGroup>
                <Form.Select className="w-auto" value={filter} onChange={handleFilterChange}>
                  <option value="Semua Aset">Semua Aset</option>
                  {/* Tambahkan opsi filter lain sesuai kebutuhan */}
                </Form.Select>
              </div>
              <div className="table-wrapper">
                <Table striped bordered hover>
                  <thead className="table-dark">
                    <tr className="text-center">
                      <th>Kode Aset</th>
                      <th>Nama Aset</th>
                      <th>Jenis Aset</th>
                      <th>Jumlah Aset</th>
                      <th>Pengajuan Oleh</th>
                      <th>Departemen</th>
                      <th>Tanggal Pengajuan</th>
                      <th>Status Pengajuan</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td>{item.kode}</td>
                        <td>{item.nama}</td>
                        <td>{item.jenis}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.pengajuan}</td>
                        <td>{item.departemen}</td>
                        <td>{item.tanggal}</td>
                        <td>{item.status}</td>
                        <td>
                          <Button variant="success" className="me-2">Terima</Button>
                          <Button variant="danger">Tolak</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PermintaanAset;
