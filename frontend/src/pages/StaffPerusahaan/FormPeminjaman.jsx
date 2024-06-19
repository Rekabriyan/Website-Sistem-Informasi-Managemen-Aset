import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarSP from "../../components/DashboardSP/NavbarSP";
import SidebarSP from "../../components/DashboardSP/SidebarSP";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import './YourCSSFileName.css'; // Add the correct path to your CSS file

const PeminjamanAsetForm = () => {
  const [formData, setFormData] = useState({
    namaAset: '',
    namaPengguna: '',
    lokasiPengguna: '',
    namaCalonPengguna: '',
  });

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
                <h1 className="text-center">Formulir Peminjaman Aset</h1>
              </Col>
              <Col xs="auto">
                <Button variant="dark">Pengajuan saya</Button>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md={8}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="namaAset" className="mb-3">
                    <Form.Label>Nama Aset</Form.Label>
                    <Form.Control
                      type="text"
                      name="namaAset"
                      value={formData.namaAset}
                      onChange={handleChange}
                      placeholder="Masukkan Nama Aset"
                    />
                  </Form.Group>
                  <Form.Group controlId="namaPengguna" className="mb-3">
                    <Form.Label>Nama Pengguna</Form.Label>
                    <Form.Control
                      type="text"
                      name="namaPengguna"
                      value={formData.namaPengguna}
                      onChange={handleChange}
                      placeholder="Masukkan Nama Pengguna"
                    />
                  </Form.Group>
                  <Form.Group controlId="lokasiPengguna" className="mb-3">
                    <Form.Label>Lokasi Pengguna Saat ini</Form.Label>
                    <Form.Control
                      type="text"
                      name="lokasiPengguna"
                      value={formData.lokasiPengguna}
                      onChange={handleChange}
                      placeholder="Masukkan Lokasi Pengguna Saat ini"
                    />
                  </Form.Group>
                  <Form.Group controlId="namaCalonPengguna" className="mb-3">
                    <Form.Label>Nama Calon Pengguna</Form.Label>
                    <Form.Control
                      type="text"
                      name="namaCalonPengguna"
                      value={formData.namaCalonPengguna}
                      onChange={handleChange}
                      placeholder="Masukkan Nama Calon Pengguna"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default PeminjamanAsetForm;
