import { groq } from 'next-sanity'

// Site Settings
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  description,
  keywords,
  "logo": logo.asset->url,
  "favicon": favicon.asset->url,
  "ogImage": ogImage.asset->url,
  contactEmail,
  socialLinks,
  googleAnalyticsId
}`

// Navigation
export const navigationQuery = groq`*[_type == "navigation"][0]{
  navItems[]{
    label,
    href,
    isExternal,
    subItems[]
  }
}`

// Footer
export const footerQuery = groq`*[_type == "footer"][0]{
  description,
  columns[]{
    title,
    links[]
  },
  copyrightText
}`

// Home Page
export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroTitle,
  heroSubtitle,
  "heroImage": heroImage.asset->url,
  heroCTA,
  aboutTitle,
  aboutDescription,
  "aboutImage": aboutImage.asset->url,
  mission,
  vision,
  "featuredActivities": featuredActivities[]->{ 
    _id,
    title,
    description,
    "mainImage": images[0].asset->url,
    date,
    location
  },
  testimonialsTitle,
  "featuredTestimonials": featuredTestimonials[]->{
    name,
    role,
    testimonial,
    "photo": photo.asset->url,
    rating
  },
  statistics,
  seo
}`

// About Page
export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  title,
  introduction,
  mission,
  vision,
  values,
  story,
  "storyImage": storyImage.asset->url,
  teamSectionTitle,
  teamDescription,
  seo
}`

// Team Members
export const teamMembersQuery = groq`*[_type == "teamMember"] | order(order asc){
  _id,
  name,
  slug,
  position,
  bio,
  "photo": photo.asset->url,
  email,
  phone,
  socialLinks,
  isFounder,
  "committees": committees[]->{ name, slug }
}`

// Committees
export const committeesQuery = groq`*[_type == "committee"] | order(order asc){
  _id,
  name,
  slug,
  description,
  responsibilities,
  "members": members[]->{
    name,
    position,
    "photo": photo.asset->url
  }
}`

// Cohorts
export const cohortsQuery = groq`*[_type == "cohort"] | order(year desc){
  _id,
  name,
  slug,
  year,
  intake,
  description,
  "images": images[]{
    "url": asset->url,
    alt,
    caption
  },
  numberOfMentees,
  successStories,
  startDate,
  endDate,
  isActive
}`

// Opportunities
export const opportunitiesQuery = groq`*[_type == "opportunity" && isActive == true] | order(publishedAt desc){
  _id,
  title,
  slug,
  type,
  excerpt,
  location,
  employmentType,
  applicationDeadline,
  publishedAt
}`

export const opportunityBySlugQuery = groq`*[_type == "opportunity" && slug.current == $slug][0]{
  title,
  slug,
  type,
  excerpt,
  description,
  requirements,
  responsibilities,
  location,
  employmentType,
  applicationDeadline,
  applicationFormUrl,
  publishedAt,
  seo
}`

// News
export const newsQuery = groq`*[_type == "news"] | order(publishedAt desc){
  _id,
  title,
  slug,
  category,
  excerpt,
  "featuredImage": featuredImage.asset->url,
  "featuredImageAlt": featuredImage.alt,
  publishedAt,
  "author": author->{name, "photo": photo.asset->url},
  tags
}`

export const newsBySlugQuery = groq`*[_type == "news" && slug.current == $slug][0]{
  title,
  slug,
  category,
  excerpt,
  "featuredImage": featuredImage.asset->url,
  "featuredImageAlt": featuredImage.alt,
  content,
  publishedAt,
  "author": author->{
    name,
    position,
    "photo": photo.asset->url
  },
  tags,
  externalLink,
  seo
}`

// Testimonials
export const testimonialsQuery = groq`*[_type == "testimony"]{
  _id,
  name,
  role,
  testimonial,
  "photo": photo.asset->url,
  rating,
  featured,
  "cohort": cohort->{name, year}
}`