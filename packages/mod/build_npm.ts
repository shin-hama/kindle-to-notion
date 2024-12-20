import { build, emptyDir } from "jsr:@deno/dnt";

await emptyDir("../apiClient");

await build({
  entryPoints: ["../../supabase/functions/api/client.ts"],
  outDir: "../apiClient",
  packageManager: "pnpm",
  skipNpmInstall: false,
  shims: {
    deno: true,
  },
  importMap: "deno.json",
  typeCheck: false,
  test: false,
  scriptModule: false,
  package: {
    name: "@kino/api-client",
    version: Deno.args[0],
    repository: {
      type: "git",
      url: "git+https://github.com/shin-hama/kindle-to-notion.git",
    },
    peerDependencies: {
      "@hono/zod-validator": "^0.4.1",
      "@notionhq/client": "^2.2.15",
      hono: "^4.6.8",
      zod: "^3.23.8",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("README.md", "../apiClient/README.md");
    Deno.copyFileSync(".gitignore", "../apiClient/.gitignore");
  },
});
