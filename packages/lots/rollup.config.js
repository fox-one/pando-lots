import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import filesize from "rollup-plugin-filesize";
import postcss from "rollup-plugin-postcss";
import url from "postcss-url";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import image from "@rollup/plugin-image";
import vue from "rollup-plugin-vue";
import path from "path";
import pkg from "./package.json";

const name = "PandoUI";

// Default configs
const globals = {
  "vue-property-decorator": "vuePropertyDecorator",
  "vue-class-component": "vueClassComponent",
  vue: "Vue"
};

export default {
  input: "src/index.ts", // our source file
  inlineDynamicImports: true,
  output: [
    {
      // Keep the bundle as an ES module file, suitable for other bundlers
      // and inclusion as a <script type=module> tag in modern browsers
      name,
      file: "build/index.esm.js",
      format: "esm", // the preferred format
      compact: true,
      sourcemap: false
    },
    {
      // A self-executing function, suitable for inclusion as a <script> tag.
      // (If you want to create a bundle for your application, you probably want to use this.)
      name,
      file: "build/index.min.js",
      format: "iife",
      sourcemap: true,
      plugins: [terser()],
      globals,
      exports: "named"
    }
  ],
  external: [...Object.keys(pkg.peerDependencies), "vuetify/lib"],
  plugins: [
    typescript({
      typescript: require("typescript"),
      module: "esnext",
      check: false,
      tsconfig: "tsconfig.lib.json",
      rollupCommonJSResolveHack: true
    }),
    json(),
    postcss({
      extract: path.resolve("build/index.css"),
      to: path.resolve("build/index.css"),
      plugins: [
        url({
          url: "rebase"
        })
      ]
    }),
    vue({
      css: false,
      template: {
        isProduction: true
      }
    }),
    resolve({
      extensions: [".js", ".ts", ".svg"]
    }),
    filesize({
      showBrotliSize: true
    }),
    image()
  ]
};
