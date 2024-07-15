'use client'

import type { Prisma } from '@prisma/client'
import { useEffect, useState } from 'react'
import { SendCreate } from '../SendCreate'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { DialogHeader } from '../ui/dialog'
import Link from 'next/link'

type PostWithSubject = Prisma.PostGetPayload<{
  include: { subject: true }
}>

export function Posts() {
  const [posts, setPosts] = useState<PostWithSubject[]>([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    fetch('/api/post')
      .then((res) => res.json())
      .then((data) => setPosts(data))
  }, [refresh])
  return (
    <div className=" w-full max-w-4xl   ">
      <div className="right-0  flex  items-center justify-items-end border-b-4 border-gray-700 pb-2">
        <div className=" text- h-max grow-0 text-2xl">Posts</div>
        <div className="grow"></div>
        <div className="grow-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Create Post</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Post</DialogTitle>
                <DialogDescription>
                  Make changes to BLABLALBALBALB
                </DialogDescription>
              </DialogHeader>

              <SendCreate setRefresh={setRefresh} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className=" flex flex-col gap-2 pt-2">
        {posts.map((post) => {
          return <Post post={post} key={post.id} />
        })}
      </div>
    </div>
  )
}

function Post({ post }: { post: PostWithSubject }) {
  return (
    <div
      className="  flex items-center  rounded-md  border-b-2 border-gray-400 pb-2"
      key={post.id}
    >
      <h2 className="grow-0">
        {post.subject.name} - {post.subject.code} - {post.type} - {post.title}
      </h2>
      <div className="grow"></div>
      <Link href={post.content} target="_blank">
        <Button className="grow-0">Go To File </Button>
      </Link>
    </div>
  )
}
