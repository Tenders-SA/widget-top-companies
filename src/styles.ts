const STYLES = `
.twc-root {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 28rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.twc-root--light {
  background: #fff;
  border: 1px solid #f1f5f9;
  color: #0f172a;
}

.twc-root--dark {
  background: #0f172a;
  border: 1px solid #1e293b;
  color: #f1f5f9;
}

.twc-header {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
}

.twc-root--light .twc-header {
  background: #f8fafc;
  border-color: #f1f5f9;
}

.twc-root--dark .twc-header {
  background: #1e293b;
  border-color: #334155;
}

.twc-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.twc-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f59e0b;
  animation: twc-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes twc-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.twc-title {
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.twc-powered {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 700;
  color: #6366f1;
  text-decoration: none;
  white-space: nowrap;
}

.twc-powered:hover {
  color: #818cf8;
}

.twc-powered-icon {
  width: 12px;
  height: 12px;
}

.twc-filter-bar {
  padding: 8px 16px;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  border-bottom: 1px solid;
}

.twc-root--light .twc-filter-bar {
  background: rgba(248, 250, 252, 0.5);
  border-color: #f1f5f9;
}

.twc-root--dark .twc-filter-bar {
  background: rgba(30, 41, 59, 0.5);
  border-color: #334155;
}

.twc-pill {
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 9999px;
  white-space: nowrap;
}

.twc-root--light .twc-pill {
  background: #eef2ff;
  color: #4f46e5;
}

.twc-root--dark .twc-pill {
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
}

.twc-list {
  flex: 1;
  overflow-y: auto;
}

.twc-row {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid;
}

.twc-root--light .twc-row {
  border-color: rgba(241, 245, 249, 0.5);
}

.twc-root--dark .twc-row {
  border-color: rgba(51, 65, 85, 0.5);
}

.twc-root--light .twc-row:hover {
  background: rgba(248, 250, 252, 0.5);
}

.twc-root--dark .twc-row:hover {
  background: rgba(30, 41, 59, 0.5);
}

.twc-rank {
  width: 20px;
  font-weight: 900;
  text-align: center;
  font-size: 18px;
  line-height: 1;
  flex-shrink: 0;
}

.twc-rank--gold {
  color: #f59e0b;
}

.twc-root--light .twc-rank--muted {
  color: #cbd5e1;
}

.twc-root--dark .twc-rank--muted {
  color: #475569;
}

.twc-company-info {
  flex: 1;
  overflow: hidden;
  min-width: 0;
}

.twc-company-name {
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.twc-root--light .twc-company-name {
  color: #0f172a;
}

.twc-root--dark .twc-company-name {
  color: #f1f5f9;
}

.twc-contract-count {
  font-size: 12px;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.twc-root--light .twc-contract-count {
  color: #64748b;
}

.twc-root--dark .twc-contract-count {
  color: #94a3b8;
}

.twc-value {
  font-size: 14px;
  font-weight: 900;
  color: #10b981;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}

.twc-empty {
  padding: 32px;
  text-align: center;
  font-size: 14px;
}

.twc-root--light .twc-empty {
  color: #64748b;
}

.twc-root--dark .twc-empty {
  color: #94a3b8;
}

.twc-error {
  padding: 32px;
  text-align: center;
  font-size: 14px;
  color: #ef4444;
}

.twc-footer {
  padding: 12px 16px;
  background: #020617;
  display: flex;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.twc-root:hover .twc-footer {
  opacity: 1;
}

.twc-footer-link {
  font-size: 12px;
  font-weight: 700;
  color: #a5b4fc;
  text-decoration: none;
}

.twc-footer-link:hover {
  color: #c7d2fe;
}
`

let injected = false

export function injectStyles(): void {
  if (injected) return
  const style = document.createElement('style')
  style.textContent = STYLES
  style.setAttribute('data-twc-styles', '')
  document.head.appendChild(style)
  injected = true
}
