import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getAllRekapitulasi = async (req, res) => {
    try {
        // Mengambil semua record dari tabel mutasi
        const mutasiRecords = await prisma.mutasi.findMany();
        
        // Mengambil data asset untuk setiap kode_asset di mutasi
        const detailedRecords = await Promise.all(
            mutasiRecords.map(async (record) => {
                const asset = await prisma.Asset.findFirst({
                    where: {
                        kode_asset: record.kode_aset
                    }
                });

                // Menggabungkan informasi asset dengan record
                return {
                    ...record,
                    asset: asset ? asset : { nama_aset: 'Asset not found' }
                };
            })
        );

        res.status(200).json({ data: detailedRecords });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

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

