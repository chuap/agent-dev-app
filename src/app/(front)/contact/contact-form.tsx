"use client"

import { useTransition } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { CheckCircle } from "lucide-react"

import { contactSchema, type ContactFormValues } from "@/lib/validations/contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field"

type Props = {
  onSuccess: () => void
}

export function ContactForm({ onSuccess }: Props) {
  const [isPending, startTransition] = useTransition()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  function onSubmit(data: ContactFormValues) {
    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        const json = await res.json()

        if (!json.success) {
          toast.error(json.error || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
          return
        }

        reset()
        onSuccess()
      } catch {
        toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Field orientation="vertical">
            <FieldLabel>ชื่อ</FieldLabel>
            <FieldContent>
              <Input placeholder="กรอกชื่อของคุณ" {...field} />
              <FieldError errors={errors.name ? [{ message: errors.name.message }] : []} />
            </FieldContent>
          </Field>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Field orientation="vertical">
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <Input type="email" placeholder="example@email.com" {...field} />
              <FieldError errors={errors.email ? [{ message: errors.email.message }] : []} />
            </FieldContent>
          </Field>
        )}
      />

      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <Field orientation="vertical">
            <FieldLabel>ข้อความ</FieldLabel>
            <FieldContent>
              <Textarea rows={5} placeholder="พิมพ์ข้อความที่ต้องการ..." {...field} />
              <FieldError errors={errors.message ? [{ message: errors.message.message }] : []} />
            </FieldContent>
          </Field>
        )}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "กำลังส่ง..." : "ส่งข้อความ"}
      </Button>
    </form>
  )
}

export function ContactSuccess({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <CheckCircle className="size-12 text-primary" />
      <h3 className="text-xl font-medium">ส่งข้อความสำเร็จ!</h3>
      <p className="text-muted-foreground">
        ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด
      </p>
      <Button variant="outline" onClick={onReset}>
        ส่งข้อความอีกครั้ง
      </Button>
    </div>
  )
}
