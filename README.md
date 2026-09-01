# EVA 360 Service — Website

A multi-page static website for EVA 360 Service, a UK company offering:

- Cleaning & garden maintenance
- House repairs
- Removals, house moving & van services

## Structure

```
index.html      Home page
services.html   Detailed service breakdown (cleaning, repairs, removals)
booking.html    Booking request form
about.html      Company info and values
contact.html    Contact form
styles.css      Shared design system (colours, type, components)
script.js       Mobile nav + Formspree form submission
```

## Forms

Both `booking.html` and `contact.html` submit to [Formspree](https://formspree.io).
Replace `YOUR_FORM_ID` in the `<form action="...">` attribute in each file with
your real Formspree endpoint to receive live submissions.

## Running locally

No build step — it's plain HTML/CSS/JS. Open `index.html` directly in a browser,
or serve the folder locally, e.g.:

```
python3 -m http.server 8000
```

## Deployment

Static hosts work out of the box — Netlify, Cloudflare Pages, or GitHub Pages.
For GitHub Pages: enable it in the repo's Settings → Pages, and set the source
to the `main` branch, root folder.

Contact: 07445 412907 · eva360service.co.uk
