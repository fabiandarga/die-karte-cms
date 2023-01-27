import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrOwner } from '../access/isAdminOrOwner';
import { isAdminOrOwnerOrAPI } from '../access/isAdminOrOwnerOrAPI';

const Restaurants: CollectionConfig = {
  slug: 'restaurants',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isAdmin,
    read: isAdminOrOwnerOrAPI('id'),
    update: isAdminOrOwner('id'),
    delete: isAdmin,
  },
  fields: [
    {
        name: 'name',
        type: 'text',
        label: 'Name',
    },
    {
      name: 'prefix',
      type: 'text',
      label: 'Prefix',
      admin: {
        description: 'Wird über dem Logo (Restaurant Name) angezeigt'
      }
    },
    {
      name: 'suffix',
      type: 'text',
      label: 'Untertitel',
      admin: {
        description: 'Wird unter dem Logo (Restaurant Name) angezeigt'
      }
    },
    {
        name: 'backgroundImage', // required
        type: 'upload', // required
        relationTo: 'media', // required
        required: true,
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'telephone',
          type: 'text',
        },
        {
          name: 'fax',
          type: 'text',
        },
        {
          name: 'email',
          type: 'text',
        }
      ]
    },
    {
      name: 'address',
      type: 'array',
      fields: [
        {
          name: 'line',
          type: 'text'
        }
      ]
    },
    {
      name: 'socialmedia',
      type: 'group',
      admin: {
        description: 'Social Media Links (z.b. "https://www.facebook.com/t3nMagazin/")'
      },
      fields: [
        { name: 'facebook', type: 'text'},
        { name: 'twitter', type: 'text'},
        { name: 'instagram', type: 'text'},
        { name: 'linkedin', type: 'text'},
        { name: 'tiktok', type: 'text'},
      ],
    }
  ],
};

export default Restaurants;