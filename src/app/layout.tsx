import { GeistSans } from 'geist/font/sans'
import ThemeProvider from '@/providers/ThemeProvider'
import NextTopLoader from 'nextjs-toploader'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import { ClerkProvider } from '@clerk/nextjs'
import dynamic from 'next/dynamic'
import { PHProvider } from './providers'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Physeng - Physicist-Engineer',
  description:
    'The fastest way to get your documents for the Physicist-Engineer course',
}

const PostHogPageView = dynamic(() => import('@/components/PostHogPageView'), {
  ssr: false,
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={GeistSans.className}
        style={{ colorScheme: 'dark' }}
      >
        <PHProvider>
          <body className="bg-background text-foreground">
            <NextTopLoader showSpinner={false} height={2} color="#2acf80" />
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <ReactQueryProvider>
                <main className="flex min-h-screen flex-col items-center">
                  <PostHogPageView />
                  {children}
                  <Analytics />{' '}
                  {/* ^^ remove this if you are not deploying to vercel. See more at https://vercel.com/docs/analytics  */}
                </main>
                <ReactQueryDevtools initialIsOpen={false} />
              </ReactQueryProvider>
            </ThemeProvider>
          </body>
        </PHProvider>
      </html>
    </ClerkProvider>
  )
}
