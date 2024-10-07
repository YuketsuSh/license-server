import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
});

export const initializeDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL database successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { sequelize };
