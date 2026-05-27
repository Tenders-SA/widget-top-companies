export interface TopCompany {
  rank: number
  supplierName: string
  totalValue: number
  contractCount: number
  province: string
}

export interface TopCompaniesResponse {
  data: TopCompany[]
  meta: {
    province: string
    category: string
    generatedAt: string
  }
}

export interface WidgetConfig {
  apiBase: string
  province: string
  category: string
  limit: number
  theme: 'light' | 'dark'
}

export type Theme = 'light' | 'dark'
