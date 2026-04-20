# Clotek

Landing page for **Clotex** — a Kazan-based manufacturer of automotive parts and household goods (fender liners, car fenders, floor mats, sleds, decorative ponds).

**Live demo:** https://devoranima.github.io/clotek/build/index.html

## Stack

- **Build:** Gulp 4 — HTML includes, SASS compilation, CSS minification, JS uglify, BrowserSync
- **Styles:** SASS + Autoprefixer + CleanCSS
- **UI:** Bootstrap Icons, Swiper.js (sliders), AOS (scroll animations)
- **Backend:** PHP + PHPMailer — contact form with Google reCAPTCHA v2

## Project structure

```
src/
  *.html              # page entry points (Gulp file-include templates)
  html/               # reusable HTML partials (header, footer, sections, products)
  img/                # product photos and SVG assets
  files/
    scss/             # stylesheets
    js/               # scripts
    php/              # contact form mailer
build/                # compiled output (gitignored or served as static)
gulpfile.js
```

## Getting started

```bash
npm install

# Development server with watch + BrowserSync
npx gulp dev

# One-off build
npx gulp build
```

## Contact form setup

`src/files/php/send.php` uses PHPMailer over SMTP. Before deploying, replace the hardcoded credentials with environment variables or a config file excluded from version control:

- `$secret` — Google reCAPTCHA secret key
- `$mail->Username` / `$mail->Password` — SMTP credentials
