import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//insert asset
export const insertAsset = async (req, res) => {
    const isGA = req.body.role === "general affair" ? true : false;
    
    if(!isGA) return res.status(401).json({ msg: 'Unauthorized' });

    try {
        const response = await prisma.asset.create({
            data: {
                kode_asset: req.body.kode,
                nama_asset: req.body.nama,
                jenis_asset: req.body.jenis,
                aspek_legal: req.body.aspek_legal, 
                spesifikasi: req.body.spesifikasi,
                harga: req.body.harga,
                jumlah_asset: req.body.jumlah, //default 1
                status_ketersediaan: req.body.status_ketersediaan, //langsung tersedia
                keterangan: req.body.keterangan,
                lokasi: req.body.lokasi,
                tanggal_pembelian: new Date(req.body.tanggal_pembelian).toISOString(),
                asal_usul_pembelian: req.body.asal_usul_pembelian, //Riwayat Perolehan
                kondisi_asset: req.body.kondisi, //default baik
                kode_register: req.body.kode_register,
                merk: req.body.merk,
                pengguna_asset: req.body.pengguna_asset
            },
        });
        res.status(201).json({ msg: 'Asset created', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//get all assets
export const getAssets = async (req, res) => {
    try {
        const response = await prisma.asset.findMany();
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//get all available assets
export const getAvailableAssets = async (req, res) => {
    try {
        const response = await prisma.asset.findMany({
            where: {
                status_ketersediaan: 'Tersedia',
            }
        });
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//get asset by name
export const getAssetbyname = async (req, res) => {
    try {
        const response = await prisma.asset.findUnique({
            where: {
                nama_asset: req.params.nama_asset,
            },
        });
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//get asset by name
export const getAssetbyId = async (req, res) => {
    try {
        const response = await prisma.asset.findUnique({
            where: {
                nama_asset: req.params.id,
            },
        });
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//delete asset
export const deleteAsset = async (req, res) => {
    // const isGA = req.body.role === 'general affair' ? true : false;
    // if(!isGA) return res.status(401).json({ msg: 'Unauthorized' });

    try {
        const response = await prisma.asset.delete({
            where: {
                id: parseInt(req.params.kode_asset),
            },
        });
        res.status(200).json({ msg: 'Asset deleted', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//update asset
export const updateAsset = async (req, res) => {
    // const isGA = req.body.role === "general affair" ? true : false;
    // if(!isGA) return res.status(401).json({ msg: 'Unauthorized' });

    try {
        const response = await prisma.asset.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                kode_asset: req.body.kode_asset,
                nama_asset: req.body.nama_asset,
                jenis_asset: req.body.jenis_asset,
                aspek_legal: req.body.aspek_legal, 
                spesifikasi: req.body.spesifikasi,
                harga: req.body.harga,
                jumlah_asset: req.body.jumlah, //default 1
                status_ketersediaan: req.body.status_ketersediaan, //langsung tersedia
                keterangan: req.body.keterangan,
                lokasi: req.body.lokasi,
                tanggal_pembelian: new Date(req.body.tanggal_pembelian).toISOString(),
                asal_usul_pembelian: req.body.asal_usul_pembelian, //Riwayat Perolehan
                kondisi_asset: req.body.kondisi_asset, //default baik
                kode_register: req.body.kode_register,
                merk: req.body.merk,
                pengguna_asset: req.body.pengguna_asset
            },
        });
        res.status(200).json({ msg: 'Asset updated', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//get all asset by jenis
export const getAssetbyjenis = async (req, res) => {
    try {
        const response = await prisma.asset.findMany({
            where: {
                jenis_asset: req.params.jenis_asset,
            },
        });
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};