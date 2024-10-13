import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: [
      "cookies",
      "webRequest",
      "webRequestBlocking",
      "storage",
    ],
    host_permissions: [
      "*://127.0.0.1:54321/",
      "*://127.0.0.1:54321/*",
      "*://localhost:54321/",
      "*://localhost:54321/*",
      "*://*.127.0.0.1:54321/",
    ],
  },
  modules: ["@wxt-dev/module-react"],
  dev: {
    server: {
      port: 3001,
    },
  },

  vite: (env) => ({
    build: {
      sourcemap: true,
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (warning.code === "SOURCEMAP_ERROR") {
            return;
          }

          defaultHandler(warning);
        },
      },
    },
  }),
});
