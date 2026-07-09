# Sweet — Personal Portfolio

A modern, minimalist personal brand website built with pure HTML, CSS, and Vanilla JavaScript. No frameworks. No dependencies. Just clean code and thoughtful design.

## 🎯 Project Overview

**Positioning:** Personal Brand Website for AI Product · Financial Engineering · Data Analytics

**Design Philosophy:** Inspired by Apple, Linear, Vercel, Stripe, and Framer — minimal, modern, premium, with generous whitespace and a blue-white color palette.

## 🏗 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── reset.css           # Modern CSS reset
│   ├── variables.css       # Design tokens & CSS variables
│   ├── layout.css          # Global layout & grid system
│   ├── components.css      # Shared component styles
│   ├── hero.css            # Hero section styles
│   ├── timeline.css        # Timeline & education styles
│   ├── cards.css           # Card component styles
│   ├── animations.css      # Animation definitions
│   └── responsive.css      # Media queries & responsive layout
├── js/
│   ├── main.js             # Entry point & initialization
│   ├── navbar.js           # Navigation & scroll spy
│   ├── accordion.js        # Expandable panels
│   ├── modal.js            # Modal dialogs
│   └── scroll.js           # Scroll animations & effects
├── assets/
│   ├── images/             # Photos & illustrations
│   ├── icons/              # SVG icons
│   ├── logos/              # Company & school logos
│   └── certificates/       # Award certificates
└── README.md
```

## 🎨 Design System

| Token          | Value              | Usage           |
| -------------- | ------------------ | --------------- |
| Background     | `#F8FAFC`          | Page background |
| Primary        | `#2563EB`          | Brand blue      |
| Hover          | `#1D4ED8`          | Hover states    |
| Light Blue     | `#DBEAFE`          | Accent areas    |
| Card           | `#FFFFFF`          | Card background |
| Text           | `#0F172A`          | Primary text    |
| Secondary Text | `#64748B`          | Muted text      |
| Border         | `#E2E8F0`          | Dividers        |
| Accent         | `#60A5FA`          | Highlights      |

## 🚀 Deployment

### GitHub Pages
1. Push to a GitHub repository
2. Go to Settings → Pages
3. Select the `main` branch and root directory
4. Your site will be live at `https://yourusername.github.io/repo-name/`

### Vercel
1. Import the repository in Vercel
2. Framework Preset: Other
3. Build Command: (none needed)
4. Output Directory: `/`
5. Deploy

## ✏️ Customization

### Replace Portrait Photo
In `index.html`, find the Hero section and replace the placeholder:
```html
<!-- Remove this placeholder -->
<div class="hero-image-placeholder">...</div>

<!-- Add your photo -->
<img src="assets/images/portrait.jpg" alt="Sweet - Portrait">
```

### Update Content
- **About:** Edit the three cards in the About section
- **Education:** Update school names, dates, GPA, and course tags
- **Experience:** Modify company info and project details in accordions
- **Projects:** Update project cards with your real projects
- **Awards:** Replace with your actual achievements
- **Skills:** Adjust proficiency levels via `--level` CSS variable
- **Contact:** Update email, GitHub, LinkedIn links

### Color Customization
All colors are defined in `css/variables.css` as CSS custom properties. Change them once, they update everywhere.

## 📱 Responsive Breakpoints

| Device   | Width      | Layout          |
| -------- | ---------- | --------------- |
| Desktop  | > 1024px   | Full layout     |
| Tablet   | 768-1024px | Adjusted grid   |
| Mobile   | < 768px    | Single column   |

## ⚡ Performance

- Zero external dependencies (except Google Fonts)
- Pure CSS animations (GPU-accelerated)
- Semantic HTML for accessibility
- IntersectionObserver for scroll animations
- No layout shifts — all sizes predetermined

## 📄 License

© 2026 Sweet. All rights reserved.
