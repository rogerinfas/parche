import { defineConfig } from 'vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: { host: true, allowedHosts: true },
  preview: { host: true },
  plugins: [tanstackStart(), viteReact()],
})

export default config
