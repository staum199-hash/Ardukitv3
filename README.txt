Electronics Toolkit - v2.0.1 (AdSense-ready structure)
==================================================

Upload the whole folder to the site root (Netlify: drag the folder contents, so index.html sits at the top level).

BEFORE YOU PUBLISH - replace these placeholders:
  1. contact.html      -> uses staum199@gmail.com ; change it if you want a different public address.
  2. Footer text       -> "(c) 2026 Electronics Toolkit" appears in the page footers; change the name if you prefer another.
  3. Site address      -> pages, sitemap.xml and robots.txt use https://ardukit.netlify.app ; change it if you move to your own domain.
  4. Read the four guides in /guides and edit them in your own words where you like. Original, accurate content is what AdSense looks for.

AFTER PUBLISHING:
  - The address changed to ardukit.netlify.app, so add it as a new site in AdSense (Sites -> Add site) and verify it; the ardukoot.netlify.app site keeps its own review status.
  - AdSense -> Sites -> your site: tick "I confirm the issue is fixed" and press "Request review".
  - In AdSense turn OFF auto ads for the tool page (index.html) so ads appear only on the guide pages.
  - In AdSense -> Privacy & messaging: set up the consent message for the EEA, UK and Switzerland.
  - Submit https://ardukit.netlify.app/sitemap.xml in Google Search Console.

What changed from the previous version:
  - Ads removed from the toolkit page (kept only on /guides pages). The AdSense ownership meta tag remains on every page.
  - New pages: guides (4 articles + index), About, Privacy policy, Contact; sitemap.xml, robots.txt, ads.txt.
  - Links to the guides and legal pages added to the toolkit home screen (translated to Hebrew, English, Russian).
  - Service worker fixed to cache each page separately (cache version v6).
  - Colour picker: the big square and hue slider now follow the selected colour.
