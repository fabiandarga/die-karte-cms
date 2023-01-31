import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  fields: [],
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
};

export default Media;