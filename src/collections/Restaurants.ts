import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrOwner } from '../access/isAdminOrOwner';

const Restaurants: CollectionConfig = {
  slug: 'restaurants',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isAdmin,
    read: isAdminOrOwner('id'),
    update: isAdminOrOwner('id'),
    delete: isAdmin,
  },
  fields: [
    {
        name: 'name',
        type: 'text',
    }
  ],
};

export default Restaurants;