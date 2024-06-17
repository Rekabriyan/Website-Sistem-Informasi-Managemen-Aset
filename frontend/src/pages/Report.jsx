import React, { useEffect, useState } from "react";
import Sidebar from "../components/DashboardGA/Sidebar";
import Navbar from "../components/DashboardGA/Navbar";
import Table from "../components/ExamplesTable";
import TableAssets from "../components/TableAssets";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Report = () => {
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
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  const handleDeleteOnClick = (id) => {
    setDeletesAsset({ kode_asset: id });
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
                <TableAssets allassets={allAsset} handleDeleteClick={handleDeleteOnClick} />
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

export default Report;
