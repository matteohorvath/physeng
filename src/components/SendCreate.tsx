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
import { PostType, Subject } from '@prisma/client'
import { DialogFooter } from './ui/dialog'

export function SendCreate({
  setRefresh,
}: {
  setRefresh: Dispatch<SetStateAction<boolean>>
}) {
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLInputElement>(null)
  const [subjectId, setSubjectId] = useState<string | null>(null)
  const [type, setType] = useState<PostType>(PostType.EXAM)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [semesters, setSemesters] = useState<number[]>([])

  function listOfSemesters(subjects: Subject[]) {
    const semesters = subjects.map((subject) => subject.semester)
    //make array ascending
    const uniqueSemesters = Array.from(new Set(semesters)).sort((a, b) => a - b)
    return uniqueSemesters
  }

  useEffect(() => {
    async function getSubjects() {
      const response = await fetch('/api/subject')
      if (response.ok) {
        const subjects: Subject[] = await response.json()
        setSubjects(subjects)
        setSemesters(listOfSemesters(subjects))
      }
    }
    getSubjects()
  }, [])
  async function sendCreate() {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        title: titleRef.current?.value,
        content: contentRef.current?.value,
        subjectId: subjectId,
        type: type,
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
    <div className="grid gap-4 ">
      <Input placeholder="Title" name="title" ref={titleRef} />
      <Input placeholder="Drive link" name="content" ref={contentRef} />

      <Select onValueChange={setSubjectId}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {semesters.map((semester) => {
              return (
                <>
                  <SelectLabel key={semester}>Semester {semester}</SelectLabel>
                  {subjects.map((subject) => {
                    if (subject.semester !== semester) {
                      return null
                    }
                    return (
                      <SelectItem
                        key={subject.id}
                        value={subject.id.toString()}
                      >
                        {subject.name}
                      </SelectItem>
                    )
                  })}
                </>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(value: string) => setType(value as PostType)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {(Object.keys(PostType) as Array<keyof typeof PostType>).map(
              (type) => (
                <SelectItem key={type} value={type}>
                  {type.toLowerCase()[0].toUpperCase() +
                    type
                      .toLowerCase()
                      .substring(1, type.length)
                      .replace('_', ' ')}
                </SelectItem>
              ),
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <DialogFooter>
        <Button onClick={sendCreate}>Create</Button>
      </DialogFooter>
    </div>
  )
}
