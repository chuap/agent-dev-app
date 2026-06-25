import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [todayOrdersResult, pendingOrdersCount, totalProducts, totalUsers] =
      await Promise.all([
        prisma.orders.findMany({
          where: { date: { gte: today } },
          select: { total_amount: true },
        }),
        prisma.orders.count({
          where: { status: "processing" },
        }),
        prisma.products.count(),
        prisma.user.count(),
      ])

    const todayOrders = todayOrdersResult.length
    const todaySales = todayOrdersResult.reduce(
      (sum, o) => sum + Number(o.total_amount || 0),
      0
    )

    return NextResponse.json({
      todaySales,
      todayOrders,
      pendingOrders: pendingOrdersCount,
      totalProducts,
      totalUsers,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    )
  }
}
