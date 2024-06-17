import React from 'react';
import DataTable from 'react-data-table-component';

const TablePencatatan = ({ allassets }) => {
    const columns = [
        {
            name: 'Kode Aset',
            selector: row => row.kode_asset,
            sortable: true,
            cell: row => <div style={{ whiteSpace: 'normal' }}>{row.kode_asset}</div>,
        },
        {
            name: 'Nama Aset',
            selector: row => row.nama_asset,
            sortable: true,
            cell: row => <div style={{ whiteSpace: 'normal' }}>{row.nama_asset}</div>,
        },
        {
            name: 'Kondisi Asset',
            selector: row => row.kondisi_asset,
            sortable: true,
            cell: row => <div style={{ whiteSpace: 'normal' }}>{row.kondisi_asset}</div>,
        },
        {
            name: 'merk',
            selector: row => row.merk,
            sortable: true,
            cell: row => <div style={{ whiteSpace: 'normal' }}>{row.merk}</div>,
        },
        {
            name: 'Ukuran',
            sortable: true,
            cell: row => <div style={{ whiteSpace: 'normal' }}></div>,
        },
        {
            name: 'Tahun Perolehan',
            selector: row => row.tanggal_pembelian,
            sortable: true,
            cell: row => <div style={{ whiteSpace: 'normal' }}>{new Date(row.tanggal_pembelian).getFullYear()}</div>,
        },
        {
            name: 'Riwayat Perolehan',
            selector: row => row.asal_usul_pembelian,
            sortable: true,
            cell: row => <div style={{ whiteSpace: 'normal' }}>{row.asal_usul_pembelian}</div>,
        },
        {
            name: 'harga',
            selector: row => row.harga,
            sortable: true,
            cell: row => <div style={{ whiteSpace: 'normal' }}>{row.harga}</div>,
        },
        {
            name: 'Keterangan',
            selector: row => row.keterangan,
            sortable: true,
            cell: row => <div style={{ whiteSpace: 'normal' }}>{row.keterangan}</div>,
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={allassets}
            pagination
        />
    );
};

export default TablePencatatan;
