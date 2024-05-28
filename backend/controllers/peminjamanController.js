import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//add peminjaman
export const addPeminjaman = async (req, res) => {
    try {
        const response = await prisma.peminjaman_asset.create({
            data: {
                id_asset: req.body.id_asset,
                mutasi_id: req.body.mutasi_id,
                user_id: req.body.user_id,
                lokasi_departement: req.body.lokasi_departement,
                tanggal: req.body.tanggal,

            },
        });
        res.status(201).json({ msg: 'Peminjaman created', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//get all peminjaman
export const getPeminjaman = async (req, res) => {
    try {
        const response = await prisma.peminjaman_asset.findMany();
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//get peminjaman by id
export const getPeminjamanById = async (req, res) => {
    try {
        const response = await prisma.peminjaman_asset.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//delete peminjaman
export const deletePeminjaman = async (req, res) => {
    try {
        const response = await prisma.peminjaman_asset.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.status(200).json({ msg: 'Peminjaman deleted', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

