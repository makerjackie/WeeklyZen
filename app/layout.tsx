import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'

import { LayoutShell } from '@/components/layout-shell'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'
import { AppThemeProvider } from '@/contexts/theme-context'
import { LanguageProvider } from '@/contexts/language-context'
import { UserProvider } from '@/contexts/user-context'
import { MenuProvider } from '@/contexts/menu-context'
import { Toaster } from 'sonner'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // 支持安全区域
}

export const metadata: Metadata = {
  metadataBase: new URL('https://zen.01mvp.com'),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/WZ.ico',
    shortcut: '/WZ.ico',
    apple: '/WZ.ico',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="zh-CN" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/WZ.ico?v=2" />
        </head>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <LanguageProvider>
              <AppThemeProvider>
                <UserProvider>
                  <MenuProvider>
                    <LayoutShell>{children}</LayoutShell>
                    <TailwindIndicator />
                    <Toaster />
                  </MenuProvider>
                </UserProvider>
              </AppThemeProvider>
            </LanguageProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
