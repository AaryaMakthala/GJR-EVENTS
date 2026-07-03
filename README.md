# GJR EVENTS

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38B2AC" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</div>

---

## Live Demo

https://gjr-events.vercel.app

---

## Project Overview

GJR Events is a full-stack event management platform designed to streamline event booking, customer communication, and administrative management.

The platform enables users to submit event booking requests while providing administrators with a centralized dashboard to manage bookings, gallery content, and user inquiries.

---

## Features

- Event booking system with validation
- Admin dashboard for managing bookings
- Gallery management system
- Contact form with message handling
- Supabase database integration
- Secure server-side actions using Next.js App Router
- Telegram notifications for new bookings
- Fully responsive user interface
- Production-ready deployment on Vercel

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Database and Authentication)
- Framer Motion
- Vercel (Deployment platform)

---

## Project Structure

```
app/            Application routes and pages
components/     Reusable UI components
lib/            Utilities and Supabase clients
types/          TypeScript type definitions
public/         Static assets
```

---

## Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:

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

Clone the repository and install dependencies:

```
git clone https://github.com/AaryaMakthala/GJR-EVENTS.git
cd GJR-EVENTS
npm install
```

---

## Development

Run the development server:

```
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

## Production Build

```
npm run build
npm start
```

---

## Deployment

This project is deployed on Vercel with continuous deployment enabled from the main branch.

Any push to the repository automatically triggers a new deployment.

---

## Notes

- Ensure all environment variables are properly configured in Vercel.
- Supabase security rules must be set correctly for production use.
- Telegram bot configuration is required for notification functionality.

---

## Author

Developed as a full-stack event management platform for production use and portfolio demonstration.
