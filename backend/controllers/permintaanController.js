import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


//kirim permintaan dan pengajuan
export const addPermintaan = async (req, res) => {
    try {
        const response = await prisma.permintaan.create({
            data: {
                    id_user: req.body.id_user,
                    id_asset: req.body.id_asset,
                    tipe_permintaan: req.body.tipe_permintaan,
                    status: "Belum Dikonfirmasi",
                    tanggal_permintaan: new Date(req.body.tanggal_permintaan).toISOString(),
                    keterangan: req.body.keterangan,
                    nama_calon_pengguna: req.body.nama_calon_pengguna,
                    calon_lokasi_pengguna: req.body.calon_lokasi_pengguna,
                    ekspedisi: null,
                    estimasi: null,
                    lokasi_mutasi: null,
                    approved_by: "Belum disetujui"
            },
        });
        res.status(200).json({ msg: 'Permintaan berhasil dikirim', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//kirim permintaan mutasi Luar perusahaan
export const addMutasiLuar = async (req, res) => {
    try {
        const response = await prisma.permintaan.create({
            data: {
                    id_user: req.body.id_user,
                    id_asset: req.body.id_asset,
                    tipe_permintaan: req.body.tipe_permintaan,
                    status: "Belum Dikonfirmasi",
                    tanggal_permintaan: new Date(req.body.tanggal_permintaan).toISOString(),
                    keterangan: req.body.keterangan,
                    nama_calon_pengguna: req.body.nama_calon_pengguna,
                    calon_lokasi_pengguna: req.body.calon_lokasi_pengguna,
                    ekspedisi: req.body.ekspedisi,
                    estimasi: req.body.estimasi,
                    lokasi_mutasi: req.body.lokasi_mutasi,
                    approved_by: "Belum disetujui"
            },
        });
        res.status(200).json({ msg: 'Permintaan mutasi berhasil dikirim', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//kirim permintaan mutasi dalam perusahaan
export const addMutasiDalam = async (req, res) => {
    try {
        const response = await prisma.permintaan.create({
            data: {
                    id_user: req.body.id_user,
                    id_asset: req.body.id_asset,
                    tipe_permintaan: req.body.tipe_permintaan,
                    status: "Belum Dikonfirmasi",
                    tanggal_permintaan: new Date(req.body.tanggal_permintaan).toISOString(),
                    keterangan: req.body.keterangan,
                    nama_calon_pengguna: req.body.nama_calon_pengguna,
                    calon_lokasi_pengguna: req.body.calon_lokasi_pengguna,
                    ekspedisi: null,
                    estimasi: null,
                    lokasi_mutasi: req.body.lokasi_mutasi,
                    approved_by: "Belum disetujui"
            },
        });
        res.status(200).json({ msg: 'Permintaan mutasi berhasil dikirim', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//get all permintaan
export const getAllPermintaan = async (req, res) => {
    try {
        const response = await prisma.permintaan.findMany();
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//confirmation
export const confirmPermintaan = async (req, res) => {
    const isGA = req.body.role === "general affair" ? true : false;
    
    if(!isGA) return res.status(401).json({ msg: 'Unauthorized' });

    const permintaanId = parseInt(req.params.id);

    try {
        const response = await prisma.permintaan.update({
            where: {
                id: permintaanId,
            },
            data: {
                status: req.body.status,
                approved_by: req.body.approved_by,
            },
        });
    
    if(req.body.status === "Diterima"){
        //update ketersediaan asset
        const asset = await prisma.asset.update({
            where: {
                id: req.body.id_asset,
            },
            data: {
                status_ketersediaan: "Telah Digunakan",
            },
        });

    }
        res.status(200).json({ msg: 'Permintaan berhasil dikonfirmasi', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


//get all peminjaman asset yang diterima
export const getPeminjamanDiterima = async (req, res) => {
    try {
        const response = await prisma.permintaan.findMany({
            where: {
                status: "Diterima",
                tipe_permintaan: "Peminjaman",
            },
        });

        const getAsset = await prisma.asset.findUnique({
            where: {
                id: response.id_asset,
            },
        });

        res.status(200).json({ data: response, asset: getAsset });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//get all permintaan mutasi dalam dan luar yang diterima
export const getMutasiDiterima = async (req, res) => {
    try {
        const response = await prisma.permintaan.findMany({
            where: {
                status: "Diterima",
                tipe_permintaan: "Mutasi",
            },
        });

        const getAsset = await prisma.asset.findUnique({
            where: {
                id: response.id_asset,
            },
        });

        res.status(200).json({ data: response, asset: getAsset });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//get all pengajuan asset yang diterima
export const getPengajuanDiterima = async (req, res) => {
    try {
        const response = await prisma.permintaan.findMany({
            where: {
                status: "Diterima",
                tipe_permintaan: "Pengajuan",
            },
        });

        const getAsset = await prisma.asset.findUnique({
            where: {
                id: response.id_asset,
            },
        });

        res.status(200).json({ data: response, asset: getAsset });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
