import express from 'express'
import { addVendor, getVendors, getCardsByVendor } from '../controllers/cardController.js';
import { addCard } from '../controllers/cardController.js';

const router = express.Router();

router.post('/addVendor', addVendor);
router.post('/addCard', addCard);
router.get('/vendors', getVendors);
router.get('/getCards/:vendor', getCardsByVendor);

export default router;
