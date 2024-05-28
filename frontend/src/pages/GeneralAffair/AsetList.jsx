import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from '../../components/Sidebar';

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <h1 className="mb-4">List of Assets</h1>
              <div className="table-responsive">
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetList;
