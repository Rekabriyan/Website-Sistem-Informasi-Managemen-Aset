import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../../components/DashboardGA/Navbar";
import Sidebar from '../../components/DashboardGA/Sidebar';
import axios from 'axios';

const Laporan = () => {
    const [selectedReport, setSelectedReport] = useState("Buku Inventaris");
    const [allAssets, setAllAssets] = useState([]);
    const [rekapMutasi, setRekapMutasi] = useState([]);

    useEffect(() => {
        loadAsset();
        loadRekapMutasi();
    }, []);

    const loadAsset = async () => {
        try {
            const result = await axios.get('http://localhost:5005/assets');
            setAllAssets(result.data.data);
        } catch (error) {
            console.error("Error loading asset data:", error);
        }
    };

    const loadRekapMutasi = async () => {
        try {
            const result = await axios.get('http://localhost:5005/laporan');
            setRekapMutasi(result.data.data);
        } catch (error) {
            console.error("Error loading rekap mutasi data:", error);
        }
    };

    const handleSelectChange = (event) => {
        setSelectedReport(event.target.value);
    };

    return (
        <>
            <div id="wrapper" className='d-flex'>
                <Sidebar />
                <div id="content-wrapper" className='d-flex flex-column w-100'>
                    <div id="content">
                        <Navbar />
                        <div className='container-fluid mt-4'>
                            <h1 className='mb-4'>Laporan</h1>
                            <div className="d-flex align-items-center mb-3">
                                <select className="form-select w-auto" value={selectedReport} onChange={handleSelectChange}>
                                    <option value="Buku Inventaris">Buku Inventaris</option>
                                    <option value="Rekapitulasi Mutasi Aset">Rekapitulasi Mutasi Aset</option>
                                </select>
                            </div>
                            <h3 className='mb-4 text-center'>{selectedReport}</h3>
                            <div className="table-responsive mt-3">
                                {selectedReport === "Buku Inventaris" ? (
                                    <table className="table table-striped table-bordered">
                                        <thead className="thead-dark">
                                            <tr className='text-center'>
                                                <th rowSpan="2">No</th>
                                                <th rowSpan="2">Kode Aset</th>
                                                <th rowSpan="2">Register</th>
                                                <th rowSpan="2">Nama/Jenis Aset</th>
                                                <th rowSpan="2">Merek/Tipe</th>
                                                <th rowSpan="2">No. Sertifikat / No. Pabrik / No. Rangka / No. Mesin</th>
                                                <th rowSpan="2">Bahan</th>
                                                <th rowSpan="2">Asal Usul Perolehan Aset</th>
                                                <th rowSpan="2">Tanggal Perolehan</th>
                                                <th rowSpan="2">Satuan</th>
                                                <th colSpan="3" className="text-center">Kondisi Aset (B/RR/RB)</th>
                                                <th rowSpan="2">Harga</th>
                                                <th rowSpan="2">Ket</th>
                                            </tr>
                                            <tr>
                                                <th className="text-center">B</th>
                                                <th className="text-center">RR</th>
                                                <th className="text-center">RB</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allAssets.map((asset, index) => (
                                                <tr key={index}>
                                                    <td className='text-center'>{index + 1}</td>
                                                    <td>{asset.kode_asset}</td>
                                                    <td>{asset.kode_register}</td>
                                                    <td>{asset.nama_asset}</td>
                                                    <td>{asset.merk}</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>{asset.asal_usul_pembelian}</td>
                                                    <td>{asset.tanggal_pembelian}</td>
                                                    <td>Buah</td>
                                                    <td className='text-center'>{asset.kondisi_asset}</td>
                                                    <td className='text-center'>{asset.kondisi_rr}</td>
                                                    <td className='text-center'>{asset.kondisi_rb}</td>
                                                    <td>{asset.harga}</td>
                                                    <td>{asset.keterangan}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <table className="table table-striped table-bordered">
                                        <thead className="thead-dark">
                                            <tr className='text-center'>
                                                <th rowSpan="2">No</th>
                                                <th rowSpan="2">Kode Aset</th>
                                                <th rowSpan="2">Nama/Jenis Aset</th>
                                                <th rowSpan="2">Nomor Register</th>
                                                <th colSpan="2" className="text-center">Keadaan Per 1 Januari</th>
                                                <th colSpan="2" className="text-center">Mutasi Perubahan</th>
                                                <th colSpan="2" className="text-center">Keadaan Per 31 Desember</th>
                                                <th rowSpan="2">Ket</th>
                                            </tr>
                                            <tr>
                                                <th className="text-center">Jumlah Aset</th>
                                                <th className="text-center">Jumlah Harga</th>
                                                <th className="text-center">Perubahan Jumlah</th>
                                                <th className="text-center">Perubahan Harga</th>
                                                <th className="text-center">Jumlah Aset</th>
                                                <th className="text-center">Jumlah Harga</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rekapMutasi.map((rekap, index) => (
                                                <tr key={index}>
                                                    <td className='text-center'>{index + 1}</td>
                                                    <td>{rekap.kode_aset}</td>
                                                    <td>{rekap.nama_aset}</td>
                                                    <td className='text-center'>{rekap.kode_register}</td>
                                                    <td className='text-center'>{rekap.jumlah_awal}</td>
                                                    <td>{rekap.harga_awal}</td>
                                                    <td className='text-center'>{rekap.perubahan_jumlah}</td>
                                                    <td>{rekap.perubahan_harga}</td>
                                                    <td className='text-center'>{rekap.jumlah_akhir}</td>
                                                    <td>{rekap.harga_akhir}</td>
                                                    <td>{rekap.keterangan || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Laporan;
