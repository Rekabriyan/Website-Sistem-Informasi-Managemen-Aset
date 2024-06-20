import React, { useState, useEffect } from 'react';
import Navbar from "../../components/DashboardGA/Navbar";
import Sidebar from '../../components/DashboardGA/Sidebar';
import { Modal, Button, Form } from 'react-bootstrap';

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    kode_asset: '',
    nama_asset: '',
    jenis_asset: '',
    jumlah_asset: '',
    status_asset: '',
    lokasi_asset: '',
    tanggal_pembelian: '',
    asal_usul_perolehan: '',
    keterangan_asset: '',
    nama_pengguna: '' 
  });

  useEffect(() => {
    fetch('http://localhost:5005/assets')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAssets(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5005/assets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAssets([...assets, data]);
        handleClose();
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      fetch(`http://localhost:5005/assets?search=${searchQuery}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setAssets(data.data);
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      fetch('http://localhost:5005/assets')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setAssets(data.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div id="wrapper" className="d-flex">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column w-100">
          <div id="content">
            <Navbar />
            <div className="container-fluid mt-4">
              <h1 className="mb-4">Daftar Aset</h1>
              <div className="d-flex mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search assets"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="mr-2"
                />
                <Button variant="primary" onClick={handleSearch}>
                  Search
                </Button>
              </div>
              <div className="table-responsive mt-3">
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Kode Asset</th>
                      <th scope="col">Nama Asset</th>
                      <th scope="col">Jenis Asset</th>
                      <th scope="col">Jumlah Asset</th>
                      <th scope="col">Status Asset</th>
                      <th scope="col">Lokasi Asset</th>
                      <th scope="col">Tanggal Pembelian</th>
                      <th scope="col">Asal Usul Perolehan</th>
                      <th scope="col">Keterangan</th>
                      <th scope="col">Nama Pengguna</th> {/* New column for user name */}
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((asset) => (
                      <tr key={asset.kode_asset}>
                        <td>{asset.kode_asset}</td>
                        <td>{asset.nama_asset}</td>
                        <td>{asset.jenis_asset}</td>
                        <td>{asset.jumlah_asset}</td>
                        <td>{asset.status_asset}</td>
                        <td>{asset.lokasi_asset}</td>
                        <td>{new Date(asset.tanggal_pembelian).toLocaleDateString()}</td>
                        <td>{asset.asal_usul_perolehan}</td>
                        <td>{asset.keterangan_asset}</td>
                        <td>{asset.nama_pengguna}</td> {/* Display user name */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambahkan Aset Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="kode_asset">
              <Form.Label>Kode Asset</Form.Label>
              <Form.Control
                type="text"
                name="kode_asset"
                value={formData.kode_asset}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="nama_asset">
              <Form.Label>Nama Asset</Form.Label>
              <Form.Control
                type="text"
                name="nama_asset"
                value={formData.nama_asset}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="jenis_asset">
              <Form.Label>Jenis Asset</Form.Label>
              <Form.Control
                type="text"
                name="jenis_asset"
                value={formData.jenis_asset}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="jumlah_asset">
              <Form.Label>Jumlah Asset</Form.Label>
              <Form.Control
                type="number"
                name="jumlah_asset"
                value={formData.jumlah_asset}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="status_asset">
              <Form.Label>Status Asset</Form.Label>
              <Form.Control
                type="text"
                name="status_asset"
                value={formData.status_asset}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="lokasi_asset">
              <Form.Label>Lokasi Asset</Form.Label>
              <Form.Control
                type="text"
                name="lokasi_asset"
                value={formData.lokasi_asset}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="tanggal_pembelian">
              <Form.Label>Tanggal Pembelian</Form.Label>
              <Form.Control
                type="date"
                name="tanggal_pembelian"
                value={formData.tanggal_pembelian}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="asal_usul_perolehan">
              <Form.Label>Asal Usul Perolehan</Form.Label>
              <Form.Control
                type="text"
                name="asal_usul_perolehan"
                value={formData.asal_usul_perolehan}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="keterangan_asset">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                type="text"
                name="keterangan_asset"
                value={formData.keterangan_asset}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="nama_pengguna">
              <Form.Label>Nama Pengguna</Form.Label> {/* New field for user name */}
              <Form.Control
                type="text"
                name="nama_pengguna"
                value={formData.nama_pengguna}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AssetList;
