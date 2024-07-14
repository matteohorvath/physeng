'use client'
import { Dispatch, SetStateAction, useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
export function SendCreate({
  setRefresh,
}: {
  setRefresh: Dispatch<SetStateAction<boolean>>
}) {
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLInputElement>(null)
  async function sendCreate() {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        title: titleRef.current?.value,
        content: contentRef.current?.value,
      }),
    })
    if (response.ok) {
      if (titleRef.current) {
        titleRef.current.value = ''
      }
      if (contentRef.current) {
        contentRef.current.value = ''
      }
    }
    setRefresh((prev) => !prev)
  }
  return (
    <div>
      <Input placeholder="Title" name="title" ref={titleRef} />
      <Input placeholder="Content" name="content" ref={contentRef} />
      <Button onClick={sendCreate}>Create</Button>
    </div>
  )
}
