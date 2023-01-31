import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      required: true,
    },
    {
      name: 'role',
      label: 'Rolle',
      type: 'select',
      options: [{ label: 'Admin', value: 'admin' }, { label: 'Besitzer', value: 'owner'}, { label: 'Mitarbeiter', value: 'editor'} ],
      defaultValue: ({ user }) => { return 'admin' },
      access: {
        read: isAdminFieldLevel,
      },
    },
    {
      name: 'restaurants',
      label: 'Restaurants',
      saveToJWT: true,
      type: 'relationship',
      relationTo: 'restaurants',
      hasMany: true,
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    }
    // Email added by default
    // Add more fields as needed
  ],
};

export default Users;