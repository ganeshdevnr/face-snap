# FaceSnap Design System
**Version 1.0 — Single Source of Truth**

This document defines every visual decision for FaceSnap.
Any AI tool, developer, or designer must follow this document exactly.
Do not invent values. Do not deviate from this system.

---

## 1. Brand Identity

| Property | Value |
|---|---|
| App Name | FaceSnap |
| Aesthetic | Dark Noir Social |
| Theme | Dark only |
| Personality | Modern, premium, social, clean |

---

## 2. Color System

### Core Colors
These are the only colors used in the application.

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#08090F` | Page background |
| `--surface` | `rgba(255,255,255,0.04)` | Card backgrounds, glassmorphism |
| `--surface-hover` | `rgba(255,255,255,0.07)` | Card/button hover state |
| `--border` | `rgba(255,255,255,0.07)` | All borders default |
| `--border-hover` | `rgba(255,255,255,0.14)` | Border on hover |
| `--primary` | `#FF3D71` | Brand color — buttons, active states, accents |
| `--primary-dim` | `rgba(255,61,113,0.15)` | Primary button hover background |
| `--primary-glow` | `rgba(255,61,113,0.30)` | Glow effect on primary button hover |
| `--text` | `#EEEEF5` | Primary text — names, headings, important content |
| `--text-2` | `#8B8FA8` | Secondary text — body content, labels, descriptions |
| `--text-3` | `#484C63` | Tertiary text — timestamps, handles, disabled states |

### Rules
- NEVER use a color not defined above
- NEVER hardcode hex values in components — always reference the token
- `--primary` is used ONLY for interactive elements (active nav, liked state, CTA buttons)
- Everything else is neutral (text, surface, border)

### Background Atmosphere
The page background has two subtle radial gradients layered on top of `--bg`:
- Top-left: `rgba(255,61,113,0.13)` — pink glow from the brand color
- Bottom-right: `rgba(99,60,255,0.09)` — subtle purple glow

This creates depth without being distracting. Use `position: fixed` so it covers the full viewport.

### Avatar Gradient System
Avatars use colorful gradients instead of images. 8 gradient pairs, assigned by index:

| Index | Start | End |
|---|---|---|
| 0 | `#FF3D71` | `#FF8A65` |
| 1 | `#A855F7` | `#6366F1` |
| 2 | `#0EA5E9` | `#06B6D4` |
| 3 | `#10B981` | `#059669` |
| 4 | `#F59E0B` | `#EF4444` |
| 5 | `#EC4899` | `#8B5CF6` |
| 6 | `#14B8A6` | `#3B82F6` |
| 7 | `#F97316` | `#EAB308` |

Direction: `135deg`. Repeat with modulo when index exceeds 7.

---

## 3. Typography

### Font Families
| Token | Font | Source | Usage |
|---|---|---|---|
| `--font-display` | Syne | Google Fonts | Logo, names, headings, stat numbers, section titles |
| `--font-body` | DM Sans | Google Fonts | Body text, buttons, labels, timestamps |

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap
```

### Type Scale

| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| Logo | Syne | 20px | 800 | Gradient: `#FF3D71` → `#FF8A65` at 135deg |
| Profile name | Syne | 17px | 800 | `--text` |
| Post username | Syne | 13px | 700 | `--text` |
| Stat numbers | Syne | 16px | 700 | `--text` |
| Section titles | Syne | 13px | 700 | `--text` |
| Body / post text | DM Sans | 13.5px | 400 | `--text-2` |
| Buttons | DM Sans | 11–14px | 500–600 | varies |
| Timestamps | DM Sans | 11px | 400 | `--text-3` |
| Handles | DM Sans | 10px | 400 | `--text-3` |
| Role / labels | DM Sans | 10px | 600 | `--primary` |
| Stat labels | DM Sans | 10px | 500 | `--text-3` |

### Typography Rules
- Syne is ONLY for display — never use it for body text or small labels
- Role labels are UPPERCASE with `letter-spacing: 1px`
- Logo has `letter-spacing: -0.5px`
- Profile name has `letter-spacing: -0.3px`
- Body text line-height: `1.72`
- Bio text line-height: `1.65`

---

## 4. Spacing System

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | `4px` | Tight gaps — icon to label, badge border |
| `--space-sm` | `8px` | Internal component gaps |
| `--space-md` | `12px` | Between list items, action gaps |
| `--space-lg` | `16px` | Card internal padding sections |
| `--space-xl` | `20px` | Card padding |
| `--space-2xl` | `24px` | Layout gaps, page padding |
| `--space-3xl` | `28px` | Profile card top padding |

### Rules
- NEVER use arbitrary values like 13px, 15px, 27px
- Always pick the nearest token value

---

## 5. Border Radius

| Token | Value | Usage |
|---|---|---|
| `--r-sm` | `10px` | Buttons, nav tabs, action buttons |
| `--r-md` | `16px` | Stats grid, edit button, smaller cards |
| `--r-lg` | `24px` | Main cards (post card, profile card, suggestions) |
| `--r-full` | `9999px` | Avatars, badges, icon buttons, add-friend buttons |

---

## 6. Effects & Motion

### Glassmorphism Card
All cards use this pattern:
```
background: rgba(255,255,255,0.04)
border: 1px solid rgba(255,255,255,0.07)
border-radius: 24px
```
On hover:
```
border-color: rgba(255,255,255,0.14)
transition: border-color 0.2s
```
No drop shadow. No blur on the card itself.

### Navbar
```
background: rgba(8,9,15,0.85)
backdrop-filter: blur(24px)
border-bottom: 1px solid rgba(255,255,255,0.07)
```

### Post Entrance Animation
Posts animate in on load:
```css
@keyframes up {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
animation: up 0.4s ease both;
animation-delay: index * 0.09s  /* staggered per post */
```

### Primary Button Hover
```
background: #ff5a85
box-shadow: 0 0 18px rgba(255,61,113,0.3)
transform: translateY(-1px)
transition: all 0.18s
```

### General Transitions
- Interactive elements: `transition: all 0.18s`
- Color-only changes: `transition: color 0.2s`
- Border changes: `transition: border-color 0.2s`

---

## 7. Layout System

### Page Layout
Three-column CSS grid:
```
grid-template-columns: 256px 1fr 272px
gap: 22px
max-width: 1180px
margin: 0 auto
padding: 24px
```

### Column Responsibilities
| Column | Width | Content |
|---|---|---|
| Left | 256px fixed | Profile sidebar — sticky |
| Center | Flexible | Feed — scrollable |
| Right | 272px fixed | Friend suggestions — sticky |

### Sticky Positions
- Navbar: `position: sticky; top: 0`
- Profile card: `position: sticky; top: 82px`
- Suggestions card: `position: sticky; top: 82px`

---

## 8. Component Specifications

### Navbar
- Height: `58px`
- Padding: `0 28px`
- Logo: left-aligned, `width: 200px`
- Tabs: centered, flex
- Right section: `width: 200px`, right-aligned

### Nav Tab
- Default: `color: --text-2`
- Hover: `color: --text`
- Active: `color: --primary`
- Active indicator: `2px` bottom border in `--primary`, `border-radius: 2px 2px 0 0`
- Padding: `7px 20px`

### Icon Button (navbar)
- Size: `34x34px`
- Shape: circle (`--r-full`)
- Background: `--surface`
- Border: `1px solid --border`

### Notification Badge
- Size: `16x16px`
- Background: `--primary`
- Text: `9px`, `700` weight, white
- Border: `2px solid --bg` (cuts out background behind badge)
- Position: `-3px -3px` from top-right of parent

### Profile Avatar (large)
- Outer ring: `84x84px`, `2.5px` padding, gradient `135deg, #FF3D71, #FF8A65, #A855F7`
- Inner circle: gradient `135deg, #1E1530, #162030`, `3px solid --bg` border
- Initials: Syne `26px`, `800` weight

### Post Card
- Padding: `20px`
- Avatar size: `38px`
- Gap between avatar and user info: `11px`
- Post body: DM Sans `13.5px`, `--text-2`, `line-height: 1.72`
- Divider: `1px solid --border` before actions
- Action buttons: padding `7px 11px`, gap `6px` between icon and count

### Action Button States
| State | Color | Background |
|---|---|---|
| Default | `--text-2` | none |
| Hover | `--text` | `--surface-hover` |
| Liked | `--primary` | none |
| Liked hover | `--primary` | `--primary-dim` |

### Add Friend Button
| State | Background | Border | Color |
|---|---|---|---|
| Default | `--primary` | none | white |
| Hover | `#ff5a85` | none | white + glow |
| Pending / Sent | `--surface` | `1px solid --border` | `--text-2` |

### Stats Grid
- 3 equal columns
- Border: `1px solid --border` around entire grid
- Dividers: `1px solid --border` between columns (right border on each item except last)
- Border radius: `--r-md`
- Cell padding: `12px 4px`

---

## 9. Do's and Don'ts

### DO
- Use only the colors defined in the color system
- Use Syne for all headings and display text
- Use DM Sans for all body, button, and label text
- Keep the three-column layout on desktop
- Use glassmorphism (transparent surface + border) for all cards
- Animate posts with staggered entrance on load
- Show primary color ONLY on interactive/active states

### DON'T
- Don't add drop shadows to cards
- Don't use solid colored backgrounds for cards
- Don't use any color outside the defined palette
- Don't use Inter, Roboto, or system fonts
- Don't hardcode hex values in components
- Don't add more than one accent color
- Don't use gradients inside cards or on text (except the logo)

---

## 10. How to Use This Document

**For Claude Code:**
Save this file as `design-reference/FACESNAP-DESIGN-SYSTEM.md` in your repo.
In `CLAUDE.md`, add:
```
Design system: design-reference/FACESNAP-DESIGN-SYSTEM.md
Follow every rule in this document for all pages and components.
```

**For ChatGPT / Gemini / any other AI:**
Paste this entire document and say:
```
This is the FaceSnap design system. Use it as the single source 
of truth. Build [page name] following every rule in this document exactly.
```

**For a human developer:**
This document replaces Figma specs. Every decision is here.
No guessing. No inventing. Follow the system.
