import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Report = () => {

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="card shadow mb-4">
                <a href="#collapseIncomeCard" className="d-block card-header py-3" data-toggle="collapse"
                  role="button" aria-expanded="true" aria-controls="collapseIncomeCard">
                  <h6 className="m-0 font-weight-bold text-primary text-center">Montly Income's</h6>
                </a>
                <div className="collapse show" id="collapseIncomeCard">
                  <div className="card-body">
                  </div>
                </div>
              </div>
              <div className="card shadow mb-4">
                <a href="#collapseOutcomeCard" className="d-block card-header py-3" data-toggle="collapse"
                  role="button" aria-expanded="true" aria-controls="collapseOutcomeCard">
                  <h6 className="m-0 font-weight-bold text-primary text-center">Montly Outcome's</h6>
                </a>
                <div className="collapse show" id="collapseOutcomeCard">
                  <div className="card-body">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Report;
