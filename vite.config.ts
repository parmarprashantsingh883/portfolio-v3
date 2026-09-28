import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Vercel serves at the domain root → base '/'. GitHub Pages serves the
  // project under /portfolio-v3/. Dev server also runs at root.
  base: process.env.VERCEL ? '/' : mode === 'production' ? '/portfolio-v3/' : '/',
  plugins: [react()],
}))
