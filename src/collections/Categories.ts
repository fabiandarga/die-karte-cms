import { CollectionConfig } from 'payload/types';
import { anyoneIsAllowed } from '../access/generalAccess';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { User } from '../payload-types';

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: anyoneIsAllowed,
    read: anyoneIsAllowed,
    update: anyoneIsAllowed,
    delete: isAdmin,
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
  ],
};

export default Categories;