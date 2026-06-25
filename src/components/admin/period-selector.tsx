"use client"

import type { Period } from "@/types/admin"
import { cn } from "@/lib/utils"

type PeriodSelectorProps = {
  value: Period
  onChange: (period: Period) => void
}

const periods: { value: Period; label: string }[] = [
  { value: "7d", label: "7 วัน" },
  { value: "30d", label: "30 วัน" },
  { value: "90d", label: "90 วัน" },
]

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-border/50 bg-muted/50 p-1 shadow-sm">
      {periods.map((p) => (
        <button
          key={p.value}
          type="button"
          onClick={() => onChange(p.value)}
          className={cn(
            "rounded-lg px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200",
            value === p.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}
