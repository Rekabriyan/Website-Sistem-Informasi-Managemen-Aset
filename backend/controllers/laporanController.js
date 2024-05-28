import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//add laporan
export const addLaporan = async (req, res) => {
    try {
        const response = await prisma.laporan.create({
            data: {
                kode_asset: req.body.kode_asset,
                nama_asset: req.body.nama_asset,
                jumlah_asset: req.body.jumlah_asset,
                jenis_asset: req.body.jenis_asset,
                nomor_register: req.body.nomor_register,
                jumlah_harga: req.body.jumlah_harga,
            },
        });
        res.status(201).json({ msg: 'Laporan created', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//delete laporan
export const deleteLaporan = async (req, res) => {
    try {
        const response = await prisma.laporan.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.status(200).json({ msg: 'Laporan deleted', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};