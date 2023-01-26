import { CollectionConfig } from 'payload/types';
import { isAdminOrOwner } from '../access/isAdminOrOwner';
import { isAdminOrOwnerOrAPI } from '../access/isAdminOrOwnerOrAPI';
import { User } from '../payload-types';

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { 
    singular: 'Kategorie', 
    plural: 'Kategorien'
  },
  admin: {
    useAsTitle: 'name',
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
      name: 'published',
      type: 'checkbox',
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
          if (user.role !== 'admin' && user.restaurants?.length > 0) {
              return user.restaurants[0];
          }
      }
    },
  ],
};

export default Categories;