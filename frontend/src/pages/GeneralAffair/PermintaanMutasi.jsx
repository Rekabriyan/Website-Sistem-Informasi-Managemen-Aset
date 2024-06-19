import React, { useState } from 'react';
import { Table, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/DashboardGA/Navbar";
import Sidebar from "../../components/DashboardGA/Sidebar";
import axios from 'axios';
import { useEffect } from 'react';

const PermintaanMutasi = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Semua Aset');
  const navigate = useNavigate();
  const [allRequest, setAllRequest] = useState([]);
  const [idAsset, setIdAsset] = useState(0);
  const [asset, setAsset] = useState([]);
  const [konfirmasi, setKonfirmasi] = useState({
    status: "",
    role: "",
    id_asset: 0,
    approved_by: "Rudi",
  });

  useEffect(() => {
    loadRequest();
  }, []);

  const loadRequest = async () => {
    try {
      const result = await axios.get(`http://localhost:5005/requests/mutasi`);
      setAllRequest(result.data.data);
    } catch (error) {
      console.error("Error loading asset data:", error);
    }
  };

  const loadAsset = async () => {
    try {
      const result = await axios.get(`http://localhost:5005/assets/byid/${idAsset}`);
      setAsset(result.data.data);
    } catch (error) {
      console.error("Error loading asset data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm, 'with filter:', filter);
  };

  const handleTerima = async (id, assetid) => {
    try {
      const result = await axios.put(`http://localhost:5005/requests/confirmation/${id}`, {
        status: 'Diterima',
        id_asset: assetid,
        role: "general affair",
        approved_by: "Rudi"
      });
      console.log(result);
      loadRequest();
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleTolak = async (id, assetid) => {
    try {
      const result = await axios.put(`http://localhost:5005/requests/confirmation/${id}`, {
        status: 'Ditolak',
        id_asset: assetid,
        role: "general affair",
        approved_by: "Rudi"
      });
      console.log(result);
      loadRequest();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <>
      <div id='wrapper' className='d-flex'>
        <Sidebar />
        <div id='content-wrapper' className='d-flex flex-column w-100'>
          <div id='content'>
            <Navbar />
            <div className="container-fluid mt-4">
              <h1 className="mb-4">Permintaan Mutasi</h1>
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
                    {allRequest.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td>{item.asset.kode_asset}</td>
                        <td>{item.asset.nama_asset}</td>
                        <td>{item.asset.jenis_asset}</td>
                        <td>{item.asset.jumlah_asset}</td>
                        <td>{item.nama_calon_pengguna}</td>
                        <td>{item.calon_lokasi_pengguna}</td>
                        <td>{new Date(item.tanggal_permintaan).toLocaleDateString()}</td>
                        <td>{item.status}</td>
                        <td>
                          {item.status === "Diterima" || item.status === "Ditolak" ? (
                            <Button variant="secondary" disabled>Surat Keterangan</Button>
                          ) : (
                            <>
                              <Button
                                variant="success"
                                className="me-2"
                                onClick={() => handleTerima(item.id, item.id_asset)}
                              >
                                Terima
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => handleTolak(item.id, item.id_asset)}
                              >
                                Tolak
                              </Button>
                            </>
                          )}
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

export default PermintaanMutasi;
