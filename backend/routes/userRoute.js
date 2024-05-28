import express from 'express';
import {getAllUsers, getUserByUsername, login} from '../controllers/userController.js';

// Create an Express Router
const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:username', getUserByUsername);
router.post('/users/login', login)

export default router;
