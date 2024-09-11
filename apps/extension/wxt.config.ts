import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ['cookies', 'webRequest', 'webRequestBlocking', 'storage'],
  },
  modules: ['@wxt-dev/module-react'],
})
