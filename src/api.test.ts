import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchTopCompanies } from './api'

const mockResponse = {
  data: [
    { rank: 1, supplierName: 'Build-IT Solutions', totalValue: 500000000, contractCount: 12, province: 'Gauteng' },
    { rank: 2, supplierName: 'ConstructPro', totalValue: 350000000, contractCount: 8, province: 'Gauteng' },
  ],
  meta: { province: 'gauteng', category: 'all', generatedAt: '2025-01-01T00:00:00Z' },
}

const defaultConfig = {
  apiBase: 'https://tenders-sa.org',
  province: 'gauteng',
  category: 'all',
  limit: 5,
  theme: 'light' as const,
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('fetchTopCompanies', () => {
  it('fetches and returns top companies data', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

    const result = await fetchTopCompanies(defaultConfig)

    expect(result).toEqual(mockResponse)
    expect(fetch).toHaveBeenCalledWith(
      'https://tenders-sa.org/api/widgets/top-companies?province=gauteng&category=all&limit=5'
    )
  })

  it('throws on non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as Response)

    await expect(fetchTopCompanies(defaultConfig)).rejects.toThrow(
      'Failed to fetch top companies: 500 Internal Server Error'
    )
  })

  it('uses correct query params for all values', async () => {
    const allConfig = { ...defaultConfig, province: 'all', category: 'all', limit: 5 }
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [], meta: { province: 'all', category: 'all', generatedAt: '' } }),
    } as Response)

    await fetchTopCompanies(allConfig)

    expect(fetch).toHaveBeenCalledWith(
      'https://tenders-sa.org/api/widgets/top-companies?province=all&category=all&limit=5'
    )
  })
})
