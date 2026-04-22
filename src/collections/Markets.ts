import type { CollectionConfig } from 'payload'

export const Markets: CollectionConfig = {
  slug: 'markets',
  admin: {
    useAsTitle: 'startDate',
    defaultColumns: ['startDate', 'endDate', 'allDay', 'venue'],
  },
  fields: [
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'allDay',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'defaultCommission',
      type: 'number',
      admin: {
        step: 0.01,
      },
    },
    {
      name: 'displayPrices',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'venue',
      type: 'relationship',
      relationTo: 'venues',
    },
  ],
}
