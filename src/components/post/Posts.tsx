'use client'

import type { Prisma } from '@prisma/client'
import { Suspense, useEffect, useState } from 'react'
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
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/post')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .then(() => setLoading(false))
  }, [refresh])
  return (
    <div className=" w-full max-w-4xl  ">
      <div className="right-0  mx-4 flex items-center justify-items-end border-b-4 border-gray-700 pb-2  lg:mx-0">
        <div className="h-max grow-0 text-2xl">Posts</div>
        <div className="grow"></div>
        <div className="grow-0">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Create Post</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Post</DialogTitle>
                <DialogDescription>
                  Please fill in the details to create a post
                </DialogDescription>
              </DialogHeader>

              <SendCreate setRefresh={setRefresh} setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className=" mx-4 flex flex-col gap-2 pt-2 lg:mx-0">
        {loading ? (
          <PostLoadingSceleton />
        ) : (
          posts.map((post) => {
            return <Post post={post} key={post.id} />
          })
        )}
      </div>
    </div>
  )
}

function Post({ post }: { post: PostWithSubject }) {
  return (
    <div
      className="  flex items-center  gap-2 rounded-md border-b-2 border-gray-400 pb-2"
      key={post.id}
    >
      <h2 className="grow-0 text-sm lg:text-base">
        {post.subject.name} - {post.subject.code} - {post.type} - {post.title}
      </h2>
      <div className="grow"></div>
      <Link href={post.content} target="_blank">
        <Button className="grow-0">Go To File </Button>
      </Link>
    </div>
  )
}

function PostLoadingSceleton() {
  return (
    <div className="flex animate-pulse flex-col gap-2">
      {
        //display 5 loading sceletons
      }
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center rounded-md border-b-2 border-gray-400 pb-2"
        >
          <div className="h-8 w-1/4 rounded-md bg-gray-400"></div>
          <div className="grow"></div>
          <div className=" h-8 w-1/12 rounded-md bg-gray-400"></div>
        </div>
      ))}
    </div>
  )
}
