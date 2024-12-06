import { Router } from 'express';

import { AlbumController } from '../controllers/album';
import { AlbumInstance } from '../models/album';

/**
 * Creates the albums router with its model and controller
 * @param param0: {albumModel: AlbumInstance}
 * @returns the albums router
 */
export const createAlbumRouter = ({
	albumModel,
}: {
	albumModel: AlbumInstance;
}): Router => {
	const albumsRouter = Router();
	const albumController = new AlbumController({ albumModel });

	albumsRouter.get('/', albumController.search);

	return albumsRouter;
};
