import base64

# Create the updated design.md content supporting both Dark Mode and Light Mode
md_dual_mode = """# INVAPP V5 (Intelligence Terminal)

## Overview
A high-fidelity, high-density quantitative trading and investment intelligence terminal designed for professional traders and analysts. The interface supports a dual-theme infrastructure: a commanding, cyber-financial **Dark Mode** ("Intelligence Terminal" default aesthetic) and a high-contrast, crisp **Light Mode** ("Financial Ledger" aesthetic). Both modes feature bold display typography, ultra-clean card frames, and precise semantic color accents to signal trading alerts, market states, and AI confidence scores. The structure balances a dense left-hand multi-tier navigation sidebar with a spacious, immersive main workspace.

## Colors
The color system maps semantically across both Light and Dark themes to ensure perfect contrast, visual balance, and comfortable reading during extended monitoring sessions.

| Semantic Token | Dark Mode (Default) | Light Mode | Application & Context |
| :--- | :--- | :--- | :--- |
| **Background Main** | #0A0E17 (Obsidian Blue) | #F4F6F9 (Soft Gray-Blue) | Core workspace background canvas |
| **Sidebar Background** | #0D1321 (Midnight Blue) | #FFFFFF (Pure White) | Navigation panel background |
| **Surface Card** | #11192E (Dark Slate) | #FFFFFF (Pure White) | Stock cards and content blocks |
| **Surface Card Hover** | #16223D (Light Slate Tint) | #EDF2F7 (Cool Light Gray) | Hovered interactive container states |
| **Border Subtle** | #1E293B (Recessive Slate) | #E2E8F0 (Clean Slate Gray) | Razor-thin container outline dividers |
| **Text Primary** | #FFFFFF (Pure White) | #0F172A (Deep Slate Black) | Headings, stock tickers, main metrics |
| **Text Secondary** | #94A3B8 (Muted Slate) | #475569 (Muted Slate Gray) | Descriptive analytics, labels, metadata |
| **Text Dimmed** | #475569 (Dark Slate) | #94A3B8 (Light Slate) | Non-active categories, version tracking |
| **Interactive Accent** | #2563EB (Electric Blue) | #1D4ED8 (Deep Blue) | Active navigation menu states & links |
| **Reversal Highlight** | #F59E0B to #EA580C | #F59E0B to #EA580C | Vibrant gradient for critical "REVERSAL" zones |
| **AI Score Cyan** | #06B6D4 (Electric Cyan) | #0891B2 (Deep Cyan) | High-confidence AI metric indicator texts |
| **Bearish State** | #EF4444 (Neon Red) | #DC2626 (Strong Red) | Bearish warnings, downtrends, negative alerts |

## Typography
- **Display & Heading Font**: Prompt / Sarabun — geometric sans-serif suited for modern UI, optimized for bilingual Thai and English text.
- **Body & UI Font**: Inter / Prompt — high-legibility sans-serif for numbers, tickers, and multi-paragraph technical insights.
- **Monospace Font**: JetBrains Mono — for system routing logs (e.g., `R001 / TODAY ONE-CLICK`), timestamps, and precise numeric coordinates.

Type scale: Main Title 32px, Section Title 24px, Card Ticker 20px, Sub-labels/AI Scores 16px, Body text 13px, Small Captions 11px. 
Letter spacing is kept tight on headings (-0.02em) to maintain a professional terminal feel. Paragraphs use a comfortable line-height (1.5) to ensure lengthy Thai stock descriptions read smoothly.

Font import: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Prompt:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap');`

## Elevation & Depth
True to professional terminal workflows, this interface relies primarily on flat, high-contrast surface layering rather than soft dropped shadows. 
- **Dark Mode Depth**: Uses background color token progression (`#0A0E17` to `#0D1321` to `#11192E`) combined with 1px recessive borders.
- **Light Mode Depth**: Employs clean 1px borders (`#E2E8F0`) and subtle elevation shadows on cards (`0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)`) to separate white surfaces from the soft gray background canvas.
- **Glow Effects**: Interactive badges (like the Reversal Zone button) feature an outer radial glow in both modes (`0 0 12px rgba(234, 88, 12, 0.4)`) to establish instant visual hierarchy.

## Components
- **Sidebar Navigation**: Segmented by operational headers (`// AI STRATEGY`, `// WEALTH`, `// CORE SYSTEM`) in uppercase dimmed text. Active rows display a soft background block with high-contrast text and a left-aligned vertical indicator indicator bar.
- **Action Tabs / Filters**: Pill-shaped control items at the top workspace container (`MORNING ONE-CLICK`, `EVENING ONE-CLICK`, `REVERSAL โซนล่าง`). Selected states toggle a filled vibrant accent, while unselected states utilize a subtle background token with a light text label.
- **View Toggles**: Clean button grouped pairs (`CARD` vs `LIST`) using micro-icons alongside uppercase text labels for layout switching.
- **Stock Signal Cards**: Content-dense containers presenting:
  - Header with a Bold stock ticker (e.g., `SJWD`, `WHA`) alongside its industry sub-sector label (`TRANS`, `PROP`).
  - An asymmetric circular AI Score gauge displaying the confidence metric (e.g., `85%`, `82%`).
  - Target price ranges (`7.70 - 7.90`) paired with a highlighted breakout price (`฿8.50`).
  - Technical analysis block wrapped in a paragraph block detailing RSI movements, volume spikes, and catalyst notes.
- **Status Indicators**: Dynamic system status indicators (e.g., `BEARISH | SCORE: 30`) highlighted using matching semantic hues to quickly flag operational thresholds.

## Spacing
- Base layout follows an 8px grid system (`8px, 16px, 24px, 32px, 48px`).
- Sidebar fixed width: 260px.
- Main dashboard padding: 32px padding around core workspace elements.
- Grid Gap: 16px horizontal and vertical layout gaps between data cards.
- Content card padding: 20px internal padding to ensure dense text doesn't hit container boundaries.

## Border Radius
- **2px to 4px**: Micro-badges, system labels, view toggle buttons.
- **8px**: Action filter pills, core navigation selection items.
- **16px**: Main data cards and content containers.
- **9999px**: Profile avatars, status dots, and pill buttons.

## Do's and Don'ts
- **Do** maintain strict contrast checking between text tokens and background tokens across both dark and light themes.
- **Do** use uppercase monospace text for system status strings, timestamps, and log paths.
- **Do** reserve the vibrant orange/gold gradient exclusively for "REVERSAL" or high-priority trigger actions.
- **Don't** use identical text tokens for both modes—ensure `Text Primary` toggles between `#FFFFFF` (Dark) and `#0F172A` (Light) respectively.
- **Don't** introduce soft drop shadows on dark mode card elements—rely entirely on border colors and surface tints. Small shadows are permitted in light mode only.
"""

with open("design.md", "w", encoding="utf-8") as f:
    f.write(md_dual_mode)

print("design.md updated with Dark and Light modes successfully.")