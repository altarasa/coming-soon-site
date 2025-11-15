## AltaRasa — Coming Soon

An editorial, minimal landing page built with Next.js App Router and Tailwind.

### Stack
- **Next.js 16 (App Router)**
- **TypeScript**
- **Tailwind CSS v4**
- **Google Font:** Instrument Serif

### Local development
```bash
npm install
npm run dev
# visit http://localhost:3000
```

Create `.env.local` in the project root:
```
GAS_WEBHOOK_URL="https://script.google.com/macros/s/AAA.../exec"
```

Restart the dev server after adding env vars.

### Project structure
- `src/app/layout.tsx` — Metadata and global chrome
- `src/app/page.tsx` — Landing page with newsletter CTA
- `src/components/SignUpForm.tsx` — Accessible modal form
- `src/app/api/signup/route.ts` — Forwards submissions to Google Apps Script
- `src/app/globals.css` — Editorial typography and utilities

### Form & Google Apps Script integration
The client form posts to a server route which forwards to your GAS Web App. This keeps the webhook secret and avoids CORS.

Apps Script sample:
```javascript
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
    const sheet = ss.getSheetByName('Sheet1') || ss.getSheets()[0];
    sheet.appendRow([new Date(), payload.name || '', payload.email || '', payload.message || '']);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Notes
- No `next/image` is used to keep markup simple for a single SVG/icon usage.
- Typography is tuned for an editorial feel (display, lede, kicker).
- The modal uses the native `dialog` element for accessible focus management.

