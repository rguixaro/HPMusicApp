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

	app.use('/albums', createAlbumRouter({ albumModel }));

	app.listen(PORT, () => {
		console.log(`server listening on port http://localhost:${PORT}`);
	});
};
