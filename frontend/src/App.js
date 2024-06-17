import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Report from './pages/Report';
import LoginForm from './pages/LoginForm';
import AsetList from './pages/GeneralAffair/AsetList'; // Pastikan path ini benar
import ManageAsset from './pages/GeneralAffair/ManageAsset';
import ReactPdf from './pages/ReactPDF';
import PencatatanAset from './pages/GeneralAffair/PencatatanAset'
import Laporan from './pages/GeneralAffair/Laporan'
import PermintaanLaporan from './pages/GeneralAffair/PermintaanLaporan';
import PermintaanAset from './pages/GeneralAffair/PermintaanAset';
import PeminjamanAset from './pages/GeneralAffair/PeminjamanAset';
import PermintaanMutasi from './pages/GeneralAffair/PermintaanMutasi';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/report" element={<Report />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/assets" element={<AsetList />} />
          <Route path="/manageAsset" element={<ManageAsset/>} />
          <Route path="/pdf" element={<ReactPdf />} />
          <Route path="/pencatatanAset" element={<PencatatanAset/>} />
          <Route path="/laporan" element={<Laporan/>} />
          <Route path="/permintaan-laporan-aset" element={<PermintaanLaporan/>} />
          <Route path="/permintaan-aset" element={<PermintaanAset />} />
          <Route path="/peminjaman-aset" element={<PeminjamanAset />} />
          <Route path="/permintaan-mutasi" element={<PermintaanMutasi />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
