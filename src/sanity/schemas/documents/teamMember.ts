import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
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
      name: 'position',
      title: 'Position/Role',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'isFounder',
      title: 'Is Founder',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'committees',
      title: 'Committee Memberships',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'committee' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'photo',
    },
  },
})