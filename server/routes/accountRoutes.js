import express from 'express'
import { createAccount, getAllAccounts, getAccountById, updateAccount, checkAccount, getDealerAccounts, getCustomerAccounts } from '../controllers/accountController.js';

const router = express.Router();

router.post('/create', createAccount);
router.get('/getAllAccounts', getAllAccounts);
router.get('/getAccountById/:id', getAccountById);
router.put('/update/:id', updateAccount);
router.get('/checkAccount/:newAccountNo', checkAccount);
router.get('/getDealerAccounts', getDealerAccounts);
router.get('/getCustomerAccounts', getCustomerAccounts);

export default router;
