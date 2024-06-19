import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import NavbarSP from "../../components/DashboardSP/NavbarSP";
import SidebarSP from "../../components/DashboardSP/SidebarSP";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import './YourCSSFileName.css'; // Add the correct path to your CSS file

const MutasiAsetForm = () => {
  const [formData, setFormData] = useState({
    jenisMutasi: 'Luar Perusahaan',
    namaAset: '',
    namaPengguna: '',
    lokasiPengguna: '',
    namaCalonPengguna: '',
    ekspedisi: '',
    estimasiWaktu: '',
  });

  const navigate = useNavigate();

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
                <h1 className="text-center">Formulir Mutasi Aset</h1>
              </Col>
              <Col xs="auto">
                <Button variant="dark" onClick={() => navigate('/pengajuan-aset')}>Pengajuan saya</Button>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md={8}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="jenisMutasi" className="mb-3">
                    <Form.Label>Jenis Mutasi</Form.Label>
                    <Form.Control
                      as="select"
                      name="jenisMutasi"
                      value={formData.jenisMutasi}
                      onChange={handleChange}
                    >
                      <option value="Luar Perusahaan">Luar Perusahaan</option>
                      <option value="Dalam Perusahaan">Dalam Perusahaan</option>
                    </Form.Control>
                  </Form.Group>
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
                  {formData.jenisMutasi === 'Luar Perusahaan' && (
                    <>
                      <Form.Group controlId="ekspedisi" className="mb-3">
                        <Form.Label>Pilih Ekspedisi</Form.Label>
                        <Form.Control
                          type="text"
                          name="ekspedisi"
                          value={formData.ekspedisi}
                          onChange={handleChange}
                          placeholder="Masukkan Nama Ekspedisi"
                        />
                      </Form.Group>
                      <Form.Group controlId="estimasiWaktu" className="mb-3">
                        <Form.Label>Pilih Estimasi Waktu</Form.Label>
                        <Form.Control
                          type="text"
                          name="estimasiWaktu"
                          value={formData.estimasiWaktu}
                          onChange={handleChange}
                          placeholder="Masukkan Estimasi Waktu"
                        />
                      </Form.Group>
                    </>
                  )}
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

export default MutasiAsetForm;
