import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ['cookies', 'webRequest', 'webRequestBlocking', 'storage'],
  },
  modules: ['@wxt-dev/module-react'],
  vite: (env) => ({
    build: {
      sourcemap: true,
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (warning.code === 'SOURCEMAP_ERROR') {
            return
          }

          defaultHandler(warning)
        },
      },
    },
  }),
})
