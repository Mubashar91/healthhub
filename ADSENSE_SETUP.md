# AdSense Setup Guide for HealthHub

## Quick Setup Instructions

### 1. Get Your AdSense Publisher ID
- Sign up at [Google AdSense](https://www.google.com/adsense)
- Once approved, get your Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)

### 2. Replace Placeholder IDs

Edit `components/ads/ad-sense.tsx`:

```tsx
// Find this line and replace with your actual AdSense ID:
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense ID
```

### 3. Get Your Ad Slot IDs

After creating ad units in AdSense:
- Replace placeholder slot names with actual slot IDs

```tsx
// In ad-sense.tsx, replace these placeholders:
slot="banner-slot"      → slot="1234567890"
slot="sidebar-slot"     → slot="0987654321"
slot="in-article-slot"  → slot="1122334455"
```

## Ad Placements Included

Your site now has **optimized ad placements** for maximum revenue:

| Location | Format | Purpose |
|----------|--------|---------|
| Below Header | Leaderboard (728x90) | High visibility |
| Sidebar Top | Rectangle (300x250) | Sidebar engagement |
| Sidebar Bottom | Vertical (160x600) | Sticky earning |
| In-Article | Rectangle (300x250) | Content breaks |
| Article Bottom | Banner (468x60) | After reading |
| Pre-Footer | Leaderboard (728x90) | Final impression |

## Development vs Production

### Development Mode
- Shows placeholder boxes with "[AdSense format]" labels
- No actual ads load (won't accidentally click your own ads)

### Production Mode
To enable real ads:

1. Add AdSense script to `app/layout.tsx`:

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

2. Set environment:
```bash
NODE_ENV=production npm run build
```

## AdSense Best Practices

### For Health/Wellness Sites:
- ✅ Only evidence-based health claims
- ✅ Include medical disclaimer
- ✅ No "miracle cure" language
- ✅ Cite medical sources
- ✅ Regular content updates

### Content Requirements:
- Need 20-30+ quality articles before applying
- Original, useful content
- Proper navigation structure
- Privacy policy page
- About us page
- Contact information

## Compliance Checklist

- [ ] Privacy Policy explains data use
- [ ] Cookie consent banner (EU)
- [ ] Medical Disclaimer prominent
- [ ] No adult/mature content
- [ ] No copyrighted material
- [ ] Site loads fast (Core Web Vitals)

## Revenue Optimization Tips

1. **Content is King**: More articles = more ad impressions
2. **SEO Matters**: Target health keywords people search for
3. **Mobile First**: 60%+ of traffic is mobile
4. **Page Speed**: Fast sites earn more
5. **Regular Updates**: Fresh content = better rankings

## Testing

```bash
# Local development (placeholders)
npm run dev

# Production build test
npm run build
npm start
```

## Support

- AdSense Help: https://support.google.com/adsense
- AdSense Policies: https://support.google.com/adsense/topic/1250106

---

**Next Steps:**
1. Apply for AdSense with your live site
2. Wait for approval (usually 1-2 weeks)
3. Add your actual Publisher ID
4. Deploy and start earning!
