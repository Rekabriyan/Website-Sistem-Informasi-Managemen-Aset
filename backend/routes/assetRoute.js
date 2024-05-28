import express from 'express';
import {insertAsset, getAssets, getAssetbyname, updateAsset, deleteAsset} from '../controllers/assetController.js';

// Create an Express Router
const router = express.Router();

router.post('/assets', insertAsset);
router.get('/assets', getAssets);
router.get('/assets/:nama_asset', getAssetbyname);
router.put('/assets/:nama_asset', updateAsset);
router.delete('/assets/:nama_asset', deleteAsset);

export default router;
