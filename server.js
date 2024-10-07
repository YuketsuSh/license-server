const express = require('express');
const dotenv = require('dotenv');

const licenseRoutes = require('./routes/licenseRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 9658;

app.use('/api/licenses', licenseRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})