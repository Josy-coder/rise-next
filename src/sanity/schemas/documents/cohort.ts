import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cohort',
  title: 'Cohorts',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Cohort Name',
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
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'intake',
      title: 'Intake',
      type: 'string',
      description: 'e.g., May 2024, September 2024',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'images',
      title: 'Cohort Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'numberOfMentees',
      title: 'Number of Mentees',
      type: 'number',
    }),
    defineField({
      name: 'successStories',
      title: 'Success Stories',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      year: 'year',
      intake: 'intake',
    },
    prepare(selection) {
      const { title, year, intake } = selection
      return {
        title: title,
        subtitle: `${year} - ${intake || 'N/A'}`,
      }
    },
  },
})