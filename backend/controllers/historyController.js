import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//add history
export const addHistory = async (req, res) => {
    try {
        const response = await prisma.history_asset.create({
            data: {
                nama_penerima: req.body.nama_penerima,
                id_asset: req.body.id_asset,
                user_id: req.body.user_id,
                tanggal: req.body.tanggal,
                lokasi_baru: req.body.lokasi_baru,
                lokasi_lama: req.body.lokasi_lama,
            },
        });
        res.status(201).json({ msg: 'History created', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//get all history
export const getHistory = async (req, res) => {
    try {
        const response = await prisma.history_asset.findMany();
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//get history by id
export const getHistoryById = async (req, res) => {
    try {
        const response = await prisma.history_asset.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//delete history
export const deleteHistory = async (req, res) => {
    try {
        const response = await prisma.history_asset.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.status(200).json({ msg: 'History deleted', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//dleete all history
export const deleteAllHistory = async (req, res) => {
    try {
        const response = await prisma.history_asset.deleteMany();
        res.status(200).json({ msg: 'All History deleted', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


