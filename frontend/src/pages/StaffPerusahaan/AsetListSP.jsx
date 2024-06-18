import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import NavbarSP from "../../components/DashboardSP/NavbarSP";
import SidebarSP from "../../components/DashboardSP/SidebarSP";
const AssetListSP = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [showAjukanModal, setShowAjukanModal] = useState(false);
  const [showPinjamModal, setShowPinjamModal] = useState(false);
  const [namaStaff, setNamaStaff] = useState("");
  const [departemen, setDepartemen] = useState("");

  useEffect(() => {
    fetch("http://localhost:5005/assets")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAssets(data.data);
        setFilteredAssets(data.data);
        setLoading(false);

        // Extract unique asset types for the dropdown
        const types = [...new Set(data.data.map((asset) => asset.jenis_asset))];
        setAssetTypes(types);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Apply both search term and selected type filters
    let results = assets;

    if (selectedType) {
      results = results.filter((asset) => asset.jenis_asset === selectedType);
    }

    if (searchTerm) {
      results = results.filter((asset) =>
        asset.nama_asset.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAssets(results);
  }, [searchTerm, selectedType, assets]);

  const handlePengajuan = () => {
    alert("Pengajuan Saya");
  };

  const handleAjukanAsset = () => {
    setShowAjukanModal(true);
  };

  const handleCloseAjukanModal = () => {
    setShowAjukanModal(false);
  };

  const handleKirimPermintaanAjukan = () => {
    // Handle submit logic here
    // For demonstration, just alert the inputs
    alert(`Nama Staff: ${namaStaff}, Departemen/Divisi: ${departemen}`);
    handleCloseAjukanModal();
  };

  const handlePinjamAsset = () => {
    setShowPinjamModal(true);
  };

  const handleClosePinjamModal = () => {
    setShowPinjamModal(false);
  };

  const handleKirimPermintaanPinjam = () => {
    // Handle submit logic here
    // For demonstration, just alert the inputs
    alert(`Nama Staff: ${namaStaff}, Departemen/Divisi: ${departemen}`);
    handleClosePinjamModal();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error: {error.message}</p>;
  }

  return (
    <>
      <div id="wrapper" className="d-flex">
        <SidebarSP />
        <div id="content-wrapper" className="d-flex flex-column w-100">
          <div id="content">
            <NavbarSP />
            <div className="container-fluid mt-4">
              <h1 className="mb-4 text-dark font-weight-bold">
                Daftar Asset Tersedia
              </h1>
              <div className="d-flex justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control mr-2"
                    style={{ maxWidth: "200px" }}
                    placeholder="Search Asset..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="primary" onClick={() => {}}>
                    Cari
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handlePengajuan}
                    className="ml-2"
                  >
                    Pengajuan Saya
                  </Button>
                </div>
                <div className="d-flex align-items-center">
                  <select
                    className="form-control"
                    style={{ maxWidth: "200px" }}
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="">Filter by Type...</option>
                    {assetTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="table-responsive mt-3">
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Kode Asset</th>
                      <th scope="col">Nama Asset</th>
                      <th scope="col">Jenis Asset</th>
                      <th scope="col">Aspek Legal</th>
                      <th scope="col">Spesifikasi</th>
                      <th scope="col">Harga</th>
                      <th scope="col">Tahun Perolehan</th>
                      <th scope="col">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssets.map((asset) => (
                      <tr key={asset.kode_asset}>
                        <td>{asset.kode_asset}</td>
                        <td>{asset.nama_asset}</td>
                        <td>{asset.jenis_asset}</td>
                        <td>{asset.aspek_legal}</td>
                        <td>{asset.spesifikasi}</td>
                        <td>{asset.harga}</td>
                        <td>
                          {new Date(
                            asset.tanggal_pembelian
                          ).toLocaleDateString()}
                        </td>
                        <td>{asset.keterangan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="primary"
                  onClick={handleAjukanAsset}
                  className="mr-2"
                >
                  Ajukan Asset
                </Button>
                <Button variant="success" onClick={handlePinjamAsset}>
                  Pinjam Asset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Ajukan Asset */}
      <Modal
        show={showAjukanModal}
        onHide={handleCloseAjukanModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Masukan Data Anda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNamaStaff">
            <Form.Label>Nama Staf</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan nama staf"
              value={namaStaff}
              onChange={(e) => setNamaStaff(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDepartemen">
            <Form.Label>Departemen/Divisi</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan departemen/divisi"
              value={departemen}
              onChange={(e) => setDepartemen(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAjukanModal}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleKirimPermintaanAjukan}>
            Kirim Permintaan
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Pinjam Asset */}
      <Modal
        show={showPinjamModal}
        onHide={handleClosePinjamModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Masukan Data Anda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNamaStaffPinjam">
            <Form.Label>Nama Staf</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan nama staf"
              value={namaStaff}
              onChange={(e) => setNamaStaff(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDepartemenPinjam">
            <Form.Label>Departemen/Divisi</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan departemen/divisi"
              value={departemen}
              onChange={(e) => setDepartemen(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePinjamModal}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleKirimPermintaanPinjam}>
            Kirim Permintaan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AssetListSP;
