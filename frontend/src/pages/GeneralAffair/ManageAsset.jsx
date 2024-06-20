import React, { useEffect, useState } from "react";
import Sidebar from "../../components/DashboardGA/Sidebar";
import Navbar from "../../components/DashboardGA/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

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
    keterangan: "-",
    lokasi: "",
    tanggal_pembelian: new Date().toISOString().split("T")[0],
    asal_usul_pembelian: "",
    kondisi: "",
    merk: "-",
    pengguna_asset: "",
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
    keterangan: "-",
    lokasi: "",
    tanggal_pembelian: new Date().toISOString().split("T")[0],
    asal_usul_pembelian: "",
    kondisi_asset: "",
    merk: "-",
    pengguna_asset: "",
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
        keterangan: "-",
        lokasi: "",
        tanggal_pembelian: new Date().toISOString().split("T")[0],
        asal_usul_pembelian: "",
        kondisi: "",
        merk: "-",
        pengguna_asset: "",
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

  const updateAsset = async (e, id) => {
    e.preventDefault();
    try {
      const updatedAsset = {
        ...editAsset,
        harga: parseInt(editAsset.harga),
        jumlah: parseInt(editAsset.jumlah_asset),
      };

      if(updatedAsset.status_ketersediaan === "Tersedia"){
        updatedAsset.nama_pengguna = "-";
        updatedAsset.lokasi = "-";
      }
      
      console.log(updatedAsset);

      const response = await axios.put(`http://localhost:5005/assets/${id}`, updatedAsset, {
        validateStatus: false,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Asset Updated!",
          text: response.data.msg,
        }).then(() => {
          // Close modal
          window.$("#editassetmodal").modal("hide");
        });
        loadAsset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed!",
          text: response.data.msg,
        });
      }
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };

  const deleteAsset = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5005/assets/${id}`);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Asset Deleted!",
          text: response.data.msg,
        });
        loadAsset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Deletion Failed!",
          text: response.data.msg,
        });
      }
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h6 mb-0 text-gray-800">Daftar Aset</h1>
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
                        <th scope="col">Actions</th>
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
                <div className="form-group">
                  <label htmlFor="status_ketersediaan">Status Ketersediaan</label>
                  <select
                    className="form-control"
                    id="status_ketersediaan"
                    name="status_ketersediaan"
                    value={newAsset.status_ketersediaan}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Tersedia">Tersedia</option>
                    <option value="Telah Digunakan">Dialokasikan</option>
                  </select>
                </div>
                {newAsset.status_ketersediaan === "Telah Digunakan" && (
                  <>
                    <div className="form-group">
                      <label htmlFor="pengguna_asset">Nama Pengguna</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Masukan Nama Pengguna"
                        id="pengguna_asset"
                        name="pengguna_asset"
                        value={newAsset.pengguna_asset}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lokasi">Lokasi Pengguna Aset</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Masukan Lokasi Pengguna Aset"
                        id="lokasi"
                        name="lokasi"
                        value={newAsset.lokasi}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </>
                )}
                <button type="button" className="btn btn-secondary mr-2" data-dismiss="modal">Kembali</button>
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
                </div>
                <div className="form-group">
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
                </div>
                <div className="form-group">
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
                </div>
                <div className="form-group">
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
                </div>
                <div className="form-group">
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
                </div>
                <div className="form-group">
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
                </div>
                <div className="form-group">
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
                </div>
                <div className="form-group">
                  <label htmlFor="asal_usul_pembelian">Asal Usul Pembelian</label>
                  <input
                    type="text"
                    className="form-control"
                    id="asal_usul_pembelian"
                    placeholder="Masukan Asal Usul Pembelian Asset"
                    name="asal_usul_pembelian"
                    value={editAsset.asal_usul_pembelian}
                    onChange={handleEditInputChange}
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
                    value={editAsset.kondisi}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status_ketersediaan">Status Ketersediaan</label>
                  <select
                    className="form-control"
                    id="status_ketersediaan"
                    name="status_ketersediaan"
                    value={editAsset.status_ketersediaan}
                    onChange={handleEditInputChange}
                    required
                  >
                    <option value="Tersedia">Tersedia</option>
                    <option value="Telah Digunakan">Dialokasikan</option>
                  </select>
                </div>
                {editAsset.status_ketersediaan === "Telah Digunakan" && (
                  <>
                    <div className="form-group">
                      <label htmlFor="pengguna_asset">Nama Pengguna</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Masukan Nama Pengguna"
                        id="pengguna_asset"
                        name="pengguna_asset"
                        value={editAsset.pengguna_asset}
                        onChange={handleEditInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lokasi">Lokasi Pengguna Aset</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Masukan Lokasi Pengguna Aset"
                        id="lokasi"
                        name="lokasi"
                        value={editAsset.lokasi}
                        onChange={handleEditInputChange}
                        required
                      />
                    </div>
                  </>
                )}
                <button type="button" className="btn btn-secondary mr-2" data-dismiss="modal">Kembali</button>
                <button type="submit" className="btn btn-primary" onClick={(e) => updateAsset(e, editAsset.id)}>
                  Update Data Asset
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
                Hapus Data Asset
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
              <p>Apakah Anda yakin ingin menghapus asset ini?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">Batal</button>
              <button className="btn btn-danger" type="button" onClick={() => deleteAsset(deletesAsset.kode_asset)}>Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAsset;
