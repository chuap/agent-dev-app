"use client"

import { useEffect, useState, useCallback } from "react"
import type { AdminStats, RevenuePoint, AdminOrderItem, Period } from "@/types/admin"
import { KpiCard, KpiCardSkeleton } from "@/components/admin/kpi-card"
import { RevenueChart } from "@/components/admin/revenue-chart"
import { PeriodSelector } from "@/components/admin/period-selector"
import { RecentOrdersTable } from "@/components/admin/recent-orders-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "motion/react"

const iconClasses = "h-5 w-5"

export default function DashboardClient() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)

  const [revenue, setRevenue] = useState<RevenuePoint[]>([])
  const [revenueLoading, setRevenueLoading] = useState(true)

  const [period, setPeriod] = useState<Period>("30d")

  const [orders, setOrders] = useState<AdminOrderItem[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  const fetchStatsData = useCallback(async (): Promise<AdminStats> => {
    const res = await fetch("/api/admin/stats")
    if (!res.ok) throw new Error("Failed to fetch stats")
    return res.json()
  }, [])

  const fetchRevenueData = useCallback(async (p: Period): Promise<RevenuePoint[]> => {
    const res = await fetch(`/api/admin/revenue?period=${p}`)
    if (!res.ok) throw new Error("Failed to fetch revenue")
    return res.json()
  }, [])

  const fetchOrdersData = useCallback(async (): Promise<AdminOrderItem[]> => {
    const res = await fetch("/api/admin/orders?limit=5")
    if (!res.ok) throw new Error("Failed to fetch orders")
    const data: { orders: AdminOrderItem[] } = await res.json()
    return data.orders
  }, [])

  useEffect(() => {
    fetchStatsData()
      .then(data => { setStats(data); setStatsError(null) })
      .catch(() => setStatsError("โหลดข้อมูลสถิติไม่สำเร็จ"))
      .finally(() => setStatsLoading(false))

    fetchOrdersData()
      .then(setOrders) 
      .catch(() => {})
      .finally(() => setOrdersLoading(false))

    const interval = setInterval(() => {
      fetchStatsData()
        .then(data => { setStats(data); setStatsError(null) })
        .catch(() => setStatsError("โหลดข้อมูลสถิติไม่สำเร็จ"))
      fetchOrdersData()
        .then(setOrders)
        .catch(() => {})
    }, 30_000)
    return () => clearInterval(interval)
  }, [fetchStatsData, fetchOrdersData])

  useEffect(() => {
    fetchRevenueData(period)
      .then(setRevenue)
      .catch(() => {})
      .finally(() => setRevenueLoading(false))
  }, [period, fetchRevenueData])

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-heading text-3xl font-bold tracking-tight text-foreground"
          >
            ภาพรวมระบบ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-1 text-sm text-muted-foreground"
          >
            สวัสดีผู้ดูแลระบบ · ข้อมูลอัปเดตทุก 30 วินาที
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <PeriodSelector value={period} onChange={setPeriod} />
        </motion.div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statsLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <KpiCardSkeleton key={i} />
            ))}
          </>
        ) : statsError ? (
          <div className="col-span-full flex items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-sm text-destructive">
            <span>{statsError}</span>
            <button
              type="button"
              onClick={() => fetchStatsData().then(data => { setStats(data); setStatsError(null) }).catch(() => setStatsError("โหลดข้อมูลสถิติไม่สำเร็จ"))}
              className="ml-3 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
            >
              ลองใหม่
            </button>
          </div>
        ) : stats ? (
          <>
            <KpiCard
              label="ยอดขายวันนี้"
              value={stats.todaySales}
              icon={
                <svg className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              }
            />
            <KpiCard
              label="ออเดอร์วันนี้"
              value={stats.todayOrders}
              icon={
                <svg className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              }
            />
            <KpiCard
              label="รอดำเนินการ"
              value={stats.pendingOrders}
              icon={
                <svg className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
            />
            <KpiCard
              label="สินค้าทั้งหมด"
              value={stats.totalProducts}
              icon={
                <svg className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              }
            />
            <KpiCard
              label="ผู้ใช้ทั้งหมด"
              value={stats.totalUsers}
              icon={
                <svg className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
            />
          </>
        ) : null}
      </div>

      {/* Charts + Orders */}
      <div className="grid gap-6 lg:grid-cols-3">
        <RevenueChart data={revenue} isLoading={revenueLoading} />

        <Card className="overflow-hidden border-0 bg-card shadow-lg ring-1 ring-border/50">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              ออเดอร์ล่าสุด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentOrdersTable orders={orders} isLoading={ordersLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
