import React from 'react';
import DataTable from 'react-data-table-component';

const TableAssets = ({ allassets, handleDeleteClick }) => {
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
            name: 'Aspek Legal',
            selector: row => row.aspek_legal,
            sortable: true,
            cell: row => <div style={{ whiteSpace: 'normal' }}>{row.aspek_legal}</div>,
        },
        {
            name: 'Spesifikasi',
            selector: row => row.spesifikasi,
            sortable: true,
            cell: row => <div style={{ whiteSpace: 'normal' }}>{row.spesifikasi}</div>,
        },
        {
            name: 'Harga',
            selector: row => row.harga,
            sortable: true,
            cell: row => <div style={{ whiteSpace: 'normal' }}>{row.harga}</div>,
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
            name: 'Kondisi',
            selector: row => row.kondisi_asset,
            sortable: true,
            cell: row => <div style={{ whiteSpace: 'normal' }}>{row.kondisi_asset}</div>,
        },
        {
            name: 'Keterangan',
            selector: row => row.keterangan,
            sortable: true,
            cell: row => <div style={{ whiteSpace: 'normal' }}>{row.keterangan}</div>,
        },
        {
            name: 'Actions',
            cell: row => <button className="btn btn-danger btn-sm" data-id={row.kode_asset} data-toggle="modal" data-target="#deleteincomemodal" onClick={() => handleDeleteClick(row.kode_asset)}>Delete</button>,
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

export default TableAssets;
