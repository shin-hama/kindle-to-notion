import { defineConfig } from "wxt";
import { cookiesPermissions } from "./utils/constants";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Kino",
    description: "__MSG_extDescription__",
    default_locale: "en",
    permissions: [
      "cookies",
      "storage",
    ],
    host_permissions: cookiesPermissions,
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
