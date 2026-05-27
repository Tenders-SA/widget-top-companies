import type { TopCompaniesResponse, WidgetConfig } from './types'

export async function fetchTopCompanies(config: WidgetConfig): Promise<TopCompaniesResponse> {
  const params = new URLSearchParams({
    province: config.province,
    category: config.category,
    limit: String(config.limit),
  })

  const url = `${config.apiBase}/api/widgets/top-companies?${params}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch top companies: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
