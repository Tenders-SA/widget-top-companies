import type { TopCompany, WidgetConfig } from './types'

function formatCompactNumber(number: number): string {
  if (number < 1000) return String(number)
  if (number < 1_000_000) return (number / 1000).toFixed(1) + 'K'
  if (number < 1_000_000_000) return (number / 1_000_000).toFixed(1) + 'M'
  if (number < 1_000_000_000_000) return (number / 1_000_000_000).toFixed(1) + 'B'
  return (number / 1_000_000_000_000).toFixed(1) + 'T'
}

function displayLabel(value: string, type: 'province' | 'category'): string {
  if (value === 'all') return type === 'province' ? 'National' : 'All Sectors'
  return value
}

export function renderWidget(container: HTMLElement, data: TopCompany[], config: WidgetConfig): void {
  const root = document.createElement('div')
  root.className = `twc-root twc-root--${config.theme}`

  const poweredIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="twc-powered-icon"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>'

  root.innerHTML = `
    <div class="twc-header">
      <div class="twc-header-left">
        <span class="twc-dot"></span>
        <h1 class="twc-title">Top Companies — ${displayLabel(config.province, 'province')}</h1>
      </div>
      <a href="https://www.tenders-sa.org/tools/company-intelligence?utm_source=embed&utm_campaign=top-companies" target="_blank" rel="noopener noreferrer" class="twc-powered">
        Powered by TenderSA
        ${poweredIcon}
      </a>
    </div>
    <div class="twc-filter-bar">
      <span class="twc-pill">${displayLabel(config.category, 'category')}</span>
      <span class="twc-pill">${displayLabel(config.province, 'province')}</span>
    </div>
    <div class="twc-list">
      ${
        data.length === 0
          ? '<div class="twc-empty">No data available for these filters.</div>'
          : data.map((company) => `
              <div class="twc-row">
                <div class="twc-rank ${company.rank <= 3 ? 'twc-rank--gold' : 'twc-rank--muted'}">${company.rank}</div>
                <div class="twc-company-info">
                  <div class="twc-company-name">${company.supplierName || 'Unknown Company'}</div>
                  <div class="twc-contract-count">${company.contractCount} contracts</div>
                </div>
                <div class="twc-value">R ${formatCompactNumber(company.totalValue || 0)}</div>
              </div>
            `).join('')
      }
    </div>
    <div class="twc-footer">
      <a href="https://www.tenders-sa.org/tools/company-intelligence?utm_source=embed_cta&utm_campaign=top-companies" target="_blank" rel="noopener noreferrer" class="twc-footer-link">
        Full Leaderboard on TenderSA →
      </a>
    </div>
  `

  container.appendChild(root)
}

export function clearWidget(container: HTMLElement): void {
  const root = container.querySelector('.twc-root')
  if (root) root.remove()
}
