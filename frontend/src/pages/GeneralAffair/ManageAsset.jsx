import React, { useState, useEffect } from 'react';
import Navbar from "../../components/DashboardGA/Navbar";
import Sidebar from '../../components/DashboardGA/Sidebar';
import { Modal, Button, Form } from 'react-bootstrap';

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    kode_asset: '',
    nama_asset: '',
    jenis_asset: '',
    aspek_legal: '',
    spesifikasi: '',
    harga: '',
    tahun_perolehan: '',
    riwayat_perolehan: '',
    kondisi: '',
    nama_pengguna: '',
    lokasi_pengguna_aset: '',
    keterangan: '',
  });
  const [editingAsset, setEditingAsset] = useState(null);

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
  const handleClose = () => {
    setShow(false);
    setEditingAsset(null); // Reset editingAsset state
    setFormData({ // Reset formData state
      kode_asset: '',
      nama_asset: '',
      jenis_asset: '',
      aspek_legal: '',
      spesifikasi: '',
      harga: '',
      tahun_perolehan: '',
      riwayat_perolehan: '',
      kondisi: '',
      nama_pengguna: '',
      lokasi_pengguna_aset: '',
      keterangan: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAsset) {
      // Jika sedang dalam mode edit, lakukan update asset
      fetch(`http://localhost:5005/assets/${editingAsset.kode_asset}`, {
        method: 'PUT',
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
          // Update data asset yang diubah
          setAssets(assets.map(asset => asset.kode_asset === editingAsset.kode_asset ? data : asset));
          handleClose();
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      // Jika sedang dalam mode tambah, tambahkan asset baru
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
    }
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setFormData(asset); // Isi form dengan data asset yang akan diubah
    handleShow(); // Tampilkan formulir pop-up
  };

  const handleDelete = (kodeAsset) => {
    // Tampilkan pesan konfirmasi dengan pop-up
    const confirmed = window.confirm("Are you sure you want to delete this asset?");
    if (confirmed) {
      // Handle delete logic here
      fetch(`http://localhost:5005/assets/${kodeAsset}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Remove the deleted asset from the state
          setAssets(assets.filter(asset => asset.kode_asset !== kodeAsset));
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  return (
    <>
      <div id="wrapper" className="d-flex">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column w-100">
          <div id="content">
            <Navbar />
            <div className="container-fluid mt-4">
            <h1 className="mb-4">Daftar Aset</h1>
              <div className="d-flex justify-content-between">
              <Button variant="primary" onClick={handleShow}>
                Tambah Data Aset
              </Button>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Cari
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </div>
              </div>
              <div className="table-responsive mt-3">
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Kode Aset</th>
                      <th scope="col">Nama Aset</th>
                      <th scope="col">Aspek Legal</th>
                      <th scope="col">Spesifikasi</th>
                      <th scope="col">Harga</th>
                      <th scope="col">Tahun Perolehan</th>
                      <th scope="col">Riwayat Perolehan</th>
                      <th scope="col">Kondisi</th>
                      <th scope="col">Keterangan</th>
                      <th scope="col">Actions</th> {/* Added for edit and delete buttons */}
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((asset) => (
                      <tr key={asset.kode_asset}>
                        <td>{asset.kode_asset}</td>
                        <td>{asset.nama_asset}</td>
                        <td>{asset.aspek_legal}</td>
                        <td>{asset.spesifikasi}</td>
                        <td>{asset.harga}</td>
                        <td>{new Date(asset.tahun_perolehan).toLocaleDateString()}</td>
                        <td>{asset.riwayat_perolehan}</td>
                        <td>{asset.kondisi}</td>
                        <td>{asset.keterangan_asset}</td>
                        <td>
                          <Button variant="warning" onClick={() => handleEdit(asset)}>Edit</Button>
                          <Button variant="danger" onClick={() => handleDelete(asset.kode_asset)}>Hapus</Button>
                        </td>
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
          <Modal.Title>{editingAsset ? "Edit" : "Tambah Data Aset"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="kode_asset">
              <Form.Label>Kode Asset</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan kode asset"
                name="kode_asset"
                value={formData.kode_asset}
                onChange={handleChange}
                disabled={!!editingAsset} // Kode asset tidak dapat diubah saat editing
              />
            </Form.Group>
            <Form.Group controlId="nama_asset">
              <Form.Label>Nama Asset</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama asset"
                name="nama_asset"
                value={formData.nama_asset}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Tambahkan field lainnya */}
            <Form.Group controlId="jenis_asset">
              <Form.Label>Jenis Asset </Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan jenis asset"
                name="jenis_asset"
                value={formData.jenis_asset}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="aspek_legal">
              <Form.Label>Aspek Legal</Form.Label>
              <Form.Control
                type="number"
                placeholder="Masukkan aspek legal"
                name="aspek_legal"
                value={formData.aspek_legal}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="spesifikasi">
              <Form.Label>Spesifikasi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan spefisikasi asset"
                name="spefisikasi"
                value={formData.spesifikasi}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="harga">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan harga"
                name="harga"
                value={formData.harga}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="tahun_pembelian">
              <Form.Label>Tahun Perolehan</Form.Label>
              <Form.Control
                type="date"
                name="tanggal_pembelian"
                value={formData.tahun_pembelian}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="riwayat_perolehan">
              <Form.Label>Riwayat Perolehan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan riwayat perolehan"
                name="riwayat_perolehan"
                value={formData.riwayat_perolehan}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="kondisi">
              <Form.Label>Kondisi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan kondisi"
                name="kondisi"
                value={formData.kondisi}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="nama_pengguna">
              <Form.Label>Nama Pengguna</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama pengguna"
                name="nama_pengguna"
                value={formData.nama_pengguna}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lokasi_pengguna_aset">
              <Form.Label>Lokasi Pengguna Aset</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan lokasi pengguna aset"
                name="lokasi_pengguna_aset"
                value={formData.lokasi_pengguna_aset}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="keterangan_asset">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Masukkan keterangan"
                name="keterangan_asset"
                value={formData.keterangan_asset}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose} style={{ marginRight: '10px', marginTop: '10px'}}>
              Kembali
            </Button>
            <Button variant="primary" type="submit" style={{marginTop: '10px'}}>
              {editingAsset ? "Update Asset" : "Tambahkan Data Asset"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AssetList;

