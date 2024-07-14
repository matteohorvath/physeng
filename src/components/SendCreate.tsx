'use client'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Subject } from '@prisma/client'

export function SendCreate({
  setRefresh,
}: {
  setRefresh: Dispatch<SetStateAction<boolean>>
}) {
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLInputElement>(null)
  const [subjectId, setSubjectId] = useState<string | null>(null)
  const [subjects, setSubjects] = useState<Subject[]>([])
  useEffect(() => {
    getSubjects()
  }, [])
  async function getSubjects() {
    const response = await fetch('/api/subject')
    if (response.ok) {
      const subjects: Subject[] = await response.json()
      setSubjects(subjects)
    }
  }
  async function sendCreate() {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        title: titleRef.current?.value,
        content: contentRef.current?.value,
        subjectId: subjectId,
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

      <Select onValueChange={setSubjectId}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Semester 1</SelectLabel>
            {
              //todo: add dynamic data
            }
            {subjects.map((subject) => {
              return (
                <SelectItem key={subject.id} value={subject.id.toString()}>
                  {subject.name}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={sendCreate}>Create</Button>
    </div>
  )
}
