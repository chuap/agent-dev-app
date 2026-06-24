import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema, type ApiResponse } from '@/lib/validations/contact'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: result.error.issues.map(i => i.message).join(', ') },
        { status: 400 }
      )
    }

    const { name, email, message } = result.data

    if (resend) {
      await resend.emails.send({
        from: process.env.CONTACT_SENDER_EMAIL || 'onboarding@resend.dev',
        to: process.env.CONTACT_RECEIVER_EMAIL || 'delivered@resend.dev',
        subject: `ติดต่อใหม่จาก ${name}`,
        html: `<p><strong>ชื่อ:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>ข้อความ:</strong></p><p>${message}</p>`,
      })
    }

    if (!process.env.RESEND_API_KEY) {
      console.log('Contact form submission:', { name, email, message })
    }

    return NextResponse.json<ApiResponse<{ ok: true }>>(
      { success: true, data: { ok: true } },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: 'เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง' },
      { status: 500 }
    )
  }
}
