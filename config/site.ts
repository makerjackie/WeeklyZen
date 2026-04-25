export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Zen',
  title: 'Zen - 简单冥想',
  description: '一个简单、安静的冥想网站，帮你把注意力回到呼吸、身体和当下。',
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
    docs: 'https://zen.01mvp.com',
  },
}
