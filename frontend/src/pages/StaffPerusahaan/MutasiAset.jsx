import  {useState, useEffect} from 'react';
import NavbarSP from '../../components/DashboardSP/NavbarSP';
import SidebarSP from '../../components/DashboardSP/SidebarSP';

const MutasiAset = () => {
    return (
        <div id="wrapper" className="d-flex">
            <SidebarSP/>
            <div id="content-wrapper" className="d-flex flex-column w-100">
                <div id="content">
                    <NavbarSP/>
                    <div className="container-fluid mt-4">
                        <h1 className="mb-4 text-dark font-weight-bold">Formulir Mutasi Aset</h1>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MutasiAset;