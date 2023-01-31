import { describe } from "node:test";
import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrOwner } from "../access/isAdminOrOwner";
import { isAdminOrOwnerOrAPI } from "../access/isAdminOrOwnerOrAPI";

const Restaurants: CollectionConfig = {
  slug: "restaurants",
  labels: {
    singular: "Restaurant",
    plural: "Restaurants",
  },
  admin: {
    useAsTitle: "name",
  },
  access: {
    create: isAdmin,
    read: isAdminOrOwnerOrAPI("id"),
    update: isAdminOrOwner("id"),
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      admin: {
        description:
          "Bitte geben Sie den Namen des Restaurants oder des Geschäfts an.",
      },
    },
    {
      name: "prefix",
      type: "text",
      label: "Prefix",
      admin: {
        description: "Wird über dem Logo (Restaurant Name) angezeigt",
      },
    },
    {
      name: "suffix",
      type: "text",
      label: "Untertitel",
      admin: {
        description:
          "Der Untertitel wird unter dem Namen des Restaurants (Logo) angezeigt.",
      },
    },
    {
      name: "logoImage",
      type: "upload", // required
      relationTo: "media", // required
      required: false,
      label: "Logo",
      admin: {
        description:
          "Bitte geben Sie die URL des Logos des Restaurants oder des Geschäfts ein. Wenn Sie noch keine URL für Ihr Logo haben, kontaktieren Sie bitte den Webentwickler.",
      },
    },
    {
      name: "contact",
      label: "Kontakt",
      admin: {
        description:
          "Die Angabe von Kontaktinformationen ist optional und werden nur angezeigt, wenn Sie diese hier eingeben.",
      },
      type: "group",
      fields: [
        {
          name: "telephone",
          type: "text",
          label: "Telefon",
          admin: {
            description:
              "Bitte geben Sie die Kontakttelefonnummer des Restaurants oder des Geschäfts ein.",
          },
        },
        {
          name: "fax",
          type: "text",
          label: "Fax",
          admin: {
            description:
              "Bitte geben Sie die Faxnummer des Restaurants oder des Geschäfts ein.",
          },
        },
        {
          name: "email",
          type: "text",
          label: "E-Mail",
          admin: {
            description:
              "Bitte geben Sie die E-Mail-Adresse des Restaurants oder des Geschäfts ein.",
          },
        },
      ],
    },
    {
      name: "address",
      type: "array",
      label: "Adresse",
      admin: {
        description:
          "Die Angabe von Adressen ist optional und werden nur angezeigt, wenn Sie diese hier eingeben.",
      },
      fields: [
        {
          name: "line",
          type: "text",
        },
      ],
    },
    {
      name: "socialmedia",
      type: "group",
      label: "Social Media Links",
      admin: {
        description:
          'Hier können Sie die Links zu Ihren Social Media-Profilen hinzufügen (z.B. "https://www.facebook.com/t3nMagazin/").',
      },
      fields: [
        { name: "facebook", type: "text" },
        { name: "twitter", type: "text" },
        { name: "instagram", type: "text" },
        { name: "linkedin", type: "text" },
        { name: "tiktok", type: "text" },
      ],
    },
  ],
};

export default Restaurants;
