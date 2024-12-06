import AppleMusicAPI, {
	AppleMusicAPIAlbumItem,
	AppleMusicAPIResponse,
} from '../services/itunes';

export type AlbumInstance = typeof AlbumModel;
export type AlbumItemFilterField = 'collectionName' | 'artistName';

/**
 * Album model with methods to search and filter albums
 */
export class AlbumModel {
	/**
	 * Default parameters for the Apple Music API search
	 */
	private static defaultParams = {
		media: 'music',
		entity: 'album',
		attribute: 'artistTerm',
	};

	/**
	 * Search for albums by artist name using the Apple Music API
	 * @param param0
	 * @returns {Promise<AppleMusicAPIAlbumItem[]>}
	 */
	static async searchBy({
		artist,
	}: {
		artist: string;
	}): Promise<AppleMusicAPIAlbumItem[]> {
		return await AppleMusicAPI.get('search', {
			params: { term: artist, ...AlbumModel.defaultParams },
		})
			.then((response) => {
				if (!response.data) return [];
				else {
					const resources = response?.data as AppleMusicAPIResponse;
					if (resources.resultCount === 0) return [];
					return resources.results;
				}
			})
			.catch((error) => {
				console.error(error);
				return [];
			});
	}

	/**
	 * Filter out duplicate resources based on the field property
	 * @param param0: {albums: AppleMusicAPIAlbumItem[]; field: AlbumItemFilterField;}
	 * @returns {AppleMusicAPIAlbumItem[]}
	 */
	static filterAlbumsBy({
		albums,
		field,
	}: {
		albums: AppleMusicAPIAlbumItem[];
		field: AlbumItemFilterField;
	}): AppleMusicAPIAlbumItem[] {
		if (!albums?.length) return [];
		return albums.filter((album, index, self) => {
			const firstIndex = self.findIndex(
				(item) => item[field] === album[field]
			);
			return firstIndex === index;
		});
	}
}
