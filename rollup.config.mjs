import path from 'path';

import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const input = './src/index.js';
const output = './dist';
const name = 'poool-react-subscribe';
const formats = ['umd', 'cjs', 'esm'];

const defaultExternals = ['react'];
const defaultGlobals = {
  react: 'React',
};

const defaultPlugins = [
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'runtime',
  }),
  resolve(),
  commonjs(),
  terser(),
];

export default formats.map(f => ({
  input,
  plugins: [
    ...defaultPlugins,
  ],
  external: defaultExternals,
  output: {
    ...(f === 'esm' ? {
      dir: `${output}/esm`,
      chunkFileNames: '[name].js',
    } : {
      file: `${output}/${name}.${f}.js`,
    }),
    format: f,
    name: 'PooolReactSubscribe',
    sourcemap: true,
    globals: defaultGlobals,
    ...(f === 'esm' ? {
      manualChunks: id => {
        return id.includes('node_modules')
          ? 'vendor'
          : path.parse(id).name;
      },
    } : {}),
  },
}));
