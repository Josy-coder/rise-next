import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // Hero Carousel Section
    defineField({
      name: 'heroSlides',
      title: 'Hero Carousel Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2},
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'heroCTA',
      title: 'Hero Call to Action',
      type: 'object',
      fields: [
        {name: 'text', title: 'Button Text', type: 'string'},
        {name: 'link', title: 'Button Link', type: 'string'},
      ],
    }),

    // Quote Section
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      description: 'Inspirational quote displayed after hero section',
    }),

    // Video Section
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo URL for video section',
    }),

    // About Section
    defineField({
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // Mission Section
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'missionGoals',
      title: 'Mission Goals',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.max(3),
      description: 'Up to 3 mission goals as bullet points',
    }),

    // Vision
    defineField({
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
      rows: 3,
    }),

    // Why Us Section
    defineField({
      name: 'whyUsTitle',
      title: 'Why Us Section Title',
      type: 'string',
    }),
    defineField({
      name: 'whyUsDescription',
      title: 'Why Us Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'whyUsPoints',
      title: 'Why Us Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Point Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 2},
          ],
        },
      ],
    }),

    // Statistics Section
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'number', title: 'Number', type: 'string', description: 'e.g., 150+'},
            {name: 'label', title: 'Label', type: 'string', description: 'e.g., Team Members'},
            {name: 'description', title: 'Description', type: 'text', rows: 2},
          ],
        },
      ],
      validation: (Rule) => Rule.length(4),
      description: 'Exactly 4 statistics (e.g., Team Members, Students Admitted, etc.)',
    }),

    // Featured Activities
    defineField({
      name: 'featuredActivities',
      title: 'Featured Activities',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'activity'}]}],
      validation: (Rule) => Rule.max(6),
    }),

    // Testimonials Section
    defineField({
      name: 'testimonialsTitle',
      title: 'Testimonials Section Title',
      type: 'string',
    }),
    defineField({
      name: 'testimonialsDescription',
      title: 'Testimonials Section Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'featuredTestimonials',
      title: 'Featured Testimonials',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'testimony'}]}],
      validation: (Rule) => Rule.max(3),
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {name: 'metaTitle', title: 'Meta Title', type: 'string'},
        {name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2},
        {name: 'ogImage', title: 'Social Share Image', type: 'image'},
      ],
    }),
  ],
})
