# Habit Tracker

A habit tracking web app for building and maintaining daily habits, with streak calculation and a GitHub-style activity heatmap.

**Live demo:** https://habit-tracker-one-sage.vercel.app

## Features

- **Authentication** — sign up, log in, and manage your account
- **Habit CRUD** — create, edit, and delete habits
- **Streak calculation** to track consistency over time
- **GitHub-style heatmap** visualizing habit activity
- **Guest mode** to try the app without creating an account
- **Dark mode**

## Tech Stack

- **Frontend:** React (Vite)
- **Backend / Auth / Database:** Supabase

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A Supabase project (URL + anon key)

### Installation

```bash
git clone https://github.com/ddelportgit/habit-tracker.git
cd habit-tracker
npm install
```

### Environment Variables

Create a `.env` file in the project root with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Deployment

Deployed to Vercel.
