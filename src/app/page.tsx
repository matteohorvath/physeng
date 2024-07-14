import AuthButton from '@/components/AuthButton'
import ThemeToggle from '@/components/ThemeToggle'

import { SendCreate } from '@/components/SendCreate'
import { Post } from '@prisma/client'
import { GET } from '@/app/api/post/route'
import { Posts } from '@/components/post/Posts'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
export default async function Index() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          <AuthButton />
        </div>
      </nav>
      {user && <Posts />}
      <footer className="w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
        IM DEV, please
        <ThemeToggle />
      </footer>
    </div>
  )
}
