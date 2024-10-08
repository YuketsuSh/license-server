import express from 'express';
import {
    generateLicense,
    validateLicense,
    revokeLicense,
    listLicenses,
    editLicense, regenerateLicense
} from '../controllers/licenseController.mjs';

const router = express.Router();

router.post('/generate', generateLicense);
router.post('/validate', validateLicense);
router.post('/revoke', revokeLicense);
router.get('', listLicenses);
router.put('/edit', editLicense);
router.post('/regenerate', regenerateLicense);


export default router;