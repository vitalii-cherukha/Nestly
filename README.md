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

## 🧩 Overview
Nestly helps expectant parents track pregnancy milestones, record personal notes, and manage their profile data.  
The app includes:
- A dashboard with informative widgets  
- A pregnancy calendar  
- A diary for notes and reflections  
- Authentication and profile management  

Built with **Next.js**, **TypeScript**, and **TanStack Query**, the application leverages **Zustand** for centralized global state management — ensuring smooth data flow and reactivity across components.


---

## ✨ Key Features
- 🧭 Dashboard with widgets and key pregnancy data  
- 📅 Interactive Pregnancy Calendar  
- 📝 Personal Diary with create / edit / delete functionality  
- 👩‍🍼 Profile section with editable user data  
- 🔐 User authentication (sign-up, sign-in, protected routes)  
- ⚡ Global state management via **Zustand**  
- 🚀 API communication with **TanStack Query** and **Axios**  
- 💅 Scoped styling using **CSS Modules**  
- 🧱 Modular, reusable React components  
- 📱 Fully responsive layout


---

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router)  
- **UI:** React, CSS Modules  
- **Language:** TypeScript  
- **State Management:** Zustand (global state)  
- **Data Fetching:** TanStack Query (@tanstack/react-query)  
- **HTTP Client:** Axios  
- **Deployment:** Vercel  
- **Dev Tools:** ESLint, Prettier, Git / GitHub

---

## 👨‍💻 My Role
**Role:** Frontend Developer  
**Responsibility:** Implementation of the **Profile Section** — including user data editing, integration with API endpoints, and UI state management using Zustand.

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

---

## 🚀 Run locally

> Prerequisites: Node.js v18+ recommended, npm (or yarn)

## 1. Clone repository
```
git clone https://github.com/vitalii-cherukha/Nestly.git
cd Nestly
```
## 2. Install dependencies
```
npm install
```
or
```
yarn install
```

## 3. Set up environment variables
Create a .env.local file in the project root and add:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/
```

## 4. Start the development server
```
npm run dev
```
or
```
yarn dev
```

Then open http://localhost:3000
 in your browser.

## 5. Build for production
```
npm run build
npm run start
```
or
```
yarn build
yarn start
```

⚙️ Environment Notes

The NEXT_PUBLIC_API_URL must point to the backend API used for data fetching.

Zustand manages the global app state (auth, profile data, UI preferences, etc.).

TanStack Query handles data caching and synchronization with the server.

📜 License

MIT License — feel free to use and adapt this codebase.

✉️ Contact

Developed by Vitalii Cherukha
GitHub: github.com/vitalii-cherukha
