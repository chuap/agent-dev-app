"use client"

import type { AdminOrderItem } from "@/types/admin"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type RecentOrdersTableProps = {
  orders: AdminOrderItem[]
  isLoading: boolean
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "ghost" }> = {
  delivered: { label: "จัดส่งแล้ว", variant: "default" },
  received: { label: "ได้รับแล้ว", variant: "secondary" },
  processing: { label: "กำลังดำเนินการ", variant: "destructive" },
}

export function RecentOrdersTable({ orders, isLoading }: RecentOrdersTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              <div className="h-3 w-20 animate-pulse rounded bg-muted" />
            </div>
            <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
          </div>
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
        ไม่มีคำสั่งซื้อล่าสุด
      </div>
    )
  }

  return (
    <div className="divide-y divide-border/50">
      {orders.map((order) => {
        const config = statusConfig[order.status] || { label: order.status, variant: "outline" as const }
        return (
          <div
            key={order.id}
            className="flex items-center justify-between px-2 py-3.5 transition-colors hover:bg-muted/30"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">
                {order.customerName}
              </span>
              <span className="text-xs text-muted-foreground">
                {order.items} รายการ ·{" "}
                {new Date(order.date).toLocaleDateString("th-TH", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-foreground">
                {new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                }).format(order.totalAmount)}
              </span>
              <Badge variant={config.variant} className={cn("text-[10px]")}>
                {config.label}
              </Badge>
            </div>
          </div>
        )
      })}
    </div>
  )
}
