import type { Resource } from '../../src/stores/resources'

export const AlbumItemSample: Resource = {
  wrapperType: 'collection',
  collectionType: 'Album',
  artistId: 1217984111,
  collectionId: 1493513886,
  artistName: 'ZOO',
  collectionName: 'Tempestes Vénen del Sud',
  artistViewUrl: 'https://music.apple.com/us/artist/zoo/1217984111?uo=4',
  artworkUrl100:
    'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/7f/90/bc/7f90bc73-a0ea-2d8d-2ef3-f1a749af4549/8429006686698.jpg/100x100bb.jpg',
  collectionExplicitness: 'notExplicit',
  trackCount: 11,
  releaseDate: '2014-11-10T08:00:00Z',
}

export const SingleItemSample: Resource = {
  wrapperType: 'collection',
  collectionType: 'Album',
  artistId: 1504011188,
  collectionId: 1731124162,
  artistName: 'Sexenni & The Tyets',
  collectionName: 'Grup de Pop - Single',
  artistViewUrl: 'https://music.apple.com/us/artist/sexenni/1504011188?uo=4',
  artworkUrl100:
    'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/23/b9/df/23b9df04-6912-f0e4-1125-1e9fae7b943d/8425845941264.jpg/100x100bb.jpg',
  collectionExplicitness: 'notExplicit',
  trackCount: 1,
  releaseDate: '2024-02-29T08:00:00Z',
}

export const EPItemSample: Resource = {
  wrapperType: 'collection',
  collectionType: 'Album',
  artistId: 324938305,
  collectionId: 1528193723,
  artistName: 'Elephanz',
  collectionName: "L'histoire à l'envers - EP",
  artistViewUrl: 'https://music.apple.com/us/artist/elephanz/324938305?uo=4',
  artworkUrl100:
    'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/d5/aa/3d/d5aa3d5d-83b7-0f77-3eca-f628da085caf/cover.jpg/100x100bb.jpg',
  collectionExplicitness: 'notExplicit',
  trackCount: 4,
  releaseDate: '2020-10-30T07:00:00Z',
}

export const ResourcesSample = {
  albums: [AlbumItemSample],
  singles: [SingleItemSample],
  eps: [EPItemSample],
}
