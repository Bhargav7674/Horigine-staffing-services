# Horigine Staffing React website scaffold

Includes Home, About Us, Services, Careers, Contact Us, shared Navbar/Footer, responsive CSS, React Router, and PWA configuration.

## Run locally
1. Install Node.js (LTS).
2. Extract this ZIP.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL shown by Vite.

## Build
Run `npm run build`, then `npm run preview`.

## PWA assets
Place real PNG icons at `public/pwa-192.png` and `public/pwa-512.png` before production deployment. The service worker and web manifest are configured through `vite-plugin-pwa`.

## Images
Add your approved design assets in `public/images/`:
- `services-dashboard.png`
- `team-meeting.png`
- `software-engineering.png`
- `staffing-team.png`

The Home, About Us, Services, and Careers pages have responsive styling and CSS fallbacks if these assets are missing. Replace the text logo in `src/shared/Navbar.tsx` with the actual brand logo image when available.

## Important
This is a responsive, organized starter implementation based on the supplied screenshots and code excerpts. Exact pixel matching depends on using the original exported Figma assets, fonts, and final copy. Verify all routes, links, image assets, and PWA icons before production.

## Careers page
The Careers page is available at `/careers`. It reuses the shared navigation and footer, has responsive benefit and role cards, and includes working client-side search, department, and location filters. The sample role cards are illustrative; replace them with approved live vacancies before publishing. Apply links currently open an email draft addressed to `careers@horiginestaffing.com`.

## Contact Us page
The Contact Us page is available at `/contact-us`. It reuses the shared navigation and footer and includes responsive contact details, an inquiry form, and an embedded map. The form opens a pre-filled email draft to `hello@horigine.com`; connect a backend or form service if you want submissions delivered without the visitor opening an email app. Confirm phone number, email address, and office address before production use.
