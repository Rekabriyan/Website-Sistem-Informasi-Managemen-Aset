import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarSP from "../../components/DashboardSP/NavbarSP";
import SidebarSP from "../../components/DashboardSP/SidebarSP";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
// import './YourCSSFileName.css'; // Add the correct path to your CSS file

const MutasiAsetForm = () => {
  const [formData, setFormData] = useState({
    id_user: parseInt(Cookies.get('userid')),
    tipe_permintaan: 'Luar Perusahaan',
    kode_asset: '',
    nama_pengguna: '',
    lokasi_pengguna: '',
    nama_calon_pengguna: '',
    calon_lokasi_pengguna: '',
    ekspedisi: '',
    estimasi: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if(formData.tipe_permintaan === "Dalam Perusahaan"){
      formData.calon_lokasi_pengguna = '-';
      formData.ekspedisi = null;
      formData.estimasi = null;
    }else{
      formData.estimasi = parseInt(formData.estimasi);
    }

    console.log(formData);
    try {
        const response = await axios.post('http://localhost:5005/requests/mutasi', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Form data submitted:', response.data);
    } catch (error) {
        console.error('There was a problem with the axios operation:', error);
        // Handle error response
    }
}

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
                  <Form.Group controlId="tipe_permintaan" className="mb-3">
                    <Form.Label>Jenis Mutasi</Form.Label>
                    <Form.Control
                      as="select"
                      name="tipe_permintaan"
                      value={formData.tipe_permintaan}
                      onChange={handleChange}
                    >
                      <option value="Luar Perusahaan">Luar Perusahaan</option>
                      <option value="Dalam Perusahaan">Dalam Perusahaan</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="kode_asset" className="mb-3">
                    <Form.Label>Kode Aset</Form.Label>
                    <Form.Control
                      type="text"
                      name="kode_asset"
                      value={formData.kode_asset}
                      onChange={handleChange}
                      placeholder="Masukkan Nama Aset"
                    />
                  </Form.Group>
                  <Form.Group controlId="nama_pengguna" className="mb-3">
                    <Form.Label>Nama Pengguna</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama_pengguna"
                      value={formData.nama_pengguna}
                      onChange={handleChange}
                      placeholder="Masukkan Nama Pengguna"
                    />
                  </Form.Group>
                  <Form.Group controlId="lokasi_pengguna" className="mb-3">
                    <Form.Label>Lokasi Pengguna Saat ini</Form.Label>
                    <Form.Control
                      type="text"
                      name="lokasi_pengguna"
                      value={formData.lokasi_pengguna}
                      onChange={handleChange}
                      placeholder="Masukkan Lokasi Pengguna Saat ini"
                    />
                  </Form.Group>
                  <Form.Group controlId="nama_calon_pengguna" className="mb-3">
                    <Form.Label>Nama Calon Pengguna</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama_calon_pengguna"
                      value={formData.nama_calon_pengguna}
                      onChange={handleChange}
                      placeholder="Masukkan Nama Calon Pengguna"
                    />
                  </Form.Group>
                  {formData.tipe_permintaan === 'Luar Perusahaan' && (
                    <>
                      <Form.Group controlId="calon_lokasi_pengguna" className="mb-3">
                        <Form.Label>Lokasi Calon Pengguna</Form.Label>
                        <Form.Control
                          type="text"
                          name="calon_lokasi_pengguna"
                          value={formData.calon_lokasi_pengguna}
                          onChange={handleChange}
                          placeholder="Masukkan Lokasi Calon Pengguna"
                        />
                      </Form.Group>
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
                      <Form.Group controlId="estimasi" className="mb-3">
                        <Form.Label>Pilih Estimasi Waktu (Dalam Hari)</Form.Label>
                        <Form.Control
                          type="number"
                          name="estimasi"
                          value={formData.estimasi}
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