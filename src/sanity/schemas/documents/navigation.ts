import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Main Navigation',
      readOnly: true,
    }),
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() },
            { name: 'href', title: 'Link', type: 'string', validation: Rule => Rule.required() },
            { 
              name: 'isExternal', 
              title: 'External Link?', 
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'subItems',
              title: 'Sub Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'href', title: 'Link', type: 'string' },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        },
      ],
    }),
  ],
})