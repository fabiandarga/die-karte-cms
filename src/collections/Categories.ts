import { CollectionConfig } from "payload/types";
import { isAdminOrOwner } from "../access/isAdminOrOwner";
import { isAdminOrOwnerOrAPI } from "../access/isAdminOrOwnerOrAPI";
import { User } from "../payload-types";

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { 
    singular: 'Kategorie', 
    plural: 'Kategorien'
  },
  admin: {
    useAsTitle: "name",
  },
  access: {
    create: isAdminOrOwner(),
    read: isAdminOrOwnerOrAPI(),
    update: isAdminOrOwner(),
    delete: isAdminOrOwner(),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Kategorie Name',
      admin: { 
        description: 'Bitte geben Sie den Namen der Kategorie an, zum Beispiel "Pizza".'
      },
  },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      label: 'Kategorie Veröffentlicht',
      admin: { 
        description: 'Wenn Sie diese Option aktivieren, wird die ausgewählte Kategorie auf der Website angezeigt' 
      },
    },
    {
      name: 'restaurant',
      type: 'relationship',
      label: 'Restaurant', 
      admin: { 
        description: 'Bitte wählen Sie das Restaurant aus, zu dem die ausgewählte Kategorie gehört.' 
      },
      relationTo: 'restaurants',
      hasMany: false,
      required: true,
      defaultValue: ({ user }: { user: User }) => {
        if (user.role !== "admin" && user.restaurants?.length > 0) {
          return user.restaurants[0];
        }
      },
    },
   
    {
      name: "items",
      type: "array",
      label: "Einträge",
      admin: {  // <- besondere config für Sachen, die nur im Adminbereich benutzt werden.
        components: {
                RowLabel: ({ data }) => {
                  return data?.name || '-';  // <- String oder React Komponente, die als Label für jeden Eintrag benutzt wird.
                },
              },
      },
      fields: [
        {
          name: "name",
          type: "text",
        },
        {
          name: "description",
          type: "text",
        },
        {
          name: "price",
          type: "number",
          defaultValue: 0,
        },
        {
          name: "additives",
          type: "relationship",
          relationTo: "additives",
          hasMany: true,
        },
        {
          name: "published",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
  ],
};

export default Categories;
