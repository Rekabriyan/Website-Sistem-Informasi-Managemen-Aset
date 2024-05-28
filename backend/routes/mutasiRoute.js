import express from 'express';
import {addMutasi, getMutasi, getMutasiById, deleteMutasi} from '../controllers/mutasiController.js';

// Create an Express Router
const router = express.Router();

router.post('/mutasi', addMutasi);
router.get('/mutasi', getMutasi);
router.get('/mutasi/:id', getMutasiById);
router.delete('/mutasi/:id', deleteMutasi);

export default router;
