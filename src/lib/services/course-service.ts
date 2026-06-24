import type { Course } from "@/types/course";

type CourseApiResponse = {
  data: Course[]
}

const API_URL = "https://api.codingthailand.com/api/course"

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(API_URL, { cache: "force-cache" })
  const json: CourseApiResponse = await response.json()
  return json.data
}
