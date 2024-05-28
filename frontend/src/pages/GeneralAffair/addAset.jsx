import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Swal from 'sweetalert2';

const AddAset = () => {
  const [assets, setAssets] = useState([]);
  const [kodeAsset, setKodeAsset] = useState('');
  const [namaAsset, setNamaAsset] = useState('');
  const [jenisAsset, setJenisAsset] = useState('');
  const [jumlahAsset, setJumlahAsset] = useState('');
  const [statusAsset, setStatusAsset] = useState('');
  const [lokasiAsset, setLokasiAsset] = useState('');
  const [tanggalPembelian, setTanggalPembelian] = useState('');
  const [asalUsulPerolehan, setAsalUsulPerolehan] = useState('');
  const [keteranganAsset, setKeteranganAsset] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get('http://localhost:5005/assets');
      setAssets(response.data.data);
    } catch (error) {
      console.error("There was an error fetching the assets!", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5005/assets', {
        kode_asset: kodeAsset,
        nama_asset: namaAsset,
        jenis_asset: jenisAsset,
        jumlah_asset: jumlahAsset,
        status_asset: statusAsset,
        lokasi_asset: lokasiAsset,
        tanggal_pembelian: tanggalPembelian,
        asal_usul_perolehan: asalUsulPerolehan,
        keterangan_asset: keteranganAsset,
      });
      Swal.fire('Success', 'Asset added successfully!', 'success');
      fetchAssets();
      setKodeAsset('');
      setNamaAsset('');
      setJenisAsset('');
      setJumlahAsset('');
      setStatusAsset('');
      setLokasiAsset('');
      setTanggalPembelian('');
      setAsalUsulPerolehan('');
      setKeteranganAsset('');
    } catch (error) {
      Swal.fire('Error', 'There was an error adding the asset!', 'error');
    }
  };

  const handleDelete = async (namaAsset) => {
    try {
      await axios.delete(`http://localhost:5005/assets/${namaAsset}`);
      Swal.fire('Success', 'Asset deleted successfully!', 'success');
      fetchAssets();
    } catch (error) {
      Swal.fire('Error', 'There was an error deleting the asset!', 'error');
    }
  };

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid mt-4">
              <h1 className="mb-4">Manage Assets</h1>
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group">
                  <label>Kode Asset</label>
                  <input type="text" className="form-control" value={kodeAsset} onChange={(e) => setKodeAsset(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Nama Asset</label>
                  <input type="text" className="form-control" value={namaAsset} onChange={(e) => setNamaAsset(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Jenis Asset</label>
                  <input type="text" className="form-control" value={jenisAsset} onChange={(e) => setJenisAsset(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Jumlah Asset</label>
                  <input type="number" className="form-control" value={jumlahAsset} onChange={(e) => setJumlahAsset(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Status Asset</label>
                  <input type="text" className="form-control" value={statusAsset} onChange={(e) => setStatusAsset(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Lokasi Asset</label>
                  <input type="text" className="form-control" value={lokasiAsset} onChange={(e) => setLokasiAsset(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Tanggal Pembelian</label>
                  <input type="date" className="form-control" value={tanggalPembelian} onChange={(e) => setTanggalPembelian(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Asal Usul Perolehan</label>
                  <input type="text" className="form-control" value={asalUsulPerolehan} onChange={(e) => setAsalUsulPerolehan(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Keterangan</label>
                  <input type="text" className="form-control" value={keteranganAsset} onChange={(e) => setKeteranganAsset(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Asset</button>
              </form>

              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Kode Asset</th>
                    <th>Nama Asset</th>
                    <th>Jenis Asset</th>
                    <th>Jumlah Asset</th>
                    <th>Status Asset</th>
                    <th>Lokasi Asset</th>
                    <th>Tanggal Pembelian</th>
                    <th>Asal Usul Perolehan</th>
                    <th>Keterangan</th>
                    <th>Actions</th>
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
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(asset.nama_asset)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAset;
