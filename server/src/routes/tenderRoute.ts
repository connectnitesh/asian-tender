import express from 'express';
import {
    CreateTender,
    UpdateTender,
    DeleteTender,
    GetAllTenders,
    GetTenderById,
    GlobalTenderSearch,
    DownloadTenderDocument,
    FilterTenders
} from '../controllers';
import {  verifyToken, verifyTokenUser } from '../services/authService';
import  uploadFile  from '../middleware/fileUploadMiddleware'
import { subscribeUser,updateSubscriptionDetails } from '../controllers/subscriptionController';

const router = express.Router();

router.get('/', GetAllTenders);
router.get('/:tID', GetTenderById);
router.get('/filters/query', FilterTenders);
router.get('/search/query', GlobalTenderSearch);
router.get('/download-tender/:tID',verifyTokenUser, DownloadTenderDocument);
router.post('/subscribe', subscribeUser);
router.post('/subscribe/updateStatus', updateSubscriptionDetails);


router.use(verifyToken);
router.post('/create-tender',uploadFile, CreateTender);
router.post('/update-tender/:tID',uploadFile, UpdateTender);
router.post('/delete-tender/:tID', DeleteTender);

export { router as tenderRoute }
