import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



//insert asset
export const insertAsset = async (req, res) => {
    const isGA = req.body.role === 'GA' ? true : false;
    if(!isGA) return res.status(401).json({ msg: 'Unauthorized' });

    try {
        const response = await prisma.asset.create({
            data: {
                kode_asset: req.body.kode_asset,
                nama_asset: req.body.nama_asset,
                jenis_asset: req.body.jenis_asset,
                jumlah_asset: req.body.jumlah_asset,
                status_ketersediaan: req.body.status_ketersediaan,
                keterangan: req.body.keterangan_asset,
                lokasi_asset: req.body.lokasi_asset,
                tanggal_pembelian: new Date(req.body.tanggal_pembelian).toISOString(),
                asal_usul_perolehan: req.body.asal_usul_perolehan,
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

//delete asset
export const deleteAsset = async (req, res) => {
    const isGA = req.body.role === 'GA' ? true : false;
    if(!isGA) return res.status(401).json({ msg: 'Unauthorized' });

    try {
        const response = await prisma.asset.delete({
            where: {
                kode_asset: req.params.kode_asset,
            },
        });
        res.status(200).json({ msg: 'Asset deleted', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//update asset
export const updateAsset = async (req, res) => {
    const isGA = req.body.role === 'GA' ? true : false;
    if(!isGA) return res.status(401).json({ msg: 'Unauthorized' });

    try {
        const response = await prisma.asset.update({
            where: {
                nama_asset: req.params.nama_asset,
            },
            data: {
                kode_asset: req.body.kode_asset,
                nama_asset: req.body.nama_asset,
                jenis_asset: req.body.jenis_asset,
                jumlah_asset: req.body.jumlah_asset,
                status_asset: req.body.status_asset,
                keterangan_asset: req.body.keterangan_asset,
                lokasi_asset: req.body.lokasi_asset,
                tanggal_pembelian: req.body.tanggal_pembelian,
                asal_usul_perolehan: req.body.asal_usul_perolehan,
            },
        });
        res.status(200).json({ msg: 'Asset updated', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};