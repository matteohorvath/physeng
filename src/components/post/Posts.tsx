'use client'

import { Post } from '@prisma/client'
import { useEffect, useState } from 'react'
import { SendCreate } from '../SendCreate'

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    fetch('/api/post')
      .then((res) => res.json())
      .then((data) => setPosts(data))
  }, [refresh])
  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {posts.map((post) => {
          return (
            <div className=" rounded-md border-2 text-center" key={post.id}>
              <h2 className="text-2xl">{post.title}</h2>
              <p>
                <iframe
                  src={post.content + '/preview'}
                  width="640"
                  height="480"
                  allow="autoplay"
                ></iframe>
              </p>
              <a
                href={
                  'https://drive.usercontent.google.com/u/0/uc?id=' +
                  (post.content ? post.content?.split('/').pop() : '') +
                  '&export=download'
                }
                target="_blank"
              >
                Download
              </a>
              {}
            </div>
          )
        })}
      </div>
      <SendCreate setRefresh={setRefresh} />
    </>
  )
}
