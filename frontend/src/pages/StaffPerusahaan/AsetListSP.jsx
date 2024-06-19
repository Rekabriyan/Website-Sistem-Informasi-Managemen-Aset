import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarSP from "../../components/DashboardSP/NavbarSP";
import SidebarSP from "../../components/DashboardSP/SidebarSP";
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
// import './YourCSSFileName.css'; // Add the correct path to your CSS file

const PeminjamanAsetForm = () => {
    const [formData, setFormData] = useState({
        namaAset: '',
        namaPengguna: '',
        lokasiPengguna: '',
        namaCalonPengguna: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [asetData, setAsetData] = useState([]);

    useEffect(() => {
        // Fetch data from API endpoint
        axios.get('https://api.yourendpoint.com/aset') // Ganti dengan URL endpoint Anda
            .then(response => {
                setAsetData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        setShowModal(false);
    };

    const handleShowModal = (title) => {
        setModalTitle(title);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div id="wrapper" className="d-flex">
            <SidebarSP />
            <div id="content-wrapper" className="d-flex flex-column w-100">
                <div id="content">
                    <NavbarSP />
                    <Container className="mt-5">
                        <Row className="justify-content-between align-items-center mb-4">
                            <Col>
                                <h1 className="text-center">Daftar Aset Tersedia</h1>
                            </Col>
                            <Col xs="auto">
                                <Button variant="dark">Pengajuan saya</Button>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col md={4}>
                                <Form.Control type="text" placeholder="Cari aset" />
                            </Col>
                            <Col xs="auto">
                                <Button variant="primary">Cari</Button>
                            </Col>
                            <Col xs="auto" className="ms-auto">
                                <Form.Control as="select">
                                    <option>Semua Jenis Aset</option>
                                    {/* Add more options as needed */}
                                </Form.Control>
                            </Col>
                        </Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
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
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {asetData.map(aset => (
                                    <tr key={aset.kodeAset}>
                                        <td>{aset.kodeAset}</td>
                                        <td>{aset.namaAset}</td>
                                        <td>{aset.jenisAset}</td>
                                        <td>{aset.aspekLegal}</td>
                                        <td>{aset.spesifikasi}</td>
                                        <td>{aset.harga}</td>
                                        <td>{aset.tahunPerolehan}</td>
                                        <td>{aset.riwayatPerolehan}</td>
                                        <td>{aset.kondisi}</td>
                                        <td>{aset.keterangan}</td>
                                        <td>
                                            <Button variant="warning" className="me-2" onClick={() => handleShowModal('Ajukan Aset')}>Ajukan</Button>
                                            <Button variant="success" onClick={() => handleShowModal('Pinjam Aset')}>Pinjam</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="namaStaf" className="mb-3">
                                    <Form.Label>Nama Staf</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="namaStaf"
                                        value={formData.namaStaf}
                                        onChange={handleChange}
                                        placeholder="Masukkan Nama Staf"
                                    />
                                </Form.Group>
                                <Form.Group controlId="departemenDivisi" className="mb-3">
                                    <Form.Label>Departemen/Divisi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="departemenDivisi"
                                        value={formData.departemenDivisi}
                                        onChange={handleChange}
                                        placeholder="Masukkan Departemen/Divisi"
                                    />
                                </Form.Group>
                                <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                                    Kembali
                                </Button>
                                <Button variant="primary" type="submit">
                                    Kirim Permintaan
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default PeminjamanAsetForm;