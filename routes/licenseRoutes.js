const express = require('express');
const { generateLicense, validateLicense, revokeLicense } = require('../controllers/licenseController');

const router = express.Router();

router.post('/generate', generateLicense);
router.post('/validate', validateLicense);
router.post('/revoke', revokeLicense);

module.exports = router;