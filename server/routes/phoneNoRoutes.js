import express from 'express'
import {updateCustody, addPhoneNo ,getAllPhoneNo, addConnection, getVendorPhoneNo, getAllActiveConnections, deactivateConnection, checkPhoneNumber, getVendors} from '../controllers/phoneNoController.js';

const router = express.Router();

router.post('/add', addPhoneNo);
router.get('/getAllPhoneNo', getAllPhoneNo);
router.put('/addConnection/:id', addConnection);
router.get('/getVendorPhoneNo/:vendor', getVendorPhoneNo);
router.get('/getAllActiveConnections', getAllActiveConnections);
router.put('/deactivateConnection/:id', deactivateConnection);
router.post('/checkPhoneNumber', checkPhoneNumber);
router.put('/updateCustody/:id', updateCustody);
router.get('/vendors', getVendors);


export default router;
