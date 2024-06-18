import { useState } from 'react';
import NavbarSP from '../../components/DashboardSP/NavbarSP';
import SidebarSP from '../../components/DashboardSP/SidebarSP';

const MutasiAset = () => {
    const [selectedForm, setSelectedForm] = useState(''); // State to manage the selected form

    // Handler for form selection
    const handleFormSelection = (formType) => {
        setSelectedForm(formType);
    };

    return (
        <div id="wrapper" className="d-flex">
            <SidebarSP/>
            <div id="content-wrapper" className="d-flex flex-column w-100">
                <div id="content">
                    <NavbarSP/>
                    <div className="container-fluid mt-4">
                        <h1 className="mb-4 text-dark font-weight-bold">Formulir Mutasi Aset</h1>
                        
                        <div className="mb-4">
                            <button onClick={() => handleFormSelection('luar')} className="btn btn-primary mr-2">Luar Perusahaan</button>
                            <button onClick={() => handleFormSelection('dalam')} className="btn btn-secondary">Dalam Perusahaan</button>
                        </div>

                        {selectedForm === 'luar' && (
                            <div className="card p-4 mb-4">
                                <h3 className="mb-4">Formulir Mutasi Luar Perusahaan</h3>
                                <form>
                                    <div className="form-group">
                                        <label>Nama Aset</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Nama Pengguna</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Lokasi Pengguna Saat Ini</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Nama Calon Pengguna</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Pilih Ekspedisi</label>
                                        <select className="form-control" required>
                                            <option value="">Pilih</option>
                                            <option value="ekspedisi1">Ekspedisi 1</option>
                                            <option value="ekspedisi2">Ekspedisi 2</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Pilih Estimasi Waktu</label>
                                        <select className="form-control" required>
                                            <option value="">Pilih</option>
                                            <option value="1hari">1 Hari</option>
                                            <option value="2hari">2 Hari</option>
                                            <option value="3hari">3 Hari</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                            </div>
                        )}

                        {selectedForm === 'dalam' && (
                            <div className="card p-4">
                                <h3 className="mb-4">Formulir Mutasi Dalam Perusahaan</h3>
                                <form>
                                    <div className="form-group">
                                        <label>Nama Aset</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Nama Pengguna</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Lokasi Pengguna Saat Ini</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Nama Calon Pengguna</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MutasiAset;
