import Link from "next/link"

export const Logo = () => (
  <Link href="/" className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight no-underline">
    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground shadow-[0_0_10px_rgba(37,99,235,0.3)]">
      W
    </span>
    <span className="hidden sm:inline">
      <span className="text-foreground">INVAPP</span>
      <span className="text-muted-foreground font-normal">/v5</span>
    </span>
  </Link>
)
