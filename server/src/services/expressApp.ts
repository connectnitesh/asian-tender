import express , { Application } from 'express';

import { authRoute } from '../routes'
import { tenderRoute } from '../routes'
 

export default async(app: Application) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true}))

    
    app.use('/auth', authRoute);
    app.use('/tender', tenderRoute);

    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error(err.stack);
        res.status(500).send({ message: err.message });
    });

    return app;

}

  