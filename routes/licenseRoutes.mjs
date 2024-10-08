import express from 'express';
import {
    generateLicense,
    validateLicense,
    revokeLicense,
    listLicenses,
    editLicense
} from '../controllers/licenseController.mjs';

const router = express.Router();

router.post('/generate', generateLicense);
router.post('/validate', validateLicense);
router.post('/revoke', revokeLicense);
router.get('', listLicenses);
router.put('/edit', editLicense)


export default router;