import type { CollectionConfig } from 'payload'

export const Venues: CollectionConfig = {
  slug: 'venues',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'address', 'zipCode'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'zipCode',
      type: 'text',
    },
    {
      name: 'geolocation',
      type: 'text',
    },
    {
      name: 'markets',
      type: 'join',
      collection: 'markets',
      on: 'venue',
    },
  ],
}
