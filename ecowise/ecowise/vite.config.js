import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "scandit-sdk": "scandit-sdk/build/scandit-sdk.min.js",
    },
  },
  plugins: [react()],
})

