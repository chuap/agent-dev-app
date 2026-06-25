import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 5

    const orders = await prisma.orders.findMany({
      take: limit,
      orderBy: { date: "desc" },
      include: {
        customers: { select: { name: true } },
        _count: { select: { order_items: true } },
      },
    })

    const items = orders.map((o) => ({
      id: o.id,
      customerName: o.customers?.name || "—",
      totalAmount: Number(o.total_amount || 0),
      status: o.status || "unknown",
      items: o._count.order_items,
      date: o.date?.toISOString() || "",
    }))

    return NextResponse.json({ orders: items, total: orders.length })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}
