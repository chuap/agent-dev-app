import type { ApiVersion } from "@/types/version";

type VersionApiResponse = {
  data: ApiVersion
}

const API_URL = "https://api.codingthailand.com/api/version"

export async function getApiVersion(): Promise<ApiVersion> {
  const response = await fetch(API_URL)
  const json: VersionApiResponse = await response.json()
  return json.data
}
