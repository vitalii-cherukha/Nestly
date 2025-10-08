# Nestly (Лелека)

[![Demo](https://img.shields.io/badge/demo-deployed-blue)](https://nestly-six.vercel.app/)
[![Repo](https://img.shields.io/badge/repo-github-black)](https://github.com/vitalii-cherukha/Nestly)

**Nestly** — collaborative web application for expectant mothers providing a dashboard, pregnancy calendar, personal diary and profile management with authentication. Built as a team project with emphasis on accessible UX and reliable data flow.

---

## 🌟 Live demo
https://nestly-six.vercel.app/

## 📁 Repository
https://github.com/vitalii-cherukha/Nestly

---

## Overview
Nestly is designed to help expectant parents track pregnancy milestones, journal personal notes, and manage profile data. The app contains a dashboard with widgets, a pregnancy calendar, notes/diary functionality, and secure user authentication. It was implemented using modern React/Next.js patterns and TanStack Query for data fetching.

---

## ✨ Key Features
- Responsive Dashboard with helpful widgets
- Pregnancy Calendar (visual timeline)
- Personal Diary / Notes with create / edit / delete
- User registration & authentication (protected routes)
- Profile page with editable information
- Seamless data fetching & caching via TanStack Query
- Modular components using CSS Modules for scoped styles
- Team-oriented implementation with task tracking (Trello)

---

## 🛠️ Tech Stack
- Framework: **Next.js** (App Router)
- UI: **React**, **CSS Modules**
- Data-fetching: **TanStack Query (@tanstack/react-query)**
- State: (local / context / small shared stores where needed)
- HTTP client: **Axios**
- Language: **TypeScript**
- Deployment: **Vercel**
- Tools & workflow: Git / GitHub, Trello (team tasks), Prettier, ESLint

---

## 👥 My role
Team project — I worked as a **Scrum Master & Frontend Developer**.  
Contributions included:
- Designed and implemented dynamic UI components
- Integrated TanStack Query with backend REST API
- Implemented authentication flows & protected routes
- Coordinated tasks and reviews in Trello / GitHub

---

## 📦 Project structure (high-level)
app/ # Next.js app (app router)
```
├─ (auth routes)/ # sign-in / sign-up pages
├─ (sidebar routes)/ # routes that share sidebar layout
├─ api/ # server-side fetchers / route handlers (if any)
├─ profile/ # profile pages
├─ components/ # reusable react components
├─ layout.tsx # root layout
├─ globals.css # global styles
└─ page.tsx # top-level pages

components/
├─ Header/
├─ Footer/
├─ NoteList/
├─ NoteForm/
└─ ... # smaller UI building blocks

lib/
└─ api/ # api client wrappers for REST endpoints

types/
├─ note.ts
└─ user.ts
```
public/ # static assets (images, icons, etc.)

yaml
Копіювати код

---

## 🚀 Run locally

> Prerequisites: Node.js v18+ recommended, npm (or yarn)

1. Clone repository
```
git clone https://github.com/vitalii-cherukha/Nestly.git
cd Nestly
```
## Install dependencies
```
npm install
```
or
```
yarn install
```
Create environment file
Create .env.local in project root and add the API base URL:

ini
```
NEXT_PUBLIC_API_URL=http://localhost:3000/
```
(other env variables required by your backend / auth)
## Run dev server
```
npm run dev
```
or
```
yarn dev
```
Open http://localhost:3000 (or port printed in console).

Build / production preview

```
npm run build
npm run start
```
or
```
yarn build
yarn start
```
⚙️ Environment & Notes
Ensure NEXT_PUBLIC_API_URL points to the backend API that implements the app endpoints.

If auth uses cookies / tokens, configure the backend & CORS accordingly for local testing.

TanStack Query is used for caching; check lib/api for API wrappers and query keys.

🧩 Contributing & Team notes
This project was developed collaboratively. If you plan to contribute:

Create a new branch for your feature/fix

Open a PR with a descriptive title and reference related tasks (Trello / issue)

Keep changes focused and add comments where the logic is not obvious

📜 License
MIT — feel free to reuse code in your own projects.

✉️ Contact
Created and maintained by Vitalii Cherukha
GitHub: https://github.com/vitalii-cherukha


