import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";
import json from '@rollup/plugin-json';
import css from "rollup-plugin-import-css";
import commonjs from 'rollup-plugin-commonjs';


export default {
  input: ["src/notify-card.js"],
  output: {
    dir: "./dist",
    format: "es",
  },
  plugins: [
    resolve(), 
    typescript(),
    json(),
    css(),
    babel({
      exclude: "node_modules/**",
    }),
    commonjs({
      esmExternals: true,
      transformMixedEsModules: true
    }),       
    terser(),
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
