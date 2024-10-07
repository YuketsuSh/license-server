const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 9658;

app.get('/', (req, res) => {
    res.send('License server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})