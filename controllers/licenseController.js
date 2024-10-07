const jwt = require('jsonwebtoken');
const licenses = require('../config/default.json');

const generateLicense = (req, res) => {
    const { user, domain, ipAddress } = req.body;

    if (!user || !domain || !ipAddress) {
        return res.status(400).json({error: 'Missing required fields'});
    }

    const licenseKey = jwt.sign({ user, domain, ipAddress }, process.env.LICENSE_SECRET, { expiresIn: '1y' });
    licenses.push({ user, domain, ipAddress, licenseKey });
    res.status(201).json({ licenseKey });
};

const validateLicense = (req, res) => {
    const { licenseKey, domain, ipAddress } = req.body;
    try {
        const decoded = jwt.verify(licenseKey, process.env.LICENSE_SECRET);

        if (decoded.exp * 1000 < Date.now()) {
            return res.status(403).json({ valid: false, message: 'License has expired' });
        }

        const validLicense = licenses.find(
            (lic) => lic.licenseKey === licenseKey && lic.domain === domain && lic.ipAddress === ipAddress
        );

        if (validLicense){
            res.status(200).json({ valid: true, message: 'License is valid' });
        }else{
            res.status(403).json({ valid: false, message: 'Domain or IP address does not match' });
        }

    }catch (error){
        res.status(403).json({ valid: false, message: 'Invalid license' });
    }
};

const revokeLicense = (req, res) => {
  const { licenseKey } = req.body;
  const licenseIndex = licenses.findIndex((lic) => lic.licenseKey === licenseKey);

  if (licenseIndex === -1) {
      return res.status(404).json({ message: 'License not found' });
  }

  licenses.splice(licenseIndex, 1);
  res.status(200).json({ message: 'License was revoked successfully' });
};

const listLicenses = (req, res) => {
  res.status(200).json(licenses);
};

module.exports = { generateLicense, validateLicense, revokeLicense, listLicenses };