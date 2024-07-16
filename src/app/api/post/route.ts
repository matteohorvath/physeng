import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { createServerClient } from '@/utils/supabase'
import { Post, PostType } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'

export async function GET(): Promise<NextResponse<Post[]>> {
  const posts = await prisma.post.findMany({
    include: { subject: true },
    orderBy: { subject: { semester: 'desc' } },
  })

  return NextResponse.json(posts)
}
export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { userId } = auth()

  const { title, content, subjectId, type } = await request.json()
  if (userId) {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        subject: { connect: { id: parseInt(subjectId) } },
        type: type as PostType,
        authorId: userId,
      },
    })
    return NextResponse.json({ post })
  } else return NextResponse.json({ message: 'You are not logged in' })
}
