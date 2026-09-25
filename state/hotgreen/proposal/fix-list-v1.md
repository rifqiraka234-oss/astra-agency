<!--
INTERNAL HEADER, NOT PART OF THE CLIENT TEXT.
Draft v1, 25 September 2026. Not sent. Goes with proposal-v1.md as the free extra.
Every item was checked on the live site on 25 September 2026, see evidence-ledger.md.
-->

# Fixes for hotgreensolutions.com

For Sanya. Free, and yours to make in Framer whenever it suits. Checked on the live site on 25 September
2026.

## Two that are legal requirements

1. Company details on the site. A UK company has to show its registered name, company number, where
   it's registered and its registered office on its website (regulation 25 of the Company, Limited
   Liability Partnership and Business (Names and Trading Disclosures) Regulations 2015). The footer
   says "HotGreen™ Solutions is the trading name of HotGreen Ltd" and stops there. What to add, from
   Companies House, HotGreen Ltd, registered in England and Wales, company number 16035994, registered
   office 167 to 169 Great Portland Street, 5th Floor, London W1W 5PF.
2. A privacy notice for the contact form. The form collects names and email addresses, so UK GDPR
   (article 13) needs a privacy notice linked from it. Since 19 June 2026 it should also tell people how
   to complain to you about their data. The site has no privacy page today. The same page is the place
   to say the site uses Framer's built in analytics.

## The rest, in the order we'd do them

3. Give each page its own title. Home, Solutions and Contact all use the title "HotGreen Solutions",
   and so does the page not found screen. Each page needs its own.
4. Add alt text to the images. None of the 62 images across the three pages has any, including the
   seven partner logos and the seven team photos.
5. Put the spec table in as text. The HotStack 120 and 220 comparison on the Solutions page is one
   image, so its numbers aren't on the page as text and an engineer can't search or copy them. Framer tables or a
   simple text grid will do.
6. Name your backers in words. The homepage says "Some of our key funders and partners are" and
   then shows logos only.
7. Check the contact form's Message field. It has the same field name as Last name ("lastname"),
   so the two can arrive mixed up wherever submissions are sent on. Worth checking a recent submission.
   "First name" is also marked with an asterisk but isn't required.
8. Fix Sera's LinkedIn link. The LinkedIn icon on Sera Evcimen's card opens Ben Vellacott's profile.
9. Update the availability line before January. The spec table says "Currently taking 2026 orders
   for 2027 delivery".
10. Make the hero video lighter. It's a 19.4 MB file, which is a lot for a phone on mobile data.
    A shorter or compressed version, or a still image on phones, keeps the look.
11. Host the fonts in Framer. The site loads its fonts from Google. Uploading them as custom fonts
    in Framer means a visitor's browser never has to contact Google.
