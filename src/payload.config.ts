import { buildConfig } from 'payload/config';
import path from 'path';
import { Categories, Users, Restaurants, Media, Additives, Themes } from './collections';
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import Logo from './graphics/Logo';
import Icon from './graphics/Logo';
import { seed } from './seed';

const adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region : process.env.S3_REGION,
  },
  bucket: process.env.S3_BUCKET,
})

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  cors: '*',
  admin: {
    user: Users.slug,
    css: path.resolve(__dirname, './styles/admin.scss'),
    meta: {
      titleSuffix: 'Die Karte',
      favicon: '/assets/favicon-svg.svg',
      ogImage: '/assets/logo-svg.svg',
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
  },
  collections: [
    Users,
    Media,
    Restaurants,
    Categories,
    Additives,
    Themes,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  onInit: async (payload) => {
    if (process.env.PAYLOAD_SEED) {
      try {
        await seed(payload);
        console.log('Seeding finished');
      } catch (err) {
        console.error('Could not complete seeding data', err);
      }
    }
  },
  plugins: [
    cloudStorage({
      collections: {
        'media': {
          adapter: adapter, 
        },
      },
    }),
  ],
});
