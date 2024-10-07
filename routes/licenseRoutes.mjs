import express from 'express';
import { generateLicense, validateLicense, revokeLicense, listLicenses } from '../controllers/licenseController.mjs';

const router = express.Router();

router.post('/generate', generateLicense);
router.post('/validate', validateLicense);
router.post('/revoke', revokeLicense);
router.get('', listLicenses);


export default router;