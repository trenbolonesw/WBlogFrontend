import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'




// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    Sitemap({ hostname: 'https://blogsite-a144e.firebaseapp.com/' }),
  ],
  host: true, // or use '0.0.0.0'
    port: 5173 // (optional) specify a port
})

