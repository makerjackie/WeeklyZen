'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { MobileNav } from '@/components/mobile-nav'
import { SiteHeader } from '@/components/site-header'

interface LayoutShellProps {
  children: ReactNode
}

export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname()
  const hideGlobalChrome = pathname.startsWith('/meditation')

  return (
    <div className="relative flex min-h-screen flex-col">
      {!hideGlobalChrome && <SiteHeader />}
      <div
        className={hideGlobalChrome ? 'flex-1' : 'has-mobile-nav flex-1 pt-16'}
      >
        {children}
      </div>
      {!hideGlobalChrome && <MobileNav />}
    </div>
  )
}
