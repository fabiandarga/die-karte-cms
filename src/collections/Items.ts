import { CollectionConfig } from 'payload/types';
import { isAdminOrHasMultipleRestaurants } from '../access/isAdminOrHasMultipleRestaurants';
import { isAdminOrOwner } from '../access/isAdminOrOwner';
import { isAdminOrOwnerOrAPI } from '../access/isAdminOrOwnerOrAPI';
import { Item, User } from '../payload-types';

const Items: CollectionConfig = {
  slug: 'items',
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
      name: 'description',
      type: 'text',
    },
    {
      name: 'price',
      type: 'number',
      defaultValue: 0
    },
    {
      name: 'additives',
      type: 'relationship',
      relationTo: 'additives',
      hasMany: true,
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
      },
      access: {
        create: isAdminOrHasMultipleRestaurants,
        update: isAdminOrHasMultipleRestaurants,
      },
    },
    {
        name: 'category',
        type: 'relationship',
        relationTo: 'categories',
        hasMany: false,
        filterOptions: ({ siblingData }) => {
          // returns a Where query dynamically by the type of relationship
          return {
            'restaurant': {
              'equals': (siblingData as Item).restaurant
            }
          };
        },
    },
  ],
};

export default Items;