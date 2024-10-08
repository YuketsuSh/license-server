import express from 'express';
import {
    generateLicense,
    validateLicense,
    revokeLicense,
    listLicenses,
    editLicense, regenerateLicense
} from '../controllers/licenseController.mjs';
import validateLicenseSecret from '../middleware/securityMiddleware.mjs';


const router = express.Router();

router.post('/generate', validateLicenseSecret, generateLicense);
router.post('/validate', validateLicenseSecret, validateLicense);
router.post('/revoke', validateLicenseSecret, revokeLicense);
router.get('', validateLicenseSecret, listLicenses);
router.put('/edit', validateLicenseSecret, editLicense);
router.post('/regenerate', validateLicenseSecret, regenerateLicense);


export default router;