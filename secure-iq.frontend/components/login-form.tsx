'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { redirect } from "next/navigation"

 export async function loginUser(formData: FormData) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_UR}/api/v1/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    if (!response.ok) {
        return "Login failed";
    }
    redirect("/dashboard/posts", "replace");
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [error, setError] = useState<string | null>(null);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          {error && (
            <CardDescription className="text-red-500">
              {error}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <form action={async (formData) => {
            const result = await loginUser(formData);
            if (result === "Login failed") {
              setError("Login failed");
            }
          }}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
