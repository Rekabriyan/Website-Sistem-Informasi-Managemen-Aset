import React, { useState, useEffect } from 'react';
import Navbar from "../../components/DashboardGA/Navbar";
import Sidebar from '../../components/DashboardGA/Sidebar';
import { Table, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PermintaanAset = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Semua Aset');
  const navigate = useNavigate();
  const [allRequest, setAllRequest] = useState([]);
  const [idAsset, setIdAsset] = useState(0);
  const [asset, setAsset] = useState([]);
  const [idPermintaan, setIdPermintaan] = useState([]);
  const [konfirmasi, setKonfirmasi] = useState({
    status: "",
    role: "",
    id_asset: 0,
    approved_by: "Rudi",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    nama_asset: '',
    kode_asset: '',
    aspek_legal: '',
    harga: 0,
    kondisi_asset: '',
    asal_usul_pembelian: ''
    // Add other fields as needed
  });

  useEffect(() => {
    loadRequest();
  }, []);

  const loadRequest = async () => {
    try {
      const result = await axios.get(`http://localhost:5005/requests/pengajuan`);
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

  const handleTerima = async (id, assetid, tipePermintaan, nama_asset) => {
    if (tipePermintaan === "Pengajuan Baru") {
      setShowModal(true);
      setIdAsset(assetid);
      setIdPermintaan(id); // Set idAsset to use it in the modal form submission
      setModalData({
        ...modalData,
        nama_asset: nama_asset, // Set the asset name in the modal data
      });
    } else {
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

  const handleModalSubmit = async () => {
    try {

      modalData.harga = parseInt(modalData.harga);
      // Include modalData fields in the request as needed
      const result = await axios.put(`http://localhost:5005/requests/confirmation/${idPermintaan}`, {
        status: 'Diterima',
        id: idPermintaan,
        id_asset: idAsset,
        role: "general affair",
        approved_by: "Rudi",
        ...modalData // Include additional fields from modalData
      });
      console.log(result);
      loadRequest();
      setShowModal(false);
    } catch (error) {
      console.error("Error accepting request with modal data:", error);
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
                    {allRequest.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td>{item.asset.kode_asset}</td>
                        <td>{item.asset.nama_asset}</td>
                        <td>{item.asset.jenis_asset}</td>
                        <td>{item.asset.jumlah_asset}</td>
                        <td>{item.nama_pengguna}</td>
                        <td>{item.lokasi_pengguna}</td>
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
                                onClick={() => handleTerima(item.id, item.id_asset, item.tipe_permintaan, item.asset.nama_asset)}
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

      {/* Modal for additional input when "Pengajuan Baru" */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Input Aset Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nama_asset">
              <Form.Label>Nama Aset</Form.Label>
              <Form.Control
                type="text"
                value={modalData.nama_asset}
                onChange={(e) => setModalData({ ...modalData, nama_asset: e.target.value })}
                readOnly // Make this field read-only if it should not be editable
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="kode_asset">
              <Form.Label>Kode Aset</Form.Label>
              <Form.Control
                type="text"
                value={modalData.kode_asset}
                onChange={(e) => setModalData({ ...modalData, kode_asset: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="aspek_legal">
              <Form.Label>Aspek Legal</Form.Label>
              <Form.Control
                type="text"
                value={modalData.aspek_legal}
                onChange={(e) => setModalData({ ...modalData, aspek_legal: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="harga">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="number"
                value={modalData.harga}
                onChange={(e) => setModalData({ ...modalData, harga: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="kondisi_asset">
              <Form.Label>Kondisi Aset</Form.Label>
              <Form.Control
                type="text"
                value={modalData.kondisi_asset}
                onChange={(e) => setModalData({ ...modalData, kondisi_asset: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="asal_usul_pembelian">
              <Form.Label>Asal Usul Pembelian</Form.Label>
              <Form.Control
                type="asal_usul_pembelian"
                value={modalData.asal_usul_pembelian}
                onChange={(e) => setModalData({ ...modalData, asal_usul_pembelian: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PermintaanAset;
