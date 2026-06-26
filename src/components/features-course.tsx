import Image from "next/image"
import type { Course } from "@/types/course"

type Props = {
  courses: Course[]
}

const FeaturesCourse = ({ courses }: Props) => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
      {/* Section header */}
      <div className="mb-12 text-center">
        <div className="mb-3 font-mono text-[11px] tracking-[0.15em] text-primary">
          {/* LEARNING */}
        </div>
        <h2 className="font-heading text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          หลักสูตรทั้งหมด
        </h2>
        <p className="mt-2 text-muted-foreground">
          เนื้อหาเข้าใจง่าย ปฏิบัติได้จริง
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <article
            key={course.title}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_24px_rgba(6,182,212,0.08)]"
          >
            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="p-5">
              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
                <Image
                  alt={course.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={course.picture}
                />
                {/* Index badge */}
                <div className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-background/80 font-mono text-[11px] font-bold text-muted-foreground backdrop-blur-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading text-lg font-semibold tracking-tight">
                  {course.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {course.detail}
                </p>
              </div>

              {/* Bottom bar */}
              <div className="mt-4 flex items-center gap-2 border-t border-border/40 pt-4 font-mono text-[10px] tracking-wider text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
                COURSE-{String(i + 1).padStart(2, "0")}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeaturesCourse
