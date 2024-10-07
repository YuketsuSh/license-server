import express from 'express';
import dotenv from 'dotenv';
import licenseRoutes from './routes/licenseRoutes.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import { initializeDB } from './config/db.mjs';
import License from './models/License.mjs';

dotenv.config();

const app = express();
app.use(express.json());

initializeDB().then(async () => {
    await License.sync();
    console.log('Database synchronized with License model');
});

const PORT = process.env.PORT || 9658;

app.use('/api/licenses', licenseRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})