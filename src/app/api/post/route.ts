import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { createServerClient } from '@/utils/supabase'
import { Post } from '@prisma/client'

export async function GET(): Promise<NextResponse<Post[]>> {
  const posts = await prisma.post.findMany()
  return NextResponse.json(posts)
}
export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { title, content } = await request.json()
  if (user) {
    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    })
    return NextResponse.json({ post })
  } else return NextResponse.json({ message: 'You are not logged in' })
}
