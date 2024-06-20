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
    : "navbar-nav custom-bg-orange sidebar sidebar-dark accordion ";

  return (
    <>
      <ul className={sidebarClassName} id="accordionSidebar">
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon">
            <img src={logoHariff} alt="logo" width={55}></img>
          </div>
          <div className="sidebar-brand-text mx-3">ASSET-SAPI</div>
        </a>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <a className="nav-link" href="/report">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading"></div>
        <li className="nav-item">
          <a className="nav-link" href="/manageAsset">
            <i className="fas fa-fw fa-wallet"></i>
            <span>Pendataan</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/pencatatanAset">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Pencatatan</span>
          </a>
        </li>
        <hr className="sidebar-divider" />
        <li className="nav-item">
          <a 
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
            >
            <i className="fas fa-fw fa-receipt"></i>
            <span>Pelaporan</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="custom-bg-orange py-2 collapse-inner rounded">
              <a className="collapse-item text-white custom-hover" href="/laporan">
                Laporan
              </a>
              <a className="collapse-item text-white custom-hover" href="/permintaan-laporan-aset">
                Pemintaan Laporan
              </a>
            </div>
          </div>
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
