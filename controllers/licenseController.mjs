import jwt from 'jsonwebtoken';
import License from '../models/License.mjs';

export const generateLicense = async (req, res) => {
    const { user, domain, ipAddress } = req.body;

    if (!user || !domain || !ipAddress) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const licenseKey = jwt.sign({ user, domain, ipAddress }, process.env.LICENSE_SECRET, { expiresIn: '1y' });

    try {
        const newLicense = await License.create({ user, domain, ipAddress, licenseKey });
        res.status(201).json({ licenseKey: newLicense.licenseKey });
    } catch (error) {
        res.status(500).json({ error: 'Error generating license' });
    }
};

export const validateLicense = async (req, res) => {
    const { licenseKey, domain, ipAddress } = req.body;

    try {
        const decoded = jwt.verify(licenseKey, process.env.LICENSE_SECRET);

        if (decoded.exp * 1000 < Date.now()) {
            return res.status(403).json({ valid: false, message: 'License has expired' });
        }

        const validLicense = await License.findOne({
            where: { licenseKey, domain, ipAddress }
        });

        if (validLicense) {
            res.status(200).json({ valid: true, message: 'License is valid' });
        } else {
            res.status(403).json({ valid: false, message: 'Domain or IP address does not match' });
        }
    } catch (error) {
        res.status(403).json({ valid: false, message: 'Invalid license' });
    }
};

export const revokeLicense = async (req, res) => {
    const { licenseKey } = req.body;

    try {
        const result = await License.destroy({ where: { licenseKey } });

        if (result === 0) {
            return res.status(404).json({ message: 'License not found' });
        }

        res.status(200).json({ message: 'License was revoked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error revoking license' });
    }
};

export const listLicenses = async (req, res) => {
    try {
        const licenses = await License.findAll();
        res.status(200).json(licenses);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching licenses' });
    }
};
