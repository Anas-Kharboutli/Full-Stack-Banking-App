import express from 'express';
import { signup, signin, deposit, withdraw, retrieveData } from '../controllers/account.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/deposit', deposit);
router.post('/withdraw', withdraw);
router.get('/data', retrieveData);


export default router;
