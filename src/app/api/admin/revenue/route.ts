import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const period = request.nextUrl.searchParams.get("period") || "30d"
    const days = period === "7d" ? 7 : period === "90d" ? 90 : 30

    const since = new Date()
    since.setDate(since.getDate() - days)
    since.setHours(0, 0, 0, 0)

    const orders = await prisma.orders.findMany({
      where: { date: { gte: since } },
      select: { date: true, total_amount: true },
      orderBy: { date: "asc" },
    })

    const map = new Map<string, { revenue: number; orders: number }>()

    for (const o of orders) {
      if (!o.date) continue
      const key = o.date.toLocaleDateString("th-TH", {
        day: "2-digit",
        month: "2-digit",
      })
      const entry = map.get(key) || { revenue: 0, orders: 0 }
      entry.revenue += Number(o.total_amount || 0)
      entry.orders += 1
      map.set(key, entry)
    }

    const revenue = Array.from(map.entries()).map(([date, data]) => ({
      date,
      ...data,
    }))

    return NextResponse.json(revenue)
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch revenue" },
      { status: 500 }
    )
  }
}
