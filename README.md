# Mock OA Readiness Predictor

A diagnostic tool that helps engineering students find out how ready they really
are for software engineering placement assessments — not by self-rating, but by
**verifying** self-rated confidence against a short subject quiz.

Developed by: **Ankur Singh** — ankursingh9998@gmail.com
Built for Digital Heroes.

## Why this exists

Most readiness checklists ask "how confident are you in DBMS?" and stop there.
This tool asks that question, then quietly tests you on the same subject, and
shows you the gap between what you believed and what you actually know — alongside
a readiness score, tier prediction, and a personalized prep plan.

## Tech stack

- React 18 + Vite
- Tailwind CSS
- Chart.js / react-chartjs-2

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Framework preset: **Vite** (auto-detected via `vercel.json`).
4. No environment variables required.
5. Deploy — `npm install && npm run build` runs automatically, output is served from `dist/`.

## How scoring works

| Component   | Max points | Basis |
|---|---|---|
| DSA (LeetCode + CodeChef) | 40 | Problem-count tiers |
| CGPA | 15 | CGPA bracket |
| Projects | 20 | Project count |
| Internship | 10 | Yes/No |
| Quiz | 15 | (Correct / 8) × 15 |

See `src/data/scoringConfig.js` and `src/utils/scoring.js` for exact thresholds.

## Project structure

```
src/
├── data/         # static config: quiz bank, scoring thresholds, tiers, demo profile
├── context/       # AssessmentContext — single source of truth + step navigation
├── utils/         # pure scoring / tier / confidence-analysis / recommendations logic
├── components/
│   ├── layout/    # ProgressRail, PageShell, Footer
│   ├── steps/     # ProfileStep, SelfAssessmentStep, QuizStep, ResultsStep
│   ├── results/   # ScoreHero, ConfidenceGapChart, ReadinessRadar, RecommendationsList, ConfidenceInsights
│   └── ui/        # Button, Card, NumberField, SelectField, RadioGroup
└── lib/           # Chart.js registration + theme
```
