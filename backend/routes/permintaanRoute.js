import express from 'express';
import { addPermintaan, getAllPermintaan, confirmPermintaan, addMutasi, getMutasiDiterima, getPeminjamanDiterima, getPengajuanDiterima,getAllMutasi, getAllPeminjaman, getAllPengajuan, countAllPengajuan } from '../controllers/permintaanController.js';

// Create an Express Router
const router = express.Router();

router.post('/request', addPermintaan);
router.get('/requests', getAllPermintaan);
router.put('/requests/confirmation/:id', confirmPermintaan);
router.post('/requests/mutasi', addMutasi);
router.get('/requests/peminjaman-diterima', getPeminjamanDiterima);
router.get('/requests/mutasi-diterima', getMutasiDiterima);
router.get('/requests/pengajuan-diterima', getPengajuanDiterima);
router.get('/requests/mutasi', getAllMutasi);
router.get('/requests/peminjaman', getAllPeminjaman);
router.get('/requests/pengajuan', getAllPengajuan);
router.get('/requests/count', countAllPengajuan);

export default router;
