export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'WeeklyZen | 周周冥想',
  description: 'WeeklyZen 是一个小而安静的冥想网站，提供简单、纯粹、可持续的呼吸与正念练习体验。',
  mainNav: [
    {
      title: '首页',
      titleEn: 'Home',
      href: '/',
    },
    {
      title: '开始冥想',
      titleEn: 'Start Meditation',
      href: '/meditation',
    },
    {
      title: '冥想入门',
      titleEn: 'Introduction',
      href: '/introduction',
    },
    {
      title: '关于我们',
      titleEn: 'About Us',
      href: '/about',
    },
  ],
  links: {
    github: 'https://github.com/makerjackie/WeeklyZen',
    docs: 'https://weeklyzen.01mvp.com',
  },
}
