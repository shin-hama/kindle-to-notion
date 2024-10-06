import { build, emptyDir } from "@deno/dnt";

await emptyDir("../apiClient");

await build({
  entryPoints: ["../../supabase/functions/api/client.ts"],
  outDir: "../apiClient",
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
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync(".gitignore", "../apiClient/.gitignore");
    Deno.copyFileSync("README.md", "../apiClient/README.md");
  },
});
