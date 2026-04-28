# Government Scheme Finder

A full-stack web application for discovering Indian government welfare schemes based on user eligibility. It includes a React + Tailwind frontend, Express API, MongoDB model and seed script, bundled JSON fallback data, chatbot endpoint, Web Speech API voice input

## Project Structure

```text
.
|-- client
|   |-- src
|   |   |-- components
|   |   |   |-- Chatbot.jsx
|   |   |   |-- EligibilityForm.jsx
|   |   |   |-- LanguageToggle.jsx
|   |   |   `-- SchemeCard.jsx
|   |   |-- pages
|   |   |   `-- HomePage.jsx
|   |   |-- services
|   |   |   `-- api.js
|   |   |-- App.jsx
|   |   |-- i18n.js
|   |   |-- main.jsx
|   |   `-- styles.css
|   |-- .env.example
|   |-- index.html
|   |-- package.json
|   |-- postcss.config.js
|   |-- tailwind.config.js
|   `-- vite.config.js
|-- server
|   |-- config
|   |   `-- db.js
|   |-- controllers
|   |   |-- chatController.js
|   |   |-- eligibilityController.js
|   |   `-- schemeController.js
|   |-- data
|   |   `-- schemes.js
|   |-- middleware
|   |   `-- errorHandler.js
|   |-- models
|   |   `-- Scheme.js
|   |-- routes
|   |   |-- chatRoutes.js
|   |   |-- eligibilityRoutes.js
|   |   `-- schemeRoutes.js
|   |-- services
|   |   |-- eligibilityService.js
|   |   `-- schemeRepository.js
|   |-- index.js
|   |-- package.json
|   `-- seed.js
|-- .env.example
|-- package.json
|-- render.yaml
`-- README.md
```

The older static prototype files at the repo root are not required for the production app. The connected full-stack app lives in `client/` and `server/`.

## Features

- Eligibility form: age, gender, state, income, category, and occupation.
- Rule-based eligibility engine returning only matching schemes.
- Scheme cards with benefits, eligibility, required documents, and official application links.
- Chatbot endpoint at `POST /api/chat`, ` is configured and a local rule-based fallback otherwise.
- Voice input through the browser Web Speech API.
- Express validation, centralized errors, Helmet, CORS, rate limiting, MongoDB support, and JSON fallback data.
- Production mode can serve the built React app and API from one public URL.

## Included Schemes

The bundled dataset includes 12 schemes:

- PM Kisan Samman Nidhi
- National Scholarship Portal Scholarship
- Pradhan Mantri Awas Yojana
- Sukanya Samriddhi Yojana
- Ayushman Bharat PM-JAY
- Pradhan Mantri MUDRA Yojana
- Atal Pension Yojana
- Stand-Up India
- Pradhan Mantri Ujjwala Yojana
- PM Vishwakarma
- Kanyashree Prakalpa
- MahaDBT Scholarship

## API

### `GET /api/schemes`

Returns all schemes. Optional search:

```http
GET /api/schemes?q=student
```

### `POST /api/check-eligibility`

```json
{
  "age": 21,
  "gender": "female",
  "state": "Maharashtra",
  "income": 250000,
  "category": "OBC",
  "occupation": "student"
}
```

### `POST /api/chat`

```json
{
  "message": "What schemes are available for students?",
  "language": "en",
  "profile": {
    "age": 21,
    "state": "Maharashtra",
    "occupation": "student"
  }
}
```

## Local Setup

Install Node.js 18+ and, optionally, MongoDB.

```powershell
npm run install:all
```

Create environment files:

```powershell
Copy-Item .env.example server/.env
Copy-Item client/.env.example client/.env
```

Recommended `server/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/government-scheme-finder
CLIENT_ORIGIN=http://localhost:5173
SERVE_CLIENT=true
```

`OPENAI_API_KEY` is optional. Without it, the chatbot still works with the local fallback. MongoDB is also optional for local preview because the API falls back to `server/data/schemes.js`.

Seed MongoDB when you are using a database:

```powershell
npm run seed
```

Start development:

```powershell
npm run dev
```

Open:https://v0-localhost-website-rho.vercel.app/

## Production Build

```powershell
npm run build
$env:NODE_ENV="production"
$env:SERVE_CLIENT="true"
npm run start
```

Open https://v0-localhost-website-rho.vercel.app/ In production, Express serves `client/dist` and the API from the same origin, so browser requests use `/api`.

## Public URL Deployment

### Single-service deployment on Render

1. Push this repository to GitHub.
2. In Render, create a new Blueprint or Web Service from the repo.
3. Use the included `render.yaml`, or configure:
   - Build command: `npm run install:all && npm run build`
   - Start command: `npm run start`
4. Add environment variables:
   - `NODE_ENV=production`
   - `SERVE_CLIENT=true`
   - `MONGODB_URI=<your MongoDB Atlas connection string>`
   - `CLIENT_ORIGIN=<your Render public URL>`
5. Deploy. Render will provide a public HTTPS URL that works on phones, tablets, and desktops.

### Split deployment

You can also deploy `client/` to Vercel or Netlify and `server/` to Render/Railway/Fly.io.

- Set `client` build command to `npm run build`.
- Set `client` output directory to `dist`.
- Set `VITE_API_URL=https://your-api-domain.com/api`.
- Set server `CLIENT_ORIGIN=https://your-frontend-domain.com`.

## Notes

Eligibility results are guidance only. Users should verify final eligibility and application rules on the linked official portals.
