import express from 'express';
import {insertAsset, getAssets, getAssetbyname, updateAsset, deleteAsset, getAssetbyjenis} from '../controllers/assetController.js';

// Create an Express Router
const router = express.Router();

router.post('/assets', insertAsset);
router.get('/assets', getAssets);
router.get('/assets/:nama_asset', getAssetbyname);
router.put('/assets/:nama_asset', updateAsset);
router.delete('/assets/:kode_asset', deleteAsset);
router.get('/assets/all/:jenis_asset', getAssetbyjenis);

export default router;
