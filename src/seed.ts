import { Payload } from "payload";
import { User, Restaurant, Category, Themes  } from "./payload-types";

export const seed = async (payload: Payload): Promise<void> => {
  
  const themes = ['cafe-hugo', 'chalk-pink', 'coffee-light', 'greek-blue', 'peaches', 'vegav'];
  const theme = await Promise.all(
    themes.map(name => {
      return payload.create<Themes>({ 
        collection: "themes",
        data: {
          name,
        },
      });
    }
  );

  const res1 = await payload.create<Restaurant>({
    collection: "restaurants",
    data: {
      name: "Peter Parkers",
      slug: "peter-parkers",
      theme: theme[0].id,
      prefix: "Great Taste",
      suffix: "Great Responsibility",
      contact: {
        telephone: "040 / 1234 5678",
        fax: "",
        email: "info@parkers.de",
      },
      address: [
        { line: 'Am Stadtzentrum 51a' },
        { line: '34567 Hamburg' },
      ],
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
  if (!res1.id) {
    throw new Error("No restaurant created");
  }

  await payload.create<Category>({
    collection: "categories",
    data: {
      name: "Pizza",
      published: true,
      restaurant: restaurantId,
      items: [{
        name: "Pizza Margherita",
        description: "Just Pizza",
        price: 10,
        additives: [],
        published: true,
      },
      {
        name: "Pizza Salami",
        description: "Pizza mit bester Salami",
        price: 12,
        additives: [],
        published: true,
      },
      {
        name: "Pizza Thuna",
        description: "Frischer Thunfisch und Kapern",
        price: 13.50,
        additives: [],
        published: true,
      },
      {
        name: "Pizza Quadro Frommagie",
        description: "Pizza mit vier Käsesorten",
        price: 13,
        additives: [],
        published: true,
      },
      {
        name: "Pizza Hawaii",
        description: "Schinken und frische Ananas",
        price: 12.50,
        additives: [],
        published: true,
      }],
    },
  });

  await payload.create<Category>({
    collection: "categories",
    data: {
      name: "Drinks",
      published: true,
      restaurant: restaurantId,
      items: [{
        name: "Spider Cola",
        price: 3.99,
        additives: [],
        published: true,
      },{
        name: "Spider Lemon",
        price: 3.99,
        additives: [],
        published: true,
      },{
        name: "Spider Orange",
        price: 3.99,
        additives: [],
        published: true,
      },],
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
