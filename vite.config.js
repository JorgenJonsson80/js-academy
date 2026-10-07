import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// På GitHub Pages ligger appen under /js-academy/, lokalt under /.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/js-academy/' : '/',
  plugins: [react()],
}))
