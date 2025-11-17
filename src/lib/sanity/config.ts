export const revalidationTimes = {
  // Content that changes semi-frequently
  news: 259200, // 3 days
  opportunities: 259200, // 3 days

  // Pages that rarely change
  homePage: 604800, // 1 week (7 days)
  aboutPage: 1209600, // 2 weeks (14 days)
  teamMembers: 1209600, // 2 weeks (14 days)

  // Global settings (rarely change)
  siteSettings: 1209600, // 2 weeks (14 days)
  navigation: 1209600, // 2 weeks (14 days)
  footer: 1209600, // 2 weeks (14 days)
} as const


export const tags = {
  news: 'news',
  opportunity: 'opportunity',
  teamMember: 'team-member',
  homePage: 'home-page',
  aboutPage: 'about-page',
  siteSettings: 'site-settings',
  navigation: 'navigation',
  footer: 'footer',
} as const
