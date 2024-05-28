import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//add mutasi
export const addMutasi = async (req, res) => {
    try {
        const response = await prisma.mutasi_asset.create({
            data: {
                id_asset: req.body.id_asset,
                user_id: req.body.user_id,
                lokasi_departement: req.body.lokasi_departement,
                tanggal: req.body.tanggal,
            },
        });
        res.status(201).json({ msg: 'Mutasi created', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//get all mutasi
export const getMutasi = async (req, res) => {
    try {
        const response = await prisma.mutasi_asset.findMany();
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//get mutasi by id
export const getMutasiById = async (req, res) => {
    try {
        const response = await prisma.mutasi_asset.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//delete mutasi
export const deleteMutasi = async (req, res) => {
    try {
        const response = await prisma.mutasi_asset.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.status(200).json({ msg: 'Mutasi deleted', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};