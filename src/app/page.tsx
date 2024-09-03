import { ModeToggle } from '@/components/ModeToggle'

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
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default async function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-10">
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="mx-4 flex w-full max-w-4xl items-center justify-between text-sm lg:mx-0">
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

          <SignedIn>
            <UserButton userProfileMode="modal" />
          </SignedIn>
        </div>
      </nav>

      <SignedIn>
        <Posts />
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <h1 className="text-3xl">Welcome to Physeng</h1>
            <p className="text-lg">
              Physeng is a platform for sharing documents, exams, and tests
              throughout the Physicist-Engineer course of BME.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
            or
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
      <footer className="w-full justify-center p-8 text-center text-xs">
        <div>
          If you have any questions or feedback, feel free to reach out to{' '}
          <Link
            href="https://physeng.canny.io/"
            target="_blank"
            className="  text-red-500 underline"
          >
            us
          </Link>
        </div>

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
          <ModeToggle />
        </div>
      </footer>
    </div>
  )
}
