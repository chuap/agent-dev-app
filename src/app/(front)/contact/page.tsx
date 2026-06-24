"use client"

import { useState, useCallback } from "react"
import { Mail, Phone, Clock } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { ContactForm, ContactSuccess } from "./contact-form"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSuccess = useCallback(() => setSubmitted(true), [])
  const handleReset = useCallback(() => setSubmitted(false), [])

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          ติดต่อเรา
        </h1>
        <p className="mt-2 text-muted-foreground">
          หากมีข้อสงสัยหรือต้องการสอบถามข้อมูลเพิ่มเติม กรุณาติดต่อเราผ่านช่องทางด้านล่าง
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.6fr] md:gap-12">
        <aside className="space-y-5">
          <div className="flex items-center gap-3">
            <Mail className="size-5 text-muted-foreground" />
            <span className="text-muted-foreground">hello@example.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="size-5 text-muted-foreground" />
            <span className="text-muted-foreground">+66 12 345 6789</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="size-5 text-muted-foreground" />
            <span className="text-muted-foreground">จันทร์ - ศุกร์ 09:00 - 18:00 น.</span>
          </div>

          <Separator />

          <p className="text-sm text-muted-foreground leading-relaxed">
            เรายินดีให้คำปรึกษาและตอบทุกคำถามเกี่ยวกับหลักสูตรและสินค้าของเรา
            ทีมงานพร้อมตอบกลับโดยเร็วที่สุดในเวลาทำการ
          </p>
        </aside>

        <section>
          {submitted ? (
            <ContactSuccess onReset={handleReset} />
          ) : (
            <ContactForm onSuccess={handleSuccess} />
          )}
        </section>
      </div>
    </main>
  )
}
