import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    {
      name: 'markdown-loader',
      enforce: 'pre',
      transform(code, id) {
        if (id.endsWith('.md')) {
          return `export default ${JSON.stringify(code)};`
        }
      }
    }
  ],
  test: {
    globals: true,
  }
})
