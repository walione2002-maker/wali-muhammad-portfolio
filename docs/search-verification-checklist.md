# Search Architecture Verification Checklist
**Wali Muhammad Portfolio — Production SEO Audit**
**Verified Against:** Google Search Central Guidelines & Schema.org Specification
**Live Domain:** `https://devwalimuhammad.pages.dev`

---

## 1. Static Route & Canonical URL Audit

All pages are pre-rendered statically as static HTML and checked for unique canonical URLs:

- [x] `/` (Home) -> Canonical: `https://devwalimuhammad.pages.dev/`
- [x] `/work` -> Canonical: `https://devwalimuhammad.pages.dev/work`
- [x] `/work/corpassion-events` -> Canonical: `https://devwalimuhammad.pages.dev/work/corpassion-events`
- [x] `/work/3d-resume-builder` -> Canonical: `https://devwalimuhammad.pages.dev/work/3d-resume-builder`
- [x] `/work/amirs-kalonji-oil` -> Canonical: `https://devwalimuhammad.pages.dev/work/amirs-kalonji-oil`
- [x] `/work/nexus-bay` -> Canonical: `https://devwalimuhammad.pages.dev/work/nexus-bay`
- [x] `/work/federal-sanitary-hub` -> Canonical: `https://devwalimuhammad.pages.dev/work/federal-sanitary-hub`
- [x] `/work/digital-wedding-suite` -> Canonical: `https://devwalimuhammad.pages.dev/work/digital-wedding-suite`
- [x] `/services` -> Canonical: `https://devwalimuhammad.pages.dev/services`
- [x] `/lab` -> Canonical: `https://devwalimuhammad.pages.dev/lab`
- [x] `/about` -> Canonical: `https://devwalimuhammad.pages.dev/about`
- [x] `/contact` -> Canonical: `https://devwalimuhammad.pages.dev/contact`

---

## 2. Metadata & Social Graph Verification

- [x] **Title Tags:** Every route has an authored, unique `<title>` tag under 65 characters avoiding keyword-stuffing.
- [x] **Meta Descriptions:** Every route has a unique, intent-aligned `<meta name="description">` between 120 and 155 characters.
- [x] **Open Graph:** `og:title`, `og:description`, `og:url`, `og:site_name`, `og:image`, `og:type` present on all routes.
- [x] **Twitter Cards:** `twitter:card` set to `summary_large_image` with verified handle `@walione2002`.
- [x] **Geographic Meta:** Verified `geo.region: PK-SD`, `geo.placename: Karachi, Sindh, Pakistan`, `geo.position: 24.8607;67.0011`.
- [x] **Theme & Viewport:** `theme-color: #050816` and `viewport-fit: cover` with proper scalable parameters.

---

## 3. Structured Data (JSON-LD) Entity Validation

- [x] **`Person`**: Identifies Wali Muhammad, FAST-NUCES educational affiliation, verified GitHub/LinkedIn social links, and skills.
- [x] **`WebSite`**: Declares official site entity and publisher.
- [x] **`ProfilePage`**: Clarifies the portfolio entity identity to search crawlers.
- [x] **`ItemList`**: Sequential project collection on `/` and `/work`.
- [x] **`CreativeWork` / `SoftwareApplication`**: Assigned appropriately to each individual case study with valid `dateCreated` and `keywords`.
- [x] **`BreadcrumbList`**: Implemented on all secondary routes (`Home > Work > [Project]`, `Home > Services`, `Home > About`, `Home > Contact`).
- [x] **`Service`**: Declares commercial web engineering services with exact provider link.
- [x] **`FAQPage`**: Implemented on `/services` to support Google FAQ rich results.

---

## 4. Crawl Control & Indexability

- [x] **`robots.txt`:** Fully accessible at root, permits Googlebot, Bingbot, PerplexityBot, ChatGPT-User, and points to `https://devwalimuhammad.pages.dev/sitemap.xml`.
- [x] **`sitemap.xml`:** Contains all 12 canonical public URLs with appropriate `priority` and `lastmod` timestamps. No development or test URLs present.
- [x] **404 Handling:** Static `out/404.html` generated with clear link back to homepage.
- [x] **JavaScript Disabled Fallback:** All case studies, about narrative, services deliverables, and lab documentation render complete semantic HTML5 text when JavaScript is disabled.

---

## 5. Owner Actions (Requires Account Access)

The following post-deployment steps must be performed in the respective administrative consoles:
1. **Google Search Console:** Submit `https://devwalimuhammad.pages.dev/sitemap.xml` in Sitemaps tab.
2. **Google Rich Results Test:** Verify live URL rich snippets using Google's Rich Results Tool (`https://search.google.com/test/rich-results`).
3. **Bing Webmaster Tools:** Import Google Search Console profile or submit sitemap directly.
4. **LinkedIn & Twitter Post Inspector:** Run `https://devwalimuhammad.pages.dev/` through LinkedIn Post Inspector and Twitter Card Validator to flush edge social image caches.
