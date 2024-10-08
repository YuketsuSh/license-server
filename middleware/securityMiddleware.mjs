const validateLicenseSecret = (req, res, next) => {
    const clientSecret = req.headers['x-license-secret'] || req.body.licenseSecret;

    if (!clientSecret || clientSecret !== process.env.LICENSE_SECRET) {
        return res.status(403).json({ error: 'Access denied. Invalid or missing LICENSE_SECRET.' });
    }

    next();
};

export default validateLicenseSecret;