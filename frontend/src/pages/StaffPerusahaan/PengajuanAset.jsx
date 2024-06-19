import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarSP from "../../components/DashboardSP/NavbarSP";
import SidebarSP from "../../components/DashboardSP/SidebarSP";
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
// import './YourCSSFileName.css'; // Add the correct path to your CSS file

const PengajuanAset = () => {
  const [formData, setFormData] = useState({
    search: '',
    filter: 'Semua Aset',
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
            <h1 className="mb-4 text-center">Pengajuan Aset</h1>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-4">
                <Col md={4}>
                  <Form.Control
                    type="text"
                    name="search"
                    value={formData.search}
                    onChange={handleChange}
                    placeholder="Cari aset"
                  />
                </Col>
                <Col xs="auto">
                  <Button variant="primary" type="submit">Cari</Button>
                </Col>
                <Col xs="auto" className="ms-auto">
                  <Form.Control
                    as="select"
                    name="filter"
                    value={formData.filter}
                    onChange={handleChange}
                  >
                    <option>Semua Aset</option>
                    {/* Add more options as needed */}
                  </Form.Control>
                </Col>
              </Row>
            </Form>
            <Table striped bordered hover>
              <thead>
                <tr>
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
                <tr>
                  <td>03.02.74.01</td>
                  <td>Asus Zenbook</td>
                  <td>Teknologi Informasi</td>
                  <td>1</td>
                  <td>Bagus</td>
                  <td>Keuangan</td>
                  <td>20/5/2024</td>
                  <td>Diterima</td>
                  <td>
                    <Button variant="dark">Serah Terima</Button>
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

export default PengajuanAset;
