# Hospital Appointment & Teleconsultation Web App

A role-based hospital UI built with Next.js App Router, Tailwind CSS, and a set of reusable medical UI components. The app ships with mock services so you can explore the full frontend without standing up a backend.

## Highlights
- Role-based dashboards for patients, doctors, receptionists, and lab technicians
- Appointment scheduling, teleconsultation chat, medical records, and lab reporting views
- Patient registration and queue management flows
- Mock data services to make the UI feel live during development

## Routes
- `/` - role selection / login
- Patient
  - `/patient`
  - `/patient/appointments`
  - `/patient/records`
  - `/patient/messages`
  - `/patient/profile`
- Doctor
  - `/doctor`
  - `/doctor/schedule`
  - `/doctor/patients`
  - `/doctor/messages`
  - `/doctor/profile`
- Receptionist
  - `/receptionist`
  - `/receptionist/appointments`
  - `/receptionist/registration`
  - `/receptionist/queue`
- Lab Technician
  - `/lab`
  - `/lab/requests`
  - `/lab/reports`
  - `/lab/profile`

## Tech Stack
- [Next.js](https://nextjs.org) 14 (App Router)
- React 18
- Tailwind CSS + Radix UI primitives
- shadcn/ui component patterns
- lucide-react icons
- date-fns + react-day-picker

## Getting Started
1. Install dependencies
   ```bash
   npm install
   ```
2. Run the dev server
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000`

## Environment Variables
- `NEXT_PUBLIC_WEBSOCKET_URL` (optional) - WebSocket endpoint for chat. Defaults to `ws://localhost:8080` for demo purposes.

## Project Structure
- `src/app` - App Router routes and layouts
- `src/components` - UI components (cards, layouts, chat, appointments, etc.)
- `src/features` - feature-level modules (auth, etc.)
- `src/hooks` - shared hooks
- `src/lib` - mock services + utilities
- `src/types` - shared TypeScript types

## Notes
- Demo data is provided by in-memory services in `src/lib`.
- To reset the mock login, clear `localStorage` key `medicare_user` and refresh.
