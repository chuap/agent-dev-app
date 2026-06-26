"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

type KpiCardProps = {
  label: string
  value: string | number
  icon: React.ReactNode
  trend?: { value: number; positive: boolean }
}

export function KpiCard({ label, value, icon, trend }: KpiCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const numericValue = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.]/g, ""))

  useEffect(() => {
    if (!numericValue) return
    const duration = 800
    const steps = 20
    const increment = numericValue / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setDisplayValue(numericValue)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.round(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [numericValue])

  const formattedValue = typeof value === "number"
    ? new Intl.NumberFormat("th-TH").format(displayValue)
    : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-muted/50 p-0 shadow-lg ring-1 ring-border/50 transition-all duration-300 hover:shadow-xl hover:ring-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <CardContent className="relative flex items-start justify-between p-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {label}
            </span>
            <span className="font-heading text-3xl font-bold tracking-tight text-foreground">
              {formattedValue}
            </span>
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-medium",
                  trend.positive ? "text-emerald-500" : "text-destructive"
                )}
              >
                <svg
                  className={cn(
                    "h-3 w-3",
                    !trend.positive && "rotate-180"
                  )}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 5v14M5 12l7-7 7 7" />
                </svg>
                {trend.value}%
              </span>
            )}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
            {icon}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function KpiCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3">
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
          <div className="h-8 w-28 animate-pulse rounded bg-muted" />
          <div className="h-3 w-16 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-12 w-12 animate-pulse rounded-xl bg-muted" />
      </div>
    </div>
  )
}
