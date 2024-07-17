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
import { z, ZodError } from 'zod'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  title: z
    .string()
    .max(128, { message: 'Title is too long' })
    .min(5, { message: 'Title is too short' }),
  content: z
    .string()
    .max(1204, { message: 'Content is too long' })
    .min(5, { message: 'Content is too short' }),
  subjectId: z.string({ message: 'Subject is required' }),
  type: z.nativeEnum(PostType, { message: 'Type is required' }),
})

export function SendCreate({
  setRefresh,
  setOpen,
}: {
  setRefresh: Dispatch<SetStateAction<boolean>>
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [semesters, setSemesters] = useState<number[]>([])

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
  function listOfSemesters(subjects: Subject[]) {
    const semesters = subjects.map((subject) => subject.semester)
    //make array ascending
    const uniqueSemesters = Array.from(new Set(semesters)).sort((a, b) => a - b)
    return uniqueSemesters
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        title: values.title,
        content: values.content,
        subjectId: values.subjectId,
        type: values.type,
      }),
    })
    if (!response.ok) {
      const error = await response.json()
      const zodError = ZodError.create(error)
      console.log(zodError)
      return
    }
    form.reset()
    setRefresh((prev) => !prev)
    setOpen(false)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      subjectId: undefined,
      type: undefined,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormDescription>
                The title of the post should be descriptive.
              </FormDescription>
              <FormControl>
                <Input placeholder="Title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormDescription>
                Link of content. (eg. Google Drive, Mega, Article etc.)
              </FormDescription>
              <FormControl>
                <Input placeholder="Link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subjectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(e) => {
                    field.onChange(e)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {semesters.map((semester) => {
                        return (
                          <>
                            <SelectLabel key={semester}>
                              Semester {semester}
                            </SelectLabel>
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
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(e) => {
                    field.onChange(e)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {(
                        Object.keys(PostType) as Array<keyof typeof PostType>
                      ).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.toLowerCase()[0].toUpperCase() +
                            type
                              .toLowerCase()
                              .substring(1, type.length)
                              .replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
