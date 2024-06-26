import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarClassName = isSidebarOpen
    ? "navbar-nav bg-gradient-dark sidebar sidebar-dark accordion toggled"
    : "navbar-nav bg-gradient-dark sidebar sidebar-dark accordion ";

  return (
    <>
      <ul className={sidebarClassName} id="accordionSidebar">
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-window-restore"></i>
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
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-wallet"></i>
            <span>ListAsset</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <a className="collapse-item" href="/assets">
                Lihat Aset
              </a>
              <a className="collapse-item" href="/manageAsset">
                Manage Aset
              </a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/budgeting">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Permintaan</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            <i className="fas fa-fw fa-donate"></i>
            <span>Cashflow</span>
          </a>
          <div
            id="collapseUtilities"
            className="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link to="/income" className="collapse-item">
                Income
              </Link>
              <Link to="/outcome" className="collapse-item">
                Outcome
              </Link>
            </div>
          </div>
        </li>
        <hr className="sidebar-divider" />
        <li className="nav-item">
          <Link className="nav-link" to="/recap">
            <i className="fas fa-fw fa-receipt"></i>
            <span>Rekapitulasi</span>
          </Link>
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
