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
      warningLevel: 'DEFAULT',
      externs: [{src: `const fn = function(a){};
                       fn.centroid = function(a){};
                       
                       const options = {};
                       options.innerRadius;
                       options.outerRadius;
                       options.startAngle;
                       options.endAngle;          
              `}]
    })
  ]
}