import type { CollectionConfig } from 'payload'

export const Participations: CollectionConfig = {
  slug: 'participations',
  admin: {
    useAsTitle: 'organization',
    defaultColumns: ['organization', 'market', 'status', 'boothLocation', 'paid'],
  },
  fields: [
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      required: true,
    },
    {
      name: 'market',
      type: 'relationship',
      relationTo: 'markets',
      required: true,
    },
    {
      name: 'status',
      type: 'text',
    },
    {
      name: 'boothLocation',
      type: 'text',
    },
    {
      name: 'revenue',
      type: 'number',
      admin: {
        step: 0.01,
      },
    },
    {
      name: 'commissionPct',
      type: 'number',
      admin: {
        step: 0.01,
      },
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { label: 'Carte bancaire', value: 'carte bancaire' },
        { label: 'Virement', value: 'virement' },
        { label: 'Chèque', value: 'cheque' },
        { label: 'Espèce', value: 'espece' },
      ],
    },
    {
      name: 'paid',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'paidAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        condition: (data) => Boolean(data?.paid),
      },
    },
    {
      name: 'displayPrice',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}
