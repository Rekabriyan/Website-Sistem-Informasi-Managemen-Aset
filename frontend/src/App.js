import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Report from './pages/Report';
import LoginForm from './pages/LoginForm';
import AsetList from './pages/GeneralAffair/AsetList'; // Pastikan path ini benar
import ManageAsset from './pages/GeneralAffair/ManageAsset';
import ReactPdf from './pages/ReactPDF';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
