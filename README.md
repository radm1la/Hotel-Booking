
<img width="2473" height="1390" alt="Screenshot 2026-03-11 214147" src="https://github.com/user-attachments/assets/b6aa3488-2f1b-4919-be77-fc542be8e0e4" />

# GeoNest 🏨

A hotel booking app built with Angular 18+. Search rooms, make reservations, and manage your bookings — all in one place.

**[Live Demo →](https://hotel-booking-ten-neon.vercel.app)**

> ⚠️ The project uses free-tier hosted backends, so you might occasionally hit a slow load or a 500 error. Just refresh and it should be fine.

---

## Features

- Search hotels by city, room type, and guest count
- Book rooms with live price calculation and date validation
- View and manage your reservations from a personal dashboard
- Secure login/signup with cookie-based auth

---

## Tech Stack

- **Angular 18+** with Signals & RxJS
- **CSS3** (Flexbox/Grid), FontAwesome, Google Fonts
- **Hotel API:** `hotelbooking.stepprojects.ge`
- **Auth API:** `api.everrest.educata.dev`

---

## Getting Started

```bash
git clone https://github.com/radm1la/geonest.git
cd geonest
npm install
ng serve
```

Open `http://localhost:4200/`

---

## Project Structure

```
src/
├── app/
│   ├── components/      # Navbar, cards, footer, etc.
│   ├── pages/           # Home, room details, booking, auth
│   ├── services/        # API logic and shared state
│   ├── interceptors/    # Global HTTP error & loading handling
│   └── models/          # TypeScript interfaces
├── assets/
└── styles.css
```
