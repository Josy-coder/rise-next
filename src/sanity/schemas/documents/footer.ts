import { defineType, defineField } from 'sanity'

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
      name: 'columns',
      title: 'Footer Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Column Title', type: 'string' },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'href', title: 'Link', type: 'string' },
                    { name: 'isExternal', title: 'External Link?', type: 'boolean' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
    }),
  ],
})