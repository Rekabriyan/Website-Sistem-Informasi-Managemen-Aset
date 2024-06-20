import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../global.css';
import logoHariff from '../assets/logoHariff.png'

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarClassName = isSidebarOpen
    ? "navbar-nav custom-bg-orange sidebar sidebar-dark accordion toggled"
    : "navbar-nav custom-bg-orange sidebar sidebar-dark accordion";

  return (
    <>
      <ul className={sidebarClassName} id="accordionSidebar">
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon rotate-n-15">
            <img src={logoHariff} alt="logo" width={55}></img>
          </div>
          <div className="sidebar-brand-text mx-3">ASSET-SAPI</div>
        </a>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <a className="nav-link" href="/dashboard-sp">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading"></div>
        <li className="nav-item">
          <a className="nav-link" href="/daftar-aset">
            <i className="fas fa-fw fa-wallet"></i>
            <span>Pengajuan & Peminjaman</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/mutasi">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Mutasi</span>
          </a>
        </li>
        <hr className="sidebar-divider" />
        <li className="nav-item">
          <a className="nav-link" href="/minta-laporan">
            <i className="fas fa-fw fa-receipt"></i>
            <span>Laporan</span>
          </a>
        </li>
        <hr className="sidebar-divider d-md-block" />
        <div className="text-center d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            name="sidebarToggle"
            onClick={toggleSidebar}
          ></button>
        </div>
      </ul>
    </>
  );
};

export default Sidebar;
