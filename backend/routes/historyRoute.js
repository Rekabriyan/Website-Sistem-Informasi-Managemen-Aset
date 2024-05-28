import express from 'express';
import {addHistory,getHistory,getHistoryById,deleteAllHistory,deleteHistory} from '../controllers/historyController.js';

// Create an Express Router
const router = express.Router();

router.post('/history', addHistory);
router.get('/history', getHistory);
router.get('/history/:id', getHistoryById);
router.delete('/history/:id', deleteHistory);
router.delete('/history', deleteAllHistory);

export default router;
