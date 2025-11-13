/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tmxglobalfreightnetwork.com', // <-- change to your actual site URL
  generateRobotsTxt: true,           // generate robots.txt file
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin'] },
    ],
  },
};
