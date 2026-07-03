# GJR Events

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38B2AC" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</div>

<br/>

## Live Demo

>> https://gjr-events.vercel.app

---

## Overview

GJR Events is a full-stack event management platform designed to handle event bookings, customer inquiries, and gallery management with a modern admin dashboard.

It provides a seamless experience for users to book events and for administrators to manage all operations in real time.

---

## Features

- Event booking system with validation
- Admin dashboard for managing bookings
- Gallery management system
- Contact form with message handling
- Secure Supabase backend integration
- Server-side actions using Next.js App Router
- Telegram notifications for new bookings
- Fully responsive UI/UX design
- Production-ready deployment on Vercel

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Database + Auth)
- Framer Motion
- Vercel (Deployment)

---

## Project Structure

```
app/         Routes & pages
components/  Reusable UI components
lib/         Utilities, Supabase clients, helpers
types/       TypeScript types
public/      Static assets
```

---

## Environment Variables

Create a `.env.local` file and add:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
ADMIN_EMAIL=
```

---

## Installation

```bash
git clone https://github.com/AaryaMakthala/GJR-EVENTS.git
cd GJR-EVENTS
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

## Build for Production

```bash
npm run build
npm start
```

---

## Deployment

This project is deployed on Vercel with automatic CI/CD from the main branch.

Every push to GitHub triggers a new deployment.

---

## Notes

- Ensure environment variables are configured in Vercel
- Supabase policies must allow required operations
- Telegram bot must be active for notifications

---

## Author

Developed as a full-stack production-ready event management system for portfolio and real-world use.
