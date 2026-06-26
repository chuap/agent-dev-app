import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6">
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[image:linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-cyan-500/8 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Terminal-style badge */}
        <Badge
          variant="outline"
          className="mb-6 rounded-full border-primary/20 font-mono text-[11px] tracking-[0.12em] uppercase text-primary"
        >
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
          COURSE · Intelligence Terminal
        </Badge>

        <h1 className="font-heading text-balance text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
          สร้างร้านค้าออนไลน์
          <br />
          <span className="bg-gradient-to-r from-primary via-cyan-500 to-primary bg-clip-text text-transparent">
            ด้วย Next.js 16
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
          เรียนรู้การพัฒนา e-commerce แบบครบวงจร ตั้งแต่ระบบสมาชิก สินค้า
          ตะกร้าสินค้า ไปจนถึงแดชบอร์ดผู้ดูแล
        </p>

        {/* Metrics row */}
        <div className="mt-10 flex items-center justify-center gap-8">
          {[
            { label: "PRODUCTS", value: "12+" },
            { label: "COURSES", value: "8" },
            { label: "STACK", value: "Next 16" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {m.value}
              </div>
              <div className="mt-0.5 font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
                // {m.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/product">
              เริ่มต้นเรียน
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 shadow-none">
            <Link href="/course">
              ดูหลักสูตร
            </Link>
          </Button>
        </div>

        {/* Terminal prompt */}
        <div className="mx-auto mt-12 max-w-md rounded-xl border border-border/50 bg-muted/30 px-5 py-3 text-left font-mono text-[13px] leading-relaxed text-muted-foreground">
          <span className="text-emerald-500">❯</span>{" "}
          <span className="text-foreground/80">npx create-next-app</span>
          <span className="ml-2 animate-pulse text-emerald-500">▌</span>
        </div>

        {/* Quick-link menu cards */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { href: "/product", label: "สินค้า", icon: "⊞", desc: "product" },
            { href: "/cart", label: "ตะกร้า", icon: "⊡", desc: "cart" },
            { href: "/about", label: "เกี่ยวกับ", icon: "◈", desc: "about" },
            { href: "/contact", label: "ติดต่อ", icon: "◎", desc: "contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col items-center gap-1.5 rounded-xl border border-border/40 bg-muted/20 px-3 py-4 font-mono text-[11px] tracking-wider text-muted-foreground transition-all duration-200 hover:border-cyan-500/30 hover:bg-muted/40 hover:text-foreground hover:shadow-[0_0_16px_rgba(6,182,212,0.06)]"
            >
              <span className="text-lg text-primary/70 transition-colors group-hover:text-primary">
                {item.icon}
              </span>
              <span>{item.label}</span>
              <span className="text-[9px] text-muted-foreground/50">
                // {item.desc}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
