import express from 'express';
import {createRequestAsset, getRequestAssetById, getRequestAssets, updateRequestAsset, deleteRequestAsset} from '../controllers/requestassetController.js';

// Create an Express Router
const router = express.Router();

router.post('/requestassets', createRequestAsset);
router.get('/requestassets', getRequestAssets);
router.get('/requestassets/:no_permintaan', getRequestAssetById);
router.put('/requestassets/:no_permintaan', updateRequestAsset);
router.delete('/requestassets/:no_permintaan', deleteRequestAsset);

export default router;
