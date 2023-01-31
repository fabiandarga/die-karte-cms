import { Payload } from "payload";
import { User, Restaurant, Category } from "./payload-types";

export const seed = async (payload: Payload): Promise<void> => {
  const res1 = await payload.create<Restaurant>({
    collection: "restaurants",
    data: {
      id: "123456789",
      name: "Peter Parker Restaurant",
      prefix: "Seit 2001",
      contact: {
        telephone: "123456789",
        fax: "123456789",
        email: "peter@parker.com",
      },
      address: {
        line: "123 Main St",
      },
      socialmedia: {
        facebook: "https://www.facebook.com/peterparker",
        twitter: "https://www.twitter.com/peterparker",
        instagram: "https://www.instagram.com/peterparker",
        linkedin: "https://www.linkedin.com/peterparker",
        tiktok: "https://www.tiktok.com/peterparker",
      },
    },
  });

  const restaurantId = res1.id;

  await payload.create<Category>({
    collection: "categories",
    data: {
      name: "Pizza",
      published: true,
      restaurant: restaurantId,
      items: {
        name: "Pizza Margherita",
        description: "Pizza Margherita",
        price: 10,
        additives: "Tomato Sauce",
        published: true,
      },
    },
  });

  await payload.create<User>({
    collection: "users",
    data: {
      role: "admin",
      restaurants: [restaurantId],
      email: "peter@parker.com",
      password: "test",
    },
  });
};
export default seed;
