import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//create request asset
export const createRequestAsset = async (req, res) => {

    try {
        const response = await prisma.req_asset.create({
            data: {
                no_permintaan: req.body.no_permintaan,
                tanggal_permintaan: req.body.tanggal_permintaan,
                status_permintaan: "pending",
                durasi: req.body.durasi,
                jenis_permintaan: req.body.jenis_permintaan,
                user_request: req.body.user_request,
                id_asset: req.body.id_asset
            },
        });
        res.status(201).json({ msg: 'Request Asset created', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//get all request asset
export const getRequestAssets = async (req, res) => {
    try {
        const response = await prisma.req_asset.findMany();
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//get request asset by id
export const getRequestAssetById = async (req, res) => {
    try {
        const response = await prisma.req_asset.findUnique({
            where: {
                no_permintaan: parseInt(req.params.no_permintaan),
            },
        });
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//update status request asset
export const updateRequestAsset = async (req, res) => {
    const isGA = req.body.role === 'GA' ? true : false;
    if(!isGA) return res.status(401).json({ msg: 'Unauthorized' });

    try {
        const response = await prisma.req_asset.update({
            where: {
                no_permintaan: parseInt(req.params.no_permintaan),
            },
            data: {
                status_permintaan: req.body.status_permintaan,
            },
        });
        res.status(200).json({ msg: 'Request Asset updated', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//delete request asset
export const deleteRequestAsset = async (req, res) => {
    const isGA = req.body.role === 'GA' ? true : false;
    if(!isGA) return res.status(401).json({ msg: 'Unauthorized' });

    try {
        const response = await prisma.req_asset.delete({
            where: {
                no_permintaan: parseInt(req.params.no_permintaan),
            },
        });
        res.status(200).json({ msg: 'Request Asset deleted', data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//get request asset by user
export const getRequestAssetByUser = async (req, res) => {
    try {
        const response = await prisma.req_asset.findMany({
            where: {
                user_request: req.params.user_request,
            },
        });
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};