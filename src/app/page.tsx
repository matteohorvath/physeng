import AuthButton from '@/components/AuthButton'
import ThemeToggle from '@/components/ThemeToggle'

import { SendCreate } from '@/components/SendCreate'
import { Post } from '@prisma/client'
import { GET } from '@/app/api/post/route'
import { Posts } from '@/components/post/Posts'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import Image from 'next/image'
import Link from 'next/link'

import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default async function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          <div className="flex items-center ">
            Physeng
            <div>
              <Image
                src="/logo.svg"
                height={16}
                width={32}
                alt="logo"
                className=" -rotate-90"
              />
            </div>
          </div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      <div className="mx-12 max-w-4xl">
        Hi!
        <br /> This page has been created to share books, tests, exams, and
        documents throughout the Physicist-Engineer course. Please refrain from
        uploading inappropriate content, and give the shared files descriptive
        names.
      </div>
      <SignedIn>
        <Posts />
      </SignedIn>
      <footer className="w-full justify-center p-8 text-center text-xs">
        <div>
          Created by{' '}
          <Link
            href="https://www.linkedin.com/in/janos-mozer/"
            className="text-red-400 underline"
            target="_blank"
          >
            Janos
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.linkedin.com/in/matteo-horvath-02273b115/"
            className="text-red-400 underline"
            target="_blank"
          >
            Matteo
          </Link>{' '}
          with ❤️ and ☕x6e23
        </div>
        <div className=" p-8">
          <ThemeToggle />
        </div>
      </footer>
    </div>
  )
}
