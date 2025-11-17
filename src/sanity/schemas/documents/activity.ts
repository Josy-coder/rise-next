import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'activity',
  title: 'Activities',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Activity Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),
    defineField({
      name: 'date',
      title: 'Activity Date',
      type: 'date',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'participants',
      title: 'Number of Participants',
      type: 'number',
    }),
    defineField({
      name: 'impact',
      title: 'Impact/Results',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})