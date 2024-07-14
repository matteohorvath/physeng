import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { createServerClient } from '@/utils/supabase'
import { Subject } from '@prisma/client'

export async function GET(): Promise<NextResponse<Subject[]>> {
  const subjects = await prisma.subject.findMany()
  return NextResponse.json(subjects)
}
export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { name, code, semester } = await request.json()
  if (user) {
    const post = await prisma.subject.create({
      data: { name, code, semester },
    })
    return NextResponse.json({ post })
  } else return NextResponse.json({ message: 'You are not logged in' })
}
