import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWidget } from './renderer'

const mockData = [
  { rank: 1, supplierName: 'Build-IT Solutions', totalValue: 500000000, contractCount: 12, province: 'Gauteng' },
  { rank: 2, supplierName: 'ConstructPro', totalValue: 350000000, contractCount: 8, province: 'Gauteng' },
  { rank: 3, supplierName: 'MegaCorp', totalValue: 120000000, contractCount: 5, province: 'Gauteng' },
  { rank: 4, supplierName: 'SmallBiz', totalValue: 5000000, contractCount: 2, province: 'Gauteng' },
]

describe('renderWidget', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
  })

  it('renders a complete widget structure', () => {
    renderWidget(container, mockData, {
      apiBase: 'https://tenders-sa.org',
      province: 'gauteng',
      category: 'all',
      limit: 5,
      theme: 'light',
    })

    const root = container.querySelector('.twc-root')
    expect(root).not.toBeNull()

    const header = root!.querySelector('.twc-header')
    expect(header).not.toBeNull()

    const title = root!.querySelector('.twc-title')
    expect(title?.textContent).toContain('gauteng')

    const rows = root!.querySelectorAll('.twc-row')
    expect(rows.length).toBe(4)
  })

  it('displays National for province=all', () => {
    renderWidget(container, mockData, {
      apiBase: 'https://tenders-sa.org',
      province: 'all',
      category: 'all',
      limit: 5,
      theme: 'light',
    })

    const title = container.querySelector('.twc-title')
    expect(title?.textContent).toContain('National')

    const pills = container.querySelectorAll('.twc-pill')
    expect(pills[1]?.textContent).toBe('National')
  })

  it('shows gold rank for top 3', () => {
    renderWidget(container, mockData, {
      apiBase: 'https://tenders-sa.org',
      province: 'all',
      category: 'all',
      limit: 5,
      theme: 'light',
    })

    const ranks = container.querySelectorAll('.twc-rank')
    expect(ranks[0].classList.contains('twc-rank--gold')).toBe(true)
    expect(ranks[1].classList.contains('twc-rank--gold')).toBe(true)
    expect(ranks[2].classList.contains('twc-rank--gold')).toBe(true)
    expect(ranks[3].classList.contains('twc-rank--gold')).toBe(false)
    expect(ranks[3].classList.contains('twc-rank--muted')).toBe(true)
  })

  it('applies dark theme class', () => {
    renderWidget(container, mockData, {
      apiBase: 'https://tenders-sa.org',
      province: 'all',
      category: 'all',
      limit: 5,
      theme: 'dark',
    })

    const root = container.querySelector('.twc-root')
    expect(root?.classList.contains('twc-root--dark')).toBe(true)
    expect(root?.classList.contains('twc-root--light')).toBe(false)
  })

  it('shows empty state when data is empty', () => {
    renderWidget(container, [], {
      apiBase: 'https://tenders-sa.org',
      province: 'all',
      category: 'all',
      limit: 5,
      theme: 'light',
    })

    expect(container.querySelector('.twc-empty')).not.toBeNull()
    expect(container.querySelector('.twc-row')).toBeNull()
  })

  it('includes footer with UTM link', () => {
    renderWidget(container, mockData, {
      apiBase: 'https://tenders-sa.org',
      province: 'all',
      category: 'all',
      limit: 5,
      theme: 'light',
    })

    const footerLink = container.querySelector('.twc-footer-link') as HTMLAnchorElement
    expect(footerLink).not.toBeNull()
    expect(footerLink.href).toContain('utm_source=embed_cta')
    expect(footerLink.href).toContain('utm_campaign=top-companies')
  })

  it('includes powered by link with UTM params', () => {
    renderWidget(container, mockData, {
      apiBase: 'https://tenders-sa.org',
      province: 'all',
      category: 'all',
      limit: 5,
      theme: 'light',
    })

    const poweredLink = container.querySelector('.twc-powered') as HTMLAnchorElement
    expect(poweredLink).not.toBeNull()
    expect(poweredLink.href).toContain('utm_source=embed')
    expect(poweredLink.href).toContain('utm_campaign=top-companies')
  })
})
