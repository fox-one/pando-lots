import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import filesize from "rollup-plugin-filesize";
import postcss from "rollup-plugin-postcss";
import url from "postcss-url";
import typescript from "rollup-plugin-typescript2";
import image from "@rollup/plugin-image";
import vue from "rollup-plugin-vue";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel";
import path from "path";
import pkg from "./package.json";

const name = "PandoLots";

export default [
  {
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
      }
    ],
    external: [
      ...Object.keys(pkg.peerDependencies),
      "vuetify/lib",
      "@foxone/utils/http"
    ],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      typescript({
        typescript: require("typescript"),
        module: "esnext",
        check: false,
        tsconfig: "tsconfig.lib.json",
        rollupCommonJSResolveHack: true
      }),
      vue({ css: false, template: { isProduction: true } }),
      resolve({
        extensions: [".js", ".ts", ".svg"],
        jsnext: true,
        preferBuiltins: true,
        browser: true
      }),
      commonjs({ browser: true }),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "runtime",
        plugins: [["@babel/plugin-transform-runtime", { corejs: 3 }]]
      }),
      json(),
      postcss({
        extract: path.resolve("build/index.css"),
        to: path.resolve("build/index.css"),
        plugins: [url({ url: "rebase" })]
      }),
      filesize({ showBrotliSize: true }),
      image()
    ]
  },
  {
    input: "src/script.ts",
    output: [
      {
        name: "UsePandoLots",
        file: "build/script.umd.js",
        format: "umd",
        sourcemap: true,
        exports: "named"
      }
    ],
    plugins: [
      typescript({
        typescript: require("typescript"),
        module: "esnext",
        check: false,
        tsconfig: "tsconfig.lib.json",
        rollupCommonJSResolveHack: true
      }),
      commonjs({ browser: true }),
      resolve({
        extensions: [".js", ".ts"],
        jsnext: true,
        preferBuiltins: true,
        browser: true
      })
    ]
  }
];
