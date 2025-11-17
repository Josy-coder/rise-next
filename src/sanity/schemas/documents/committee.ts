import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'committee',
  title: 'Committees',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Committee Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
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
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'members',
      title: 'Committee Members',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
})