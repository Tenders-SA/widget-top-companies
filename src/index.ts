import { fetchTopCompanies } from './api'
import { renderWidget, clearWidget } from './renderer'
import { injectStyles } from './styles'
import type { WidgetConfig } from './types'

export class TopCompaniesWidget {
  private config: WidgetConfig
  private container: HTMLElement | null = null

  constructor(config?: Partial<WidgetConfig>) {
    this.config = {
      apiBase: config?.apiBase ?? 'https://tenders-sa.org',
      province: config?.province ?? 'all',
      category: config?.category ?? 'all',
      limit: config?.limit ?? 5,
      theme: config?.theme ?? 'light',
    }
  }

  async render(container: HTMLElement): Promise<void> {
    this.container = container
    injectStyles()

    try {
      const response = await fetchTopCompanies(this.config)
      renderWidget(container, response.data, this.config)
    } catch {
      container.innerHTML = '<div class="twc-error">Failed to load top companies data.</div>'
    }
  }

  destroy(): void {
    if (this.container) {
      clearWidget(this.container)
      this.container = null
    }
  }
}

function autoInit(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-tendersa-top-companies]')
  elements.forEach((el) => {
    const limitRaw = parseInt(el.getAttribute('data-limit') ?? '5', 10)
    const config: Partial<WidgetConfig> = {
      province: el.getAttribute('data-province') ?? 'all',
      category: el.getAttribute('data-category') ?? 'all',
      theme: (el.getAttribute('data-theme') === 'dark' ? 'dark' : 'light') as 'light' | 'dark',
      limit: Number.isNaN(limitRaw) ? 5 : Math.min(limitRaw, 10),
    }

    const widget = new TopCompaniesWidget(config)
    widget.render(el)
  })
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit)
  } else {
    autoInit()
  }
}
