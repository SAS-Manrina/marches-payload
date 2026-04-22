import type { CollectionConfig } from 'payload'

export const Organizations: CollectionConfig = {
  slug: 'organizations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'businessName', 'type', 'city', 'active'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'businessName',
      type: 'text',
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Association', value: 'association' },
        { label: 'Company', value: 'company' },
        { label: 'Freelance', value: 'freelance' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'siret',
      type: 'text',
    },
    {
      name: 'tva',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'address1',
      type: 'text',
    },
    {
      name: 'address2',
      type: 'text',
    },
    {
      name: 'zipcode',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'presence',
      type: 'select',
      options: [
        { label: 'Chaque semaine', value: 'chaque semaine' },
        { label: '3 fois par mois', value: '3 fois par mois' },
        { label: '2 fois par mois', value: '2 fois par mois' },
        { label: '1 fois par mois', value: '1 fois par mois' },
      ],
    },
    {
      name: 'approvalStatus',
      type: 'select',
      options: [
        { label: 'Intéressé', value: 'interesse' },
        { label: 'En cours', value: 'en cours' },
        { label: 'En attente', value: 'en attente' },
        { label: 'Refus', value: 'refus' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Fruits et légumes', value: 'fruits et legumes' },
        { label: 'Complément alimentaire', value: 'complement alimentaire' },
        { label: 'Conférence', value: 'conference' },
        { label: 'Viandes et charcuteries', value: 'viandes et charcuteries' },
        { label: 'Produits de la mer', value: 'produits de la mer' },
        { label: 'Produits laitiers', value: 'produits laitiers' },
        { label: 'Boulangerie et pâtisserie', value: 'boulangerie et patisserie' },
        { label: 'Produit de la ruche', value: 'produit de la ruche' },
        { label: 'Oeuf et volailles', value: 'oeuf et volailles' },
        { label: 'Boissons locales', value: 'boissons locales' },
        { label: 'Pépinière', value: 'pepiniere' },
        { label: 'Chocolat et confiseries', value: 'chocolat et confiseries' },
        { label: 'Épices et condiments', value: 'epices et condiments' },
        { label: 'Conserve et confitures', value: 'conserve et confitures' },
        { label: 'Articles en bois', value: 'articles en bois' },
        { label: 'Poteries', value: 'poteries' },
        { label: 'Décoration', value: 'decoration' },
        { label: 'Bijoux artisanaux', value: 'bijoux artisanaux' },
        { label: 'Vêtement et accessoires', value: 'vetement et accessoires' },
        { label: 'Bien-être', value: 'bien-etre' },
        { label: 'Cosmétiques', value: 'cosmetiques' },
        { label: 'Papéteries', value: 'papeteries' },
        { label: "Produits d'hygiènes", value: 'produits hygiene' },
        { label: 'Atelier', value: 'atelier' },
        { label: 'Glaces', value: 'glaces' },
        { label: 'Aromatique', value: 'aromatique' },
        { label: 'Restauration', value: 'restauration' },
        { label: 'Sport', value: 'sport' },
        { label: 'Boisson Alcoolisé', value: 'boisson alcoolise' },
      ],
    },
    {
      name: 'marketZone',
      type: 'select',
      options: [
        { label: 'Produits transformés', value: 'produits transformes' },
        { label: 'Alimentaire', value: 'alimentaire' },
        { label: 'Artisanal', value: 'artisanal' },
        { label: 'Service', value: 'service' },
        { label: 'Divers', value: 'divers' },
        { label: 'Commune', value: 'commune' },
      ],
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'photos',
      type: 'array',
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'members',
      type: 'join',
      collection: 'users',
      on: 'organization',
    },
  ],
}
