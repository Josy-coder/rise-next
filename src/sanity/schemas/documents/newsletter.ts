import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'newsletter',
  title: 'Newsletter Subscribers',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'isActive',
      title: 'Active Subscription',
      type: 'boolean',
      initialValue: true,
      description: 'Set to false if user unsubscribes',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Where the subscription came from (e.g., footer, modal)',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Tags for segmentation',
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'subscribedAt',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : '',
      }
    },
  },
})
