import express from 'express';
import {addLaporan,deleteLaporan, getAllRekapitulasi} from '../controllers/laporanController.js';

// Create an Express Router
const router = express.Router();

router.post('/laporan', addLaporan);
router.get('/laporan', getAllRekapitulasi);
router.delete('/laporan/:id', deleteLaporan);

export default router;
