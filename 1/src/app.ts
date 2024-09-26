import express from 'express';
import bodyParser from 'body-parser';
import beeperRoutes from './routes/beeperRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/api/', beeperRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
