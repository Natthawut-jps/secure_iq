"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { useEffect, useState } from "react"
import { redirect, useSearchParams } from "next/navigation"
import { getToken } from "@/lib/token"

export default function NewForm() {
  const searchParams = useSearchParams()
  const postId = searchParams.get("id")
  const [data, setData] = useState({
    title: "",
    tag: "",
    content: "",
  })

  useEffect(() => {
    if (!postId) return
      ; (async () => {
        const token = await getToken()
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        const data = await response.json()
        setData(data)
      })()
  }, [postId])

  async function updatePost(formData: FormData) {
    const token = await getToken()

    if (!postId) return
    formData.append("id", postId)

    const data = Object.fromEntries(formData)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.ok) {
      redirect("/dashboard/posts", "replace")
    }
  }
  return (
    <div className="w-full min-h-screen flex justify-center items-start p-4">
      <Card className="w-full max-w-full">
        <CardHeader>
          <CardTitle>Bug Report</CardTitle>
          <CardDescription>
            Help us improve by reporting bugs you encounter.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <form id="form-rhf-demo" className="w-full" action={updatePost}>
            <FieldGroup className="w-full">
              <Field>
                <FieldLabel htmlFor="form-rhf-demo-title">
                  Title
                </FieldLabel>
                <Input
                  id="form-rhf-demo-title"
                  aria-invalid={false}
                  placeholder="type title"
                  autoComplete="off"
                  name="title"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
                {false && (
                  <FieldError errors={[{ message: "Required" }]} />
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="form-rhf-demo-title">
                  Tag
                </FieldLabel>
                <Input
                  id="form-rhf-demo-title"
                  aria-invalid={false}
                  placeholder="type tag"
                  autoComplete="off"
                  name="tag"
                  value={data.tag}
                  onChange={(e) => setData({ ...data, tag: e.target.value })}
                />
                {false && (
                  <FieldError errors={[{ message: "Required" }]} />
                )}
              </Field>
              <Field data-invalid={false}>
                <FieldLabel htmlFor="form-rhf-demo-description">
                  Description
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id="form-rhf-demo-description"
                    placeholder="I'm having an issue with the login button on mobile."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={false}
                    name="content"
                    value={data.content}
                    onChange={(e) => setData({ ...data, content: e.target.value })}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      0/100 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Include steps to reproduce, expected behavior, and what
                  actually happened.
                </FieldDescription>
                {false && (
                  <FieldError errors={[{ message: "Required" }]} />
                )}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="w-full">
          <Field orientation="horizontal">
            <Button type="submit" form="form-rhf-demo">
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}