const express = require('express');
const { generateLicense, validateLicense } = require('../controllers/licenseController');

const router = express.Router();

router.post('/generate', generateLicense);
router.post('/validate', validateLicense);

module.exports = router;