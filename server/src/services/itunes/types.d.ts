/**
 * Apple Music API Response type definition
 */
export interface AppleMusicAPIResponse {
	resultCount: number;
	results: AppleMusicAPIAlbumItem[];
}

/**
 * Apple Music API Album Item type definition
 */
export type AppleMusicAPIAlbumItem = {
	wrapperType: string;
	collectionType: string;
	artistId: number;
	collectionId: number;
	artistName: string;
	collectionName: string;
	artistViewUrl: string;
	artworkUrl100: string;
	trackCount: number;
	releaseDate: string;
	collectionExplicitness: 'explicit' | 'cleaned' | 'notExplicit';
};
