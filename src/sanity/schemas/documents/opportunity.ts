import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'opportunity',
  title: 'Opportunities',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Opportunity Type',
      type: 'string',
      options: {
        list: [
          { title: 'Career', value: 'career' },
          { title: 'Volunteering', value: 'volunteering' },
          { title: 'Cohort Application', value: 'cohort' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          'Full-time',
          'Part-time',
          'Contract',
          'Volunteer',
          'Remote',
        ],
      },
    }),
    defineField({
      name: 'applicationDeadline',
      title: 'Application Deadline',
      type: 'datetime',
    }),
    defineField({
      name: 'applicationFormUrl',
      title: 'Application Form URL',
      type: 'url',
      description: 'Link to Google Form or external application',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
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
  preview: {
    select: {
      title: 'title',
      type: 'type',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, type, isActive } = selection
      return {
        title: title,
        subtitle: `${type} ${isActive ? '(Active)' : '(Inactive)'}`,
      }
    },
  },
})