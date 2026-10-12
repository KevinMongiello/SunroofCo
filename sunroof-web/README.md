# SunRoof Web

React + TypeScript frontend for SunRoof.

## Run locally

With Node.js 24 installed, run from `sunroof-web`:

```sh
npm ci
npm run dev
```

Open `http://localhost:5173`. The API defaults to `http://localhost:3000`.
To use a hosted API, add this to `.env.local` and restart Vite:

```env
VITE_API_URL=https://your-api.com
```

## Build

Run `npm run build` and serve `dist` as a static site. Set `VITE_API_URL` before
building and add the site's origin to the API's `CORS_ORIGINS`.
