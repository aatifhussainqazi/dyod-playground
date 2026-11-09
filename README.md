# ⚡ DYOD Playground
> **What Kind of DYOD Explorer Are You?**  
> A fun, interactive mini-game and digital playground inspired by IUST's Design Your Own Degree (DYOD) program.

---

## 🎨 Overview

**DYOD Playground** is a lighthearted, colorful, and interactive website celebrating the multidisciplinary spirit of the **Design Your Own Degree** curriculum at the Islamic University of Science and Technology (IUST).

Instead of an official admissions portal or serious career guidance form, the playground is an entertaining personality quiz and academic toy where students and curious visitors discover their dominant "academic energy" and explore provocative, creative degree intersections.

---

## 🌟 Key Features

1. **"What Kind of DYOD Explorer Are You?" Personality Quiz**:
   - 7 humorous, conversational questions about real habits (4 AM Wikipedia holes, group project crises, touching grass).
   - Fast, responsive cards with keyboard navigation (keys `1`–`8` or tap).
   - Dynamic deterministic scoring logic matching 15+ rich archetypes (e.g. *The Creative Chaos Engineer*, *The AI Wizard*, *The Human Behaviour Detective*, *The Numbers Goblin*, *The Multidisciplinary Menace*).

2. **Suspenseful & Hilarious Reveal Screen**:
   - Fast ~1.8-second reveal animation with rotating funny thoughts ("Asking eight imaginary professors...", "Measuring caffeine-to-prototype ratio...").
   - Multi-stage confetti celebration via `canvas-confetti`.

3. **Academic Energy Radar & Compatibility Meter**:
   - Normalized breakdown of interest across 9 categories.
   - Clear disclaimer that results are playful self-reflections rather than rigid admission eligibility.

4. **Curriculum-Grounded DYOD Basket Suggestions**:
   - Directly maps results to the **8 Official IUST Academic Baskets**:
     1. Natural Sciences
     2. Mathematical Sciences
     3. Computing and Data Science
     4. Humanities and Social Sciences
     5. Engineering and Technology
     6. Earth, Environment and Sustainability
     7. Design, Innovation and Business
     8. Wellness, Health and Personal Development
   - Interactive basket inspection modal to view sample course disciplines.

5. **Exploratory Major Combinations**:
   - Fictional, multidisciplinary major directions (e.g., *Creative Technology & Physical Computing*, *Cognitive Science & Public Communication*).

6. **Interactive "Basket Blender" Toy 🍹**:
   - Pick 2 or 3 of the 8 baskets to synthesize an instant custom hybrid degree with imaginary course syllabi and wild plausible careers.

7. **Sharing & Audio Effects**:
   - Web Share API integration with automatic fallback to formatted clipboard copy.
   - Self-contained Web Audio API synthesizer for pops, boings, select cues, and fanfare chords with persistent mute toggle.
   - Accessibility: Full compliance with `prefers-reduced-motion`.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (Custom Neo-Playful Pastel Pop aesthetic with Fredoka & Nunito typography)
- **Icons:** Lucide React
- **Celebration Effects:** Canvas-Confetti
- **Audio:** Web Audio API (Zero external audio file assets required)
- **Deployment:** Vercel (Client-side SPA, zero backend or database required)

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 🌐 Deploy to Vercel

This repository is pre-configured with `vercel.json` for seamless Vercel deployment:

```bash
npx vercel
```
Or connect your GitHub repository to Vercel with framework preset set to **Vite** and root directory `./`.

---

## 📜 Disclaimer

*DYOD Playground is a student and community experiment created for fun and inspiration. It is not an official university admissions portal, academic planner, or formal career counseling tool of IUST.*
