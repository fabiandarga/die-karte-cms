import { FilterOptionsProps } from 'payload/dist/fields/config/types';
import { CollectionConfig } from 'payload/types';
import { anyoneIsAllowed } from '../access/generalAccess';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { Item, Restaurant, User } from '../payload-types';

const Items: CollectionConfig = {
  slug: 'items',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: anyoneIsAllowed,
    read: anyoneIsAllowed,
    update: anyoneIsAllowed,
    delete: anyoneIsAllowed,
  },
  fields: [
    {
        name: 'name',
        type: 'text',
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