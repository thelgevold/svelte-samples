import closure from 'rollup-plugin-closure-compiler-js';

export default {
  entry: 'src/main.js',
  dest: 'dist/build.js',
  format: 'iife',
  moduleName: 'treeview',
  plugins: [
    closure({
      languageIn: 'ECMASCRIPT6',
      languageOut: 'ECMASCRIPT5',
      compilationLevel: 'ADVANCED',
      warningLevel: 'DEFAULT'
    })
  ]
}