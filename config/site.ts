export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'WeeklyZen | 周周冥想',
  description:
    '周周冥想希望你每周留出一两次安静练习，让注意力回到呼吸、身体与当下。',
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
    docs: 'https://zen.01mvp.com',
  },
}
