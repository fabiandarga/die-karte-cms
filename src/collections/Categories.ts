import { CollectionConfig } from 'payload/types';
import { isAdminOrOwner } from '../access/isAdminOrOwner';
import { isAdminOrOwnerOrAPI } from '../access/isAdminOrOwnerOrAPI';
import { User } from '../payload-types';

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isAdminOrOwner(),
    read: isAdminOrOwnerOrAPI,
    update: isAdminOrOwner(),
    delete: isAdminOrOwner(),
  },
  fields: [
    {
        name: 'name',
        type: 'text',
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
    },
    {
        name: 'restaurant',
        type: 'relationship',
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