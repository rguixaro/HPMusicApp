import { Request, Response } from 'express';

import { AlbumInstance } from '../models/album';

/**
 * Album controller with the search method
 */
export class AlbumController {
	private albumModel: AlbumInstance;

	constructor({ albumModel }: { albumModel: AlbumInstance }) {
		this.albumModel = albumModel;
	}

	search = async (request: Request, response: Response): Promise<any> => {
		const artist = request.query.artist as string;
		if (!artist)
			return response
				.status(400)
				.json({ success: false, message: 'Artist is required' });
		let albums = await this.albumModel.searchBy({ artist });
		albums = this.albumModel.filterAlbumsBy({ albums, field: 'collectionName' });
		const resources = this.albumModel.classifyAlbums({ resources: albums });
		return response.json({ success: true, resources });
	};
}
