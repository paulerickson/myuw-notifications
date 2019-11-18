import html from 'rollup-plugin-html';
import minify from 'rollup-plugin-minify-es';
import babel from 'rollup-plugin-babel';

let fileName = 'myuw-notifications';
let objName = 'MyUWNotifications';

let plugins = {
  full: [
    html({
      include: `src/*.html`,
      htmlMinifierOptions: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: true
      }
    })
  ],
  min: [
    html({
      include: `src/*.html`,
      htmlMinifierOptions: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: true
      }
    }),
    minify({
      output: {
        wrap_iife: true
      }
    })
  ]
};

export default [
  {
    input: `src/index.js`,
    plugins: plugins.full.concat([babel({exclude: 'node_modules/**'})]),
    output: {
      file: `dist/${fileName}.js`,
      name: objName,
      format: 'iife'
    }
  },
  {
    input: `src/index.js`,
    plugins: plugins.min.concat([babel({exclude: 'node_modules/**'})]),
    output: {
      file: `dist/${fileName}.min.js`,
      name: objName,
      format: 'iife'
    }
  },
  {
    input: `src/index.js`,
    plugins: plugins.full,
    output: {
      file: `dist/${fileName}.mjs`,
      name: objName,
      format: 'es'
    }
  },
  {
    input: `src/index.js`,
    plugins: plugins.min,
    output: {
      file: `dist/${fileName}.min.mjs`,
      name: objName,
      format: 'es'
    }
  },
];
