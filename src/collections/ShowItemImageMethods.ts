import { CollectionConfig } from 'payload/types';

const ShowItemImageMethods: CollectionConfig = {
  slug: 'showItemImageMethods',
  fields: [
    {
        name: "Bildmethode",
        type: "select",
        label: "Show Item Image Methods",
        hasMany: true,
        admin: {
            isClearable: true,
            isSortable: true,
          description:
            "Bitte wählen Sie die Methode aus, die Sie für das Anzeigen von Bildern verwenden möchten.",
        },
        options: [
            {
              label: 'Metallic Paint',
              value: 'metallic_paint',
            },
            {
              label: 'Alloy Wheels',
              value: 'alloy_wheels',
            },
            {
              label: 'Carbon Fiber Dashboard',
              value: 'carbon_fiber_dashboard',
            },
          ],
      },
  ]
}

export default ShowItemImageMethods;