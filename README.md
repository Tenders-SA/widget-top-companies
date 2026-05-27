# @tenders-sa-org/widget-top-companies

**Tenders-SA Top Companies Widget** — Embeddable leaderboard of top companies by awarded tender value in South Africa.

## Quick Start

```html
<div data-tendersa-top-companies data-limit="5" data-province="all" data-category="all" data-theme="light"></div>
<script src="https://unpkg.com/@tenders-sa-org/widget-top-companies@latest/dist/widget-top-companies.global.js"></script>
```

### Data Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-tendersa-top-companies` | boolean | — | Activates widget on this element |
| `data-province` | string | `all` | Filter by province slug (e.g. `gauteng`, `western-cape`) |
| `data-category` | string | `all` | Filter by category slug |
| `data-theme` | `"light" \| "dark"` | `light` | Color theme |
| `data-limit` | number | `5` | Max companies to show (max `10`) |

### Programmatic Usage

```html
<div id="my-widget"></div>
<script src="https://unpkg.com/@tenders-sa-org/widget-top-companies@latest/dist/widget-top-companies.global.js"></script>
<script>
  var widget = new TendersaTopCompanies.TopCompaniesWidget({
    province: 'gauteng',
    limit: 10,
    theme: 'dark',
  });
  widget.render(document.getElementById('my-widget'));
</script>
```

### API

The widget fetches from `GET /api/widgets/top-companies`. See [API docs](https://tenders-sa.org/publishers/developers) for details.

## Development

```bash
npm install
npm run dev     # watch mode rebuild
npm run build   # production bundle
npm run test    # run tests
```

## License

MIT
