const express = require('express');
const { generateLicense, validateLicense, revokeLicense, listLicenses } = require('../controllers/licenseController');

const router = express.Router();

router.post('/generate', generateLicense);
router.post('/validate', validateLicense);
router.post('/revoke', revokeLicense);
router.get('', listLicenses);


module.exports = router;