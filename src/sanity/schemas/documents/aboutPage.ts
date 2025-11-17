import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Us',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Value Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'icon', title: 'Icon Name', type: 'string', description: 'React Icons name' },
          ],
        },
      ],
    }),
    defineField({
      name: 'story',
      title: 'Our Story',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'storyImage',
      title: 'Story Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'teamSectionTitle',
      title: 'Team Section Title',
      type: 'string',
      initialValue: 'Meet Our Team',
    }),
    defineField({
      name: 'teamDescription',
      title: 'Team Description',
      type: 'text',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text' },
      ],
    }),
  ],
})