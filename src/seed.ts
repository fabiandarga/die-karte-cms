import { Payload } from "payload";
import { User, Restaurant, Category, Media} from "./payload-types";


export const seed = async (payload: Payload): Promise<void> => {
  const img =  await payload.create<Media>({
        collection: 'media',
        data: {
            id: '123456789',
            url: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F7db254f7-79aa-4a17-aad4-ca6515c7cbc8_1200x675.jpeg',
            filename: 'logo.png',
            mimeType: 'image/png',
            filesize: 123456789,
            width: 123,
            height: 123,
            sizes: {
                thumbnail: {
                    url: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F7db254f7-79aa-4a17-aad4-ca6515c7cbc8_1200x675.jpeg',
                    width: 123,
                    height: 123,
                    mimeType: 'image/png',
                    filesize: 123456789,
                    filename: 'logo.png',
                },
            },
        }
    })
    
  const res1 = await payload.create<Restaurant>({
    
    collection: 'restaurants',
    data: {
        id : '123456789',
        name: 'Peter Parker Restaurant',
        prefix: 'Seit 2001',
        logoImage: img.id,
        contact: {
          telephone: '123456789',
          fax: '123456789',
          email: 'peter@parker.com',
        },
        address: {
          line: '123 Main St',
        },
        socialmedia: {
          facebook: 'https://www.facebook.com/peterparker',
          twitter: 'https://www.twitter.com/peterparker',
          instagram: 'https://www.instagram.com/peterparker',
          linkedin: 'https://www.linkedin.com/peterparker',
          tiktok: 'https://www.tiktok.com/peterparker',
        },
    }
  })

  const id = res1.id;

  await payload.create<Category>({
    collection: 'category',
    data: {
        id: id,
        name: 'Pizza',
        published: true,
        restaurant: 'Peter Parker Restaurant',
        items: {
            id: id,
            name: 'Pizza Margherita',
            description: 'Pizza Margherita',
            price: 10,
            additives: 'Tomato Sauce',
            published: true,
        },
    }
  })


  await payload.create<User>({
    collection: 'users',
    data: {
      id: id,
      role: 'admin',
      restaurants: [],
      email: 'peter@parker.com',
      resetPasswordToken: 'test',
    }
  })
}
export default seed;