import { existsSync, renameSync } from "node:fs";
import { fileURLToPath } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig, type Plugin } from "vite";
import { parseDocument } from "yaml";

function yamlPlugin(): Plugin {
  return {
    name: "athena-yaml",
    transform(code, id) {
      if (!id.endsWith(".yml") && !id.endsWith(".yaml")) return;
      const document = parseDocument(code);
      if (document.errors.length > 0) {
        throw document.errors[0];
      }
      return {
        code: `export default ${JSON.stringify(document.toJS())}`,
        map: null,
      };
    },
  };
}

function renameCssPlugin(): Plugin {
  return {
    name: "athena-rename-css",
    closeBundle() {
      const outputDir = fileURLToPath(new URL("../../docs/assets/config-form", import.meta.url));
      const source = `${outputDir}/style.css`;
      const target = `${outputDir}/config-form.css`;
      if (existsSync(source)) {
        renameSync(source, target);
      }
    },
  };
}

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [vue(), yamlPlugin(), renameCssPlugin()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: fileURLToPath(new URL("../../docs/assets/config-form", import.meta.url)),
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL("./src/main.ts", import.meta.url)),
      formats: ["iife"],
      name: "YesImBotConfigForm",
      fileName: () => "config-form.js",
    },
    cssCodeSplit: false,
  },
});
