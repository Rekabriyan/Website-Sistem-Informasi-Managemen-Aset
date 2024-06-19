import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarSP from "../../components/DashboardSP/NavbarSP";
import SidebarSP from "../../components/DashboardSP/SidebarSP";
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
// import './YourCSSFileName.css'; // Add the correct path to your CSS file

const MintaLaporanAset = () => {
  const [formData, setFormData] = useState({
    jenisLaporan: '',
    kategoriAset: '',
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
            <h1 className="mb-4 text-center">Minta Laporan Aset</h1>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="jenisLaporan">
                    <Form.Label>Jenis Laporan</Form.Label>
                    <Form.Control
                      as="select"
                      name="jenisLaporan"
                      value={formData.jenisLaporan}
                      onChange={handleChange}
                    >
                      <option value="">Pilih Jenis Laporan</option>
                      <option value="Buku Inventaris">Buku Inventaris</option>
                      <option value="Rekapitulasi Mutasi Aset">Rekapitulasi Mutasi Aset</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="kategoriAset">
                    <Form.Label>Kategori Aset</Form.Label>
                    <Form.Control
                      as="select"
                      name="kategoriAset"
                      value={formData.kategoriAset}
                      onChange={handleChange}
                    >
                      <option value="">Pilih Kategori Aset</option>
                      <option value="Tahun Aset">Tahun Aset</option>
                      <option value="Jenis Aset">Jenis Aset</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="warning" type="submit">Minta</Button>
            </Form>
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Jenis Laporan</th>
                  <th>Kategori Aset</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Buku Inventaris</td>
                  <td>Periode Aset</td>
                  <td>
                    <Button variant="link">
                      <i className="bi bi-download"></i>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default MintaLaporanAset;
