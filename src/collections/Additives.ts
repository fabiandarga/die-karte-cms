import { CollectionConfig } from "payload/types";
import { anyoneMayAccess } from "../access/generalAccess";
import { isAdmin } from "../access/isAdmin";

const Additives: CollectionConfig = {
    slug: 'additives',
    labels: { 
        singular: 'Zusatzstoff & Allergen', 
        plural: 'Zusatzstoffe & Allergene'
      },
    admin: {
      useAsTitle: 'name',
      
    },
    access: {
        create: isAdmin,
        read: anyoneMayAccess,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: 'name',
            label: 'Namen des Zusatzstoffes oder Allergens',
            type: 'text',
            admin : {   
                description: 'Bitte geben Sie den Namen des Zusatzstoffes oder Allergens an.' 
            },
        },
        {
            name: 'publicId',
            label: 'ID',
            type: 'text',
            unique: true,
            admin: { 
                 description : 'Bitte geben Sie eine eindeutige ID für den Zusatzstoff oder das Allergen an. Diese ID wird in der URL verwendet, um den Zusatzstoff oder das Allergen zu identifizieren. Zum Beispiel: "allergen-1" oder "additive-1".'
            },
        },
        {
            name: 'type',
            label: 'Typ',
            type: 'select',
            admin: { 
                description: 'Bitte wählen Sie aus, ob es sich um einen Zusatzstoff oder Allergen handelt.'
            },
            options: [{ label: 'Zusatzstoff', value: 'additive' }, { label: 'Allergen', value: 'allergen' }]
        }
      ],
};

export default Additives;