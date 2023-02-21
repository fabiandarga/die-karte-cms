import { CollectionConfig } from "payload/types";
import { isAdmin,} from "../access/isAdmin";


const Themes: CollectionConfig = {
  slug: "themes",
  labels: {
    singular: "Theme",
    plural: "Themes",
  },
  admin: {
    useAsTitle: "name",
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Theme",
      admin: {
        description:
          "Bitte geben Sie einen neuen Theme an.",
      },
    },
    ],
    
};

export default Themes;