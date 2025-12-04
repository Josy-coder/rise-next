import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Footer Configuration',
      readOnly: true,
    }),
    defineField({
      name: 'description',
      title: 'Footer Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'href', title: 'Link', type: 'string'},
            {name: 'isExternal', title: 'External Link?', type: 'boolean'},
          ],
        },
      ],
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'days', title: 'Days', type: 'string', description: 'e.g., Monday - Friday'},
            {
              name: 'hours',
              title: 'Hours',
              type: 'string',
              description: 'e.g., 09:00 am - 05:00 pm',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {name: 'alt', title: 'Alt Text', type: 'string'},
            {name: 'caption', title: 'Caption', type: 'string'},
          ],
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
    }),
  ],
})
