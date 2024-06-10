import express from 'express';
import App from './services/expressApp';
import dbConnection from './services/database';
import { PORT } from './config';
import cors from 'cors';


const StartServer = async () => {

    const app = express();
    app.use(cors());

    await dbConnection()

    await App(app);

    app.listen(PORT, () => {
        console.log(`Listening to port: ${PORT}`);
    })
}

StartServer();