import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroCTA',
      title: 'Hero Call to Action',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Button Link', type: 'string' },
      ],
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
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    
    // Mission & Vision
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
      rows: 3,
    }),
    
    // Featured Activities
    defineField({
      name: 'featuredActivities',
      title: 'Featured Activities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'activity' }] }],
      validation: Rule => Rule.max(6),
    }),
    
    // Testimonials
    defineField({
      name: 'testimonialsTitle',
      title: 'Testimonials Section Title',
      type: 'string',
    }),
    defineField({
      name: 'featuredTestimonials',
      title: 'Featured Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimony' }] }],
      validation: Rule => Rule.max(3),
    }),
    
    // Statistics
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Number', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
        { name: 'ogImage', title: 'Social Share Image', type: 'image' },
      ],
    }),
  ],
})