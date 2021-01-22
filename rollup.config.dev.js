import resolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
  input: ['src/notify-global-main.js'],
  output: {
    dir: './dist',
    format: 'es',
    sourceMap: true
  },
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    typescript(),
    json(),
    postcss({
      plugins: [],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs({
      esmExternals: true,
      transformMixedEsModules: true,
    }),
    globals(),
    builtins(),
    serve({
      contentBase: './dist',
      host: '0.0.0.0',
      port: 5000,
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
  ],
};
