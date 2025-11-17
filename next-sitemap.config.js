/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://risenext.org',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/studio', '/studio/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api'],
      },
    ],
  },
}