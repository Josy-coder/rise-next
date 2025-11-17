import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimony',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      description: 'e.g., Mentee 2024, Volunteer, Partner',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5),
      description: 'Rating out of 5',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Show on home page',
    }),
    defineField({
      name: 'cohort',
      title: 'Associated Cohort',
      type: 'reference',
      to: [{ type: 'cohort' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})