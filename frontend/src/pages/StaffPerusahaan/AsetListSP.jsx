import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarSP from "../../components/DashboardSP/NavbarSP";
import SidebarSP from "../../components/DashboardSP/SidebarSP";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import Cookies from "js-cookie";
// import './YourCSSFileName.css'; // Add the correct path to your CSS file

const PeminjamanAsetForm = () => {
  const [formData, setFormData] = useState({
    id_user: parseInt(Cookies.get("userid")),
    id_asset: "",
    tipe_permintaan: "",
    nama_pengguna: "",
    lokasi_pengguna: "",
    nama_asset: "",
    jenis_asset: "",
    spesifikasi: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [idAset, setIdAset] = useState("");
  const [tipePermintaan, setTipePermintaan] = useState("");
  const [asetData, setAsetData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Fetch data from API endpoint
    axios
      .get("http://localhost:5005/assets") // Ganti dengan URL endpoint Anda
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setAsetData(response.data.data);
        } else {
          console.error("Error: API did not return an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleShow = (title, id_aset, tipe_permintaan) => {
    setIdAset(id_aset);
    setModalTitle(title);
    setTipePermintaan(tipe_permintaan);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.id_asset = idAset;
    formData.tipe_permintaan = tipePermintaan;

    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5005/request",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Form data submitted:", response.data);

      // Handle success response
      setShowModal(false);
    } catch (error) {
      console.error("There was a problem with the axios operation:", error);
      // Handle error response
    }
  };

  const handleShowModal = (title, id_aset, tipe_permintaan) => {
    setIdAset(id_aset);
    setModalTitle(title);
    setTipePermintaan(tipe_permintaan);
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
              <Col xs="auto">
                <Button variant="success" onClick={() =>
                              handleShow(
                                "Ajukan Aset",
                                "-",
                                "Pengajuan Baru"
                              )
                            }>
                  Ajukan Aset
                </Button>
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
                  <th>Tanggal Pembelian</th>
                  <th>Asal Usul Pembelian</th>
                  <th>Kondisi</th>
                  <th>Keterangan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {asetData.length > 0 ? (
                  asetData
                    .filter((aset) => aset.status_ketersediaan === "Tersedia")
                    .map((aset) => (
                      <tr key={aset.id}>
                        <td>{aset.kode_asset}</td>
                        <td>{aset.nama_asset}</td>
                        <td>{aset.jenis_asset}</td>
                        <td>{aset.aspek_legal}</td>
                        <td>{aset.spesifikasi}</td>
                        <td>{aset.harga}</td>
                        <td>
                          {new Date(
                            aset.tanggal_pembelian
                          ).toLocaleDateString()}
                        </td>
                        <td>{aset.asal_usul_pembelian}</td>
                        <td>{aset.kondisi_asset}</td>
                        <td>{aset.status_ketersediaan}</td>
                        <td className="text-center">
                          <Button
                            variant="warning"
                            className="mb-1"
                            onClick={() =>
                              handleShowModal(
                                "Ajukan Aset",
                                aset.id,
                                "Pengajuan"
                              )
                            }
                          >
                            Ajukan
                          </Button>
                          <Button
                            variant="success"
                            className="mt-1"
                            onClick={() =>
                              handleShowModal(
                                "Pinjam Aset",
                                aset.id,
                                "Peminjaman"
                              )
                            }
                          >
                            Pinjam
                          </Button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center">
                      Tidak ada data aset
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Container>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nama_pengguna" className="mb-3">
                  <Form.Label>Nama Staf</Form.Label>
                  <Form.Control
                    type="text"
                    name="nama_pengguna"
                    value={formData.nama_pengguna}
                    onChange={handleChange}
                    placeholder="Masukkan Nama Staf"
                  />
                </Form.Group>
                <Form.Group controlId="lokasi_pengguna" className="mb-3">
                  <Form.Label>Departemen/Divisi</Form.Label>
                  <Form.Control
                    type="text"
                    name="lokasi_pengguna"
                    value={formData.lokasi_pengguna}
                    onChange={handleChange}
                    placeholder="Masukkan Departemen/Divisi"
                  />
                </Form.Group>
                <Button
                  variant="secondary"
                  onClick={handleCloseModal}
                  className="me-2"
                >
                  Kembali
                </Button>
                <Button variant="primary" type="submit">
                  Kirim Permintaan
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Ajukan Aset Baru</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nama_asset">
                  <Form.Label>Nama Aset</Form.Label>
                  <Form.Control
                    type="text"
                    name="nama_asset"
                    value={formData.nama_asset}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="jenis_asset">
                  <Form.Label>Jenis Aset</Form.Label>
                  <Form.Control
                    as="select"
                    name="jenis_asset"
                    value={formData.jenis_asset}
                    onChange={handleChange}
                    required
                  >
                    <option value="Lahan Tanah">Lahan Tanah</option>
                    <option value="Bangunan">Bangunan</option>
                    <option value="Mesin Peralatan">Mesin Peralatan</option>
                    <option value="Teknologi Informasi">Teknologi Informasi</option>
                    <option value="Kontruksi Dalam Proses Pengerjaan">Kontruksi Dalam Proses Pengerjaan</option>
                    <option value="Lainnya">Lainnya</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="spesifikasi">
                  <Form.Label>Spesifikasi</Form.Label>
                  <Form.Control
                    type="text"
                    name="spesifikasi"
                    value={formData.spesifikasi}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="nama_pengguna">
                  <Form.Label>Nama Pengguna</Form.Label>
                  <Form.Control
                    type="text"
                    name="nama_pengguna"
                    value={formData.nama_pengguna}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="lokasi_pengguna">
                  <Form.Label>Lokasi Pengguna</Form.Label>
                  <Form.Control
                    type="text"
                    name="lokasi_pengguna"
                    value={formData.lokasi_pengguna}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button className="mt-4" variant="primary" type="submit">
                  Simpan
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
