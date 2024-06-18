// import React, { useState, useEffect } from 'react';
// import Navbar from "../../components/DashboardGA/Navbar";
// import Sidebar from '../../components/DashboardGA/Sidebar';
// import { Modal, Button, Form } from 'react-bootstrap';

// const AssetList = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [show, setShow] = useState(false);
//   const [formData, setFormData] = useState({
//     kode_asset: '',
//     nama_asset: '',
//     jenis_asset: '',
//     aspek_legal: '',
//     spesifikasi: '',
//     harga: '',
//     tahun_perolehan: '',
//     riwayat_perolehan: '',
//     kondisi: '',
//     nama_pengguna: '',
//     lokasi_pengguna_aset: '',
//     keterangan: '',
//   });
//   const [editingAsset, setEditingAsset] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5005/assets')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setAssets(data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error);  
//         setLoading(false);
//       });
//   }, []);

//   const handleShow = () => setShow(true);
//   const handleClose = () => {
//     setShow(false);
//     setEditingAsset(null); // Reset editingAsset state
//     setFormData({ // Reset formData state
//       kode_asset: '',
//       nama_asset: '',
//       jenis_asset: '',
//       aspek_legal: '',
//       spesifikasi: '',
//       harga: '',
//       tahun_perolehan: '',
//       riwayat_perolehan: '',
//       kondisi: '',
//       nama_pengguna: '',
//       lokasi_pengguna_aset: '',
//       keterangan: ''
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingAsset) {
//       // Jika sedang dalam mode edit, lakukan update asset
//       fetch(`http://localhost:5005/assets/${editingAsset.kode_asset}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           // Update data asset yang diubah
//           setAssets(assets.map(asset => asset.kode_asset === editingAsset.kode_asset ? data : asset));
//           handleClose();
//         })
//         .catch((error) => {
//           setError(error);
//         });
//     } else {
//       // Jika sedang dalam mode tambah, tambahkan asset baru
//       fetch('http://localhost:5005/assets', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setAssets([...assets, data]);
//           handleClose();
//         })
//         .catch((error) => {
//           setError(error);
//         });
//     }
//   };

//   const handleEdit = (asset) => {
//     setEditingAsset(asset);
//     setFormData(asset); // Isi form dengan data asset yang akan diubah
//     handleShow(); // Tampilkan formulir pop-up
//   };

//   const handleDelete = (kodeAsset) => {
//     // Tampilkan pesan konfirmasi dengan pop-up
//     const confirmed = window.confirm("Are you sure you want to delete this asset?");
//     if (confirmed) {
//       // Handle delete logic here
//       fetch(`http://localhost:5005/assets/${kodeAsset}`, {
//         method: 'DELETE',
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           // Remove the deleted asset from the state
//           setAssets(assets.filter(asset => asset.kode_asset !== kodeAsset));
//         })
//         .catch((error) => {
//           setError(error);
//         });
//     }
//   };

//   return (
//     <>
//       <div id="wrapper" className="d-flex">
//         <Sidebar />
//         <div id="content-wrapper" className="d-flex flex-column w-100">
//           <div id="content">
//             <Navbar />
//             <div className="container-fluid mt-4">
//               <h1 className="mb-4">Daftar Aset</h1>
//               <div className="d-flex justify-content-between">
//                 <Button variant="primary" onClick={handleShow}>
//                   Tambah Data Aset
//                 </Button>
//                 <div className="d-flex align-items-center mb-3">
//                   <select className="form-select w-auto">
//                     <option selected>Buku Inventaris</option>
//                     <option value="1">Rekapitulasi Mutasi Aset</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="table-responsive mt-3">
//                 <table className="table table-striped table-bordered">
//                   <thead className="thead-dark">
//                     <tr className='text-center'>
//                       <th scope="col">Kode Aset</th>
//                       <th scope="col">Nama Aset</th>
//                       <th scope="col">Aspek Legal</th>
//                       <th scope="col">Spesifikasi</th>
//                       <th scope="col">Harga</th>
//                       <th scope="col">Tahun Perolehan</th>
//                       <th scope="col">Riwayat Perolehan</th>
//                       <th scope="col">Kondisi</th>
//                       <th scope="col">Keterangan</th>
//                       <th scope="col">Actions</th> {/* Added for edit and delete buttons */}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {assets.map((asset) => (
//                       <tr key={asset.kode_asset}>
//                         <td>{asset.kode_asset}</td>
//                         <td>{asset.nama_asset}</td>
//                         <td>{asset.aspek_legal}</td>
//                         <td>{asset.spesifikasi}</td>
//                         <td>{asset.harga}</td>
//                         <td>{new Date(asset.tahun_perolehan).toLocaleDateString()}</td>
//                         <td>{asset.riwayat_perolehan}</td>
//                         <td>{asset.kondisi}</td>
//                         <td>{asset.keterangan_asset}</td>
//                         <td>
//                           <Button variant="warning" onClick={() => handleEdit(asset)} className="me-2">Edit</Button>
//                           <Button variant="danger" onClick={() => handleDelete(asset.kode_asset)}>Hapus</Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editingAsset ? "Edit" : "Tambah Data Aset"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="kode_asset">
//               <Form.Label>Kode Asset</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Masukkan kode asset"
//                 name="kode_asset"
//                 value={formData.kode_asset}
//                 onChange={handleChange}
//                 disabled={!!editingAsset} // Kode asset tidak dapat diubah saat editing
//               />
//             </Form.Group>
//             <Form.Group controlId="nama_asset">
//               <Form.Label>Nama Asset</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Masukkan nama asset"
//                 name="nama_asset"
//                 value={formData.nama_asset}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             {/* Tambahkan field lainnya */}
//             <Form.Group controlId="jenis_asset">
//               <Form.Label>Jenis Asset </Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Masukkan jenis asset"
//                 name="jenis_asset"
//                 value={formData.jenis_asset}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="aspek_legal">
//               <Form.Label>Aspek Legal</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Masukkan aspek legal"
//                 name="aspek_legal"
//                 value={formData.aspek_legal}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="spesifikasi">
//               <Form.Label>Spesifikasi</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Masukkan spefisikasi asset"
//                 name="spesifikasi"
//                 value={formData.spesifikasi}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="harga">
//               <Form.Label>Harga</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Masukkan harga"
//                 name="harga"
//                 value={formData.harga}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="tahun_perolehan">
//               <Form.Label>Tahun Perolehan</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="tahun_perolehan"
//                 value={formData.tahun_perolehan}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="riwayat_perolehan">
//               <Form.Label>Riwayat Perolehan</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Masukkan riwayat perolehan"
//                 name="riwayat_perolehan"
//                 value={formData.riwayat_perolehan}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="kondisi">
//               <Form.Label>Kondisi</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Masukkan kondisi"
//                 name="kondisi"
//                 value={formData.kondisi}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="nama_pengguna">
//               <Form.Label>Nama Pengguna</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Masukkan nama pengguna"
//                 name="nama_pengguna"
//                 value={formData.nama_pengguna}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="lokasi_pengguna_aset">
//               <Form.Label>Lokasi Pengguna Aset</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Masukkan lokasi pengguna aset"
//                 name="lokasi_pengguna_aset"
//                 value={formData.lokasi_pengguna_aset}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="keterangan_asset">
//               <Form.Label>Keterangan</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Masukkan keterangan"
//                 name="keterangan_asset"
//                 value={formData.keterangan_asset}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Button variant="secondary" onClick={handleClose} style={{ marginRight: '10px', marginTop: '10px'}}>
//               Kembali
//             </Button>
//             <Button variant="primary" type="submit" style={{marginTop: '10px'}}>
//               {editingAsset ? "Update Asset" : "Tambahkan Data Asset"}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default AssetList;

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/DashboardGA/Sidebar";
import Navbar from "../../components/DashboardGA/Navbar";
// import Table from "../../components/ExamplesTable";
// import TableAssets from "../components/TableAssets";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
// import { Pie, Bar } from 'react-chartjs-2';
// import { Button } from 'react-bootstrap';


const ManageAsset = () => {
  const [allAsset, setAllAsset] = useState([]);
  const [newAsset, setNewAsset] = useState({
    kode: "",
    nama: "",
    jenis: "",
    jumlah: 1,
    aspek_legal: "",
    spesifikasi: "",
    harga: "",
    status_ketersediaan: "Tersedia",
    keterangan: "",
    lokasi: "",
    tanggal_pembelian: new Date().toISOString().split("T")[0],
    asal_usul_pembelian: "",
    kondisi: "",
    merk: "-",
    pengguna_asset: "-",
    role: "general affair",
    kode_register: 10
  });

  const [editAsset, setEditAsset] = useState({
    id: 0,
    kode: "",
    nama: "",
    jenis: "",
    jumlah: 1,
    aspek_legal: "",
    spesifikasi: "",
    harga: 0,
    status_ketersediaan: "Tersedia",
    keterangan: "",
    lokasi: "",
    tanggal_pembelian: new Date().toISOString().split("T")[0],
    asal_usul_pembelian: "",
    kondisi_asset: "",
    merk: "-",
    pengguna_asset: "-",
    role: "general affair",
    kode_register: 10
  });


  const [deletesAsset, setDeletesAsset] = useState({
    kode_asset: 0,
  });

  useEffect(() => {
    loadAsset();
  }, []);

  const loadAsset = async () => {
    try {
      const result = await axios.get(`http://localhost:5005/assets`);
      setAllAsset(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.error("Error loading asset data:", error);
    }
  };

  const addAssets = async (e) => {
    e.preventDefault();
    try {
      newAsset.harga = parseInt(newAsset.harga);
      newAsset.jumlah = parseInt(newAsset.jumlah);
      const data = await axios.post("http://localhost:5005/assets", newAsset, {
        validateStatus: false,
      });

      if (data.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Asset Added!",
          text: data.data.msg,
        }).then(() => {
          // Close modal
          window.$("#addassetmodal").modal("hide");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Asset Addition Failed!",
          text: data.data.msg,
        });
      }

      loadAsset();
      setNewAsset({
        kode_asset: "",
        nama_asset: "",
        jenis_asset: "",
        jumlah: 1,
        aspek_legal: "",
        spesifikasi: "",
        harga: "",
        status_ketersediaan: "Tersedia",
        keterangan: "",
        lokasi: "",
        tanggal_pembelian: new Date().toISOString().split("T")[0],
        asal_usul_pembelian: "",
        kondisi: "",
        merk: "-",
        pengguna_asset: "-",
        role: "general affair",
        kode_register: 10
      });
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditAsset({ ...editAsset, [name]: value });
  };

  const handleDeleteOnClick = (id) => {
    setDeletesAsset({ kode_asset: id });
  };

  const handleEdit = (asset) => {
    setEditAsset(asset);
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h6 mb-0 text-gray-800">Assets</h1>
            </div>
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary text-center">
                  LIST ASSETS
                </h6>
              </div>
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-primary mb-4"
                  data-toggle="modal"
                  data-target="#addassetmodal"
                >
                  Tambah Data Asset
                </button>
                {/* <Table allUser={allAsset} /> */}
                {/* <TableAssets allassets={allAsset} handleDeleteClick={handleDeleteOnClick} /> */}
                <div className="table-responsive mt-3">
                  <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                      <tr className='text-center'>
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
                      {allAsset.map((asset) => (
                        <tr key={asset.kode_asset} className="text-center">
                          <td>{asset.kode_asset}</td>
                          <td>{asset.nama_asset}</td>
                          <td>{asset.aspek_legal}</td>
                          <td>{asset.spesifikasi}</td>
                          <td>{asset.harga}</td>
                          <td>{new Date(asset.tanggal_pembelian).getFullYear()}</td>
                          <td>{asset.asal_usul_pembelian}</td>
                          <td>{asset.kondisi_asset}</td>
                          <td>{asset.status_ketersediaan}</td>
                          <td>
                            <button className="btn btn-warning btn-sm m-1 fw-bold" data-toggle="modal" data-target="#editassetmodal" onClick={() => handleEdit(asset)}>Edit</button>
                            <button className="btn btn-danger btn-sm fw-bold" data-id={asset.kode_asset} data-toggle="modal" data-target="#deleteincomemodal" onClick={() => handleDeleteOnClick(asset.kode_asset)}>Delete</button>
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
      </div>

      {/* Add Asset Modal */}
      <div
        className="modal fade"
        id="addassetmodal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Tambah Data Asset
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={addAssets}>
                <div className="form-group">
                  <label htmlFor="kode">Kode Asset</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukan Kode Asset"
                    id="kode"
                    name="kode"
                    value={newAsset.kode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nama">Nama Asset</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukan Nama Asset"
                    id="nama"
                    name="nama"
                    value={newAsset.nama}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="jenis">Jenis Asset</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukan Jenis Asset"
                    id="jenis"
                    name="jenis"
                    value={newAsset.jenis}
                    onChange={handleInputChange}
                    required
                  />
                </div> */}
                <div className="form-group">
                  <label htmlFor="jenis">Jenis Asset</label>
                  <select
                    className="form-control"
                    id="jenis"
                    name="jenis"
                    value={newAsset.jenis}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Lahan Tanah">Lahan Tanah</option>
                    <option value="Bangunan">Bangunan</option>
                    <option value="Mesin Peralatan">Mesin Peralatan</option>
                    <option value="Teknologi Informasi">Teknologi Informasi</option>
                    <option value="Kontruksi Dalam Proses Pengerjaan">Kontruksi Dalam Proses Pengerjaan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="aspek_legal">Aspek Legal</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukan Aspek Legal"
                    id="aspek_legal"
                    name="aspek_legal"
                    value={newAsset.aspek_legal}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="spesifikasi">Spesifikasi</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukan Spesifikasi Asset"
                    id="spesifikasi"
                    name="spesifikasi"
                    value={newAsset.spesifikasi}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="harga">Harga</label>
                  <input
                    type="number"
                    className="form-control"
                    id="harga"
                    name="harga"
                    placeholder="Masukan Harga Asset"
                    value={newAsset.harga}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="keterangan">Keterangan</label>
                  <textarea
                    className="form-control"
                    id="keterangan"
                    name="keterangan"
                    placeholder="Masukan Keterangan"
                    rows="2"
                    value={newAsset.keterangan}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="lokasi">Lokasi</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukan Lokasi Asset"
                    id="lokasi"
                    name="lokasi"
                    value={newAsset.lokasi}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tanggal_pembelian">Tanggal Pembelian</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Masukan Tanggal Pembelian Asset"
                    id="tanggal_pembelian"
                    name="tanggal_pembelian"
                    value={newAsset.tanggal_pembelian}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="asal_usul_pembelian">Asal Usul Pembelian</label>
                  <input
                    type="text"
                    className="form-control"
                    id="asal_usul_pembelian"
                    placeholder="Masukan Asal Usul Pembelian Asset"
                    name="asal_usul_pembelian"
                    value={newAsset.asal_usul_pembelian}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="kondisi">Kondisi</label>
                  <input
                    type="text"
                    placeholder="Masukan Kondisi Asset"
                    className="form-control"
                    id="kondisi"
                    name="kondisi"
                    value={newAsset.kondisi}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="button" className="btn btn-secondary mr-2" data-dismiss="modal"> Kembali </button>
                <button type="submit" className="btn btn-primary">
                  Tambah Data Asset
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Update Asset Modal */}
      <div
        className="modal fade"
        id="editassetmodal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Asset
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="kode">Kode Asset</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukan Kode Asset"
                    id="kode_asset"
                    name="kode_asset"
                    value={editAsset.kode_asset}
                    onChange={handleEditInputChange}
                    required
                    disabled
                  />

                  <label htmlFor="nama">Nama Asset</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukan Nama Asset"
                    id="nama_asset"
                    name="nama_asset"
                    value={editAsset.nama_asset}
                    onChange={handleEditInputChange}
                    required
                  />

                  <label htmlFor="jenis">Jenis Asset</label>
                  <select
                    className="form-control"
                    id="jenis_asset"
                    name="jenis_asset"
                    value={editAsset.jenis_asset}
                    onChange={handleEditInputChange}
                    required
                  >
                    <option value="Lahan Tanah">Lahan Tanah</option>
                    <option value="Bangunan">Bangunan</option>
                    <option value="Mesin Peralatan">Mesin Peralatan</option>
                    <option value="Teknologi Informasi">Teknologi Informasi</option>
                    <option value="Kontruksi Dalam Proses Pengerjaan">Kontruksi Dalam Proses Pengerjaan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>

                  <label htmlFor="aspek_legal">Aspek Legal</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukan Aspek Legal"
                    id="aspek_legal"
                    name="aspek_legal"
                    value={editAsset.aspek_legal}
                    onChange={handleEditInputChange}
                    required
                  />

                  <label htmlFor="spesifikasi">Spesifikasi</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukan Spesifikasi Asset"
                    id="spesifikasi"
                    name="spesifikasi"
                    value={editAsset.spesifikasi}
                    onChange={handleEditInputChange}
                    required
                  />

                  <label htmlFor="harga">Harga</label>
                  <input
                    type="number"
                    className="form-control"
                    id="harga"
                    name="harga"
                    placeholder="Masukan Harga Asset"
                    value={editAsset.harga}
                    onChange={handleEditInputChange}
                    required
                  />

                  <label htmlFor="keterangan">Keterangan</label>
                  <textarea
                    className="form-control"
                    id="keterangan"
                    name="keterangan"
                    placeholder="Masukan Keterangan"
                    rows="2"
                    value={editAsset.keterangan}
                    onChange={handleEditInputChange}
                    required
                  ></textarea>

                  <label htmlFor="lokasi">Lokasi</label>
                  <input

                    type="text"
                    className="form-control"
                    placeholder="Masukan Lokasi Asset"
                    id="lokasi"
                    name="lokasi"
                    value={editAsset.lokasi}
                    onChange={handleEditInputChange}
                    required
                  />

                  <label htmlFor="tanggal_pembelian">Tanggal Pembelian</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Masukan Tanggal Pembelian Asset"
                    id="tanggal_pembelian"
                    name="tanggal_pembelian"
                    value={editAsset.tanggal_pembelian}
                    onChange={handleEditInputChange}
                    required
                  />

                  <label htmlFor="asal_usul_pembelian">Asal Usul Pembelian</label>
                  <input
                    type="text"
                    className="form-control"
                    id="asal_usul_pembelian"
                    placeholder="Masukan
                      Asal Usul Pembelian Asset"
                    name="asal_usul_pembelian"
                    value={editAsset.asal_usul_pembelian}
                    onChange={handleEditInputChange}
                    required
                  />

                  <label htmlFor="kondisi">Kondisi</label>
                  <input
                    type="text"
                    placeholder="Masukan Kondisi Asset"
                    className="form-control"
                    id="kondisi_asset"
                    name="kondisi_asset"
                    value={editAsset.kondisi_asset}
                    onChange={handleEditInputChange}
                    required
                  />

                </div>
                <button type="button" className="btn btn-secondary mr-2" data-dismiss="modal"> Kembali </button>
                <button type="submit" className="btn btn-primary"
                  onClick={async () => {
                    try {
                      editAsset.harga = parseInt(editAsset.harga);
                      editAsset.id = parseInt(editAsset.id);
                      const result = await axios.put(`http://localhost:5005/assets/${editAsset.id}`, editAsset, {
                        validateStatus: false,
                      });
                      console.log("result:", result);
                      if (result.status === 200) {
                        Swal.fire({
                          icon: "success",
                          title: "Asset Updated!",
                          text: result.data.msg,
                        }).then(() => {
                          // Close modal
                          window.$("#editassetmodal").modal("hide");
                        });
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "Asset Update Failed!",
                          text: result.data.msg,
                        });
                      }
                      loadAsset();
                    }
                    catch (error) {
                      console.error("Error updating asset:", error);
                    }
                  }}>

                  Edit Data Asset
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>




      {/* Delete Asset Modal */}
      <div
        className="modal fade"
        id="deleteincomemodal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Asset
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this asset?</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={async () => {
                  try {
                    const result = await axios.delete(`http://localhost:5005/assets/${deletesAsset.kode_asset}`, {
                      data: { role: "GA" },
                    });

                    if (result.status === 200) {
                      Swal.fire({
                        icon: "success",
                        title: "Asset Deleted!",
                        text: result.data.msg,
                      }).then(() => {
                        // Close modal
                        window.$("#deleteincomemodal").modal("hide");
                      });
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Asset Deletion Failed!",
                        text: result.data.msg,
                      });
                    }

                    loadAsset();
                  } catch (error) {
                    console.error("Error deleting asset:", error);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}

export default ManageAsset;
