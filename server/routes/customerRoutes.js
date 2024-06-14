import express from 'express'

import { addCustomer } from '../controllers/customerController.js';
const router = express.Router();

router.post('/add', addCustomer);


export default router;
