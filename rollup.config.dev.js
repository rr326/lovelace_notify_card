import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";
import json from '@rollup/plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss'


export default {
  input: ["src/notify-global-main.js"],
  output: {
    dir: "./dist",
    format: "es",
    assetFileNames: "[name]-[hash][extname]",
  },
  plugins: [
    resolve(), 
    typescript(),
    json(),
    postcss({
      plugins: []
    }),
    babel({
      exclude: "node_modules/**",
    }),
    commonjs({
      esmExternals: true,
      transformMixedEsModules: true
    }),       
    serve({
      contentBase: "./dist",
      host: "0.0.0.0",
      port: 5000,
      allowCrossOrigin: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }),
  ],
};
