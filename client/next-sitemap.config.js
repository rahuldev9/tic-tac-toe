/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://tic-tac-toe-theta-six-56.vercel.app",
  generateRobotsTxt: true,

  additionalPaths: async () => {
    return [
      {
        loc: "/",
        changefreq: "daily",
        priority: 1.0,
      },
      { loc: "/start", changefreq: "daily", priority: 0.8 },
    ];
  },
};
