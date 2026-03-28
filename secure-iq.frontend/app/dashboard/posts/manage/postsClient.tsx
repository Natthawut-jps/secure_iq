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
import { redirect } from "next/navigation"
import { useState } from "react"

export interface Post {
    id: number;
    title: string;
    content: string;
    tag: string;
    created_at: string;
    updated_at: string;
}

export default function PostsClient({ dataProp }: { dataProp: Post }) {

    const [data, setData] = useState(dataProp)

    async function handleUpdatePost(formData: FormData) {
        if (!dataProp.id) return
        formData.append("id", dataProp.id.toString())

        const postData = Object.fromEntries(formData)
        const response = await fetch(`/api/post`, {
            method: "PUT",
            body: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) {
            throw new Error("Failed to update post")
        }
        redirect("/dashboard/posts", "replace")
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
                    <form id="form-rhf-demo" className="w-full" action={handleUpdatePost}>
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
                                    value={data ? data.title : dataProp.title}
                                    onChange={(e) => {
                                        setData({ ...data, title: e.target.value })
                                    }}
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
                                    value={data ? data.tag : dataProp.tag}
                                    onChange={(e) => {
                                        setData({ ...data, tag: e.target.value })
                                    }}
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
                                        value={data ? data.content : dataProp.content}
                                        onChange={(e) => {
                                            setData({ ...data, content: e.target.value })
                                        }}
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