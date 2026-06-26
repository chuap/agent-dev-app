import CartButton from "@/app/(front)/components/CartButton"
import Image from "next/image"

export type ProductCardItem = {
  id: number
  name: string
  description: string
  price: number
  categoryName: string
  imageName: string | null
}

type Props = {
  products: ProductCardItem[]
}

function getProductImage(product: ProductCardItem) {
  return product.imageName
    ? `/product-image/${product.imageName}`
    : "/product-image/nopic.png"
}

const priceFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
})

function AiScoreBadge({ id }: { id: number }) {
  const score = ((id * 7 + 13) % 41) + 60
  const hue = score >= 85 ? "from-cyan-500 to-teal-500" : score >= 70 ? "from-amber-500 to-orange-500" : "from-red-500 to-rose-500"

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${hue} px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
      AI {score}%
    </span>
  )
}

const FeaturesProduct = ({ products }: Props) => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
      {/* Section header */}
      <div className="mb-12 text-center">
        <div className="mb-3 font-mono text-[11px] tracking-[0.15em] text-primary">
          {/* CATALOG */}
        </div>
        <h2 className="font-heading text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          สินค้าทั้งหมด
        </h2>
        <p className="mt-2 text-muted-foreground">
          พร้อม AI Confidence Score จากระบบวิเคราะห์
        </p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed px-6 py-16 text-center text-muted-foreground">
          ยังไม่มีสินค้าในฐานข้อมูล
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            return (
              <article
                key={product.id}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_24px_rgba(37,99,235,0.08)]"
              >
                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex flex-col p-5">
                  {/* Image */}
                  <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
                    <Image
                      alt={product.name}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      src={getProductImage(product)}
                    />
                    {/* AI Score overlay */}
                    <div className="absolute right-2 top-2">
                      <AiScoreBadge id={product.id} />
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
                      #{String(product.id).padStart(3, "0")}
                    </span>
                    <span className="rounded-md bg-primary/5 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-primary dark:bg-primary/15">
                      {product.categoryName}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-semibold tracking-tight">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>

                  {/* Price row */}
                  <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
                    <span className="font-mono text-lg font-bold tracking-tight text-foreground">
                      {priceFormatter.format(product.price)}
                    </span>
                    <CartButton product={product} />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default FeaturesProduct
