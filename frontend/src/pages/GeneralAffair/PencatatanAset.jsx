import React, { useState, useEffect } from 'react';
import Navbar from "../../components/DashboardGA/Navbar";
import Sidebar from '../../components/DashboardGA/Sidebar';
import { Modal, Button, Form } from 'react-bootstrap';

const AssetRecord = () => {
  
  
    return (
    <>
        <div id="wrapper" className='d-flex'>
            <Sidebar/>
            <div id="content-wrapper" className='d-flex flex-column w-100'>
                <div id="content">
                    <Navbar/>
                    <div className='container-fluid mt-4'>
                    <h1 className='mb-4'>Pencatatan Aset</h1>
                    <div className="d-flex align-items-center mb-3">
                        <select className="form-select w-auto">
                        <option selected>Kartu Inventaris Aset</option>
                        <option value="1">Kartu Inventaris Ruangan</option>
                        <option value="2">Daftar Mutasi Aset</option>
                        <option value="3">Daftar Peminjaman Aset</option>
                        </select>
                    </div>
                    <div class="d-flex justify-content-evenly">
                        <div class="p-2 bd-highlight">KIA LAHAN TANAH</div>
                        <div class="p-2 bd-highlight">KIA BANGUNAN</div>
                        <div class="p-2 bd-highlight">KIA MESIN DAN PERALATAN</div>
                        <div class="p-2 bd-highlight">KIA TEKNOLOGI INFORMASI</div>
                        <div class="p-2 bd-highlight">KIA TETAP LAINNYA</div>
                        <div class="p-2 bd-highlight">KIA KONSTRUKSI DALAM PROSES PENGERJAAN</div>
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>
        
        
    </>
  );
};

export default AssetRecord;
