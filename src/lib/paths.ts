/* Resume lives in public/ — resolve against Vite's base so it works both at
   root (Vercel) and on a subpath deploy (GitHub Pages /portfolio-v3/). */
export const RESUME_URL = import.meta.env.BASE_URL + 'resume.pdf'
