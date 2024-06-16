import express from 'express'
import { addPhoneNo ,getAllPhoneNo, addConnection, getVendorPhoneNo, getAllActiveConnections, deactivateConnection, checkPhoneNumber} from '../controllers/phoneNoController.js';

const router = express.Router();

router.post('/add', addPhoneNo);
router.get('/getAllPhoneNo', getAllPhoneNo);
router.put('/addConnection/:id', addConnection);
router.get('/getVendorPhoneNo/:vendor', getVendorPhoneNo);
router.get('/getAllActiveConnections', getAllActiveConnections);
router.put('/deactivateConnection/:id', deactivateConnection);
router.post('/checkPhoneNumber', checkPhoneNumber);


export default router;
