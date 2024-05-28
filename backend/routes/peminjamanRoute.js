import express from 'express';
import {addPeminjaman, getPeminjaman, getPeminjamanById, deletePeminjaman} from '../controllers/peminjamanController.js';

// Create an Express Router
const router = express.Router();

router.post('/peminjaman', addPeminjaman);
router.get('/peminjaman', getPeminjaman);
router.get('/peminjaman/:id', getPeminjamanById);
router.delete('/peminjaman/:id', deletePeminjaman);

export default router;
