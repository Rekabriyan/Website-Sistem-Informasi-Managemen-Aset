import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/DashboardGA/Sidebar';
import Navbar from '../components/DashboardGA/Navbar';
import { Card, Row, Col, Container } from 'react-bootstrap';

const Report = () => {
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <Container fluid className="mt-4">
            <Row className="mb-4">
              <Col>
                <Link to="/permintaan-aset">
                  <Card className="text-center">
                    <Card.Body>
                      <h4>1</h4>
                      <p>Permintaan Aset</p>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col>
                <Link to="/peminjaman-aset"> {/* Tambahkan Link ke Peminjaman Aset */}
                  <Card className="text-center">
                    <Card.Body>
                      <h4>1</h4>
                      <p>Peminjaman Aset</p>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col>
                <Card className="text-center">
                  <Card.Body>
                    <h4>1</h4>
                    <p>Permintaan Mutasi</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="text-center">
                  <Card.Body>
                    <h4>0</h4>
                    <p>Permintaan Laporan Aset</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Header className="bg-warning text-white">Jumlah Aset Berdasarkan Jenis</Card.Header>
                  <Card.Body>
                    {/* <Pie data={pieData} /> */}
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header className="bg-warning text-white">Kebutuhan Aset Berdasarkan Jenis</Card.Header>
                  <Card.Body>
                    {/* <Bar data={barData} /> */}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Report;
