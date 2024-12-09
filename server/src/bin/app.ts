import express from 'express';
import 'dotenv/config';

import { corsMiddleware } from '../middlewares/cors';
import { createAlbumRouter } from '../routes/album';
import { AlbumInstance } from '../models/album';

const { PORT } = process.env;

export const createApp = ({ albumModel }: { albumModel: AlbumInstance }) => {
	const app = express();
	app.use(express.json());
	app.use(corsMiddleware());
	app.disable('x-powered-by');

	const APIv1 = express();
	APIv1.use('/albums', createAlbumRouter({ albumModel }));

	app.use('/api/v1', APIv1);
	app.listen(PORT);
	return app;
};
