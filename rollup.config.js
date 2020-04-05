import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy'
import del from 'del'



const distDir = 'dist'
const buildDir = `${distDir}/build`
const production = !process.env.ROLLUP_WATCH;
const options = { distDir, buildDir, production }
const bundling = production ? 'hybrid' : process.env.BUNDLING || 'bundle'

del.sync(distDir + '/**')


const bundledConfig = {
  ...options,
  port: 5000,
  inlineDynamicImports: true,
  output: [
    {
      sourcemap: true,
      name: 'app',
      format: 'iife',
      file: `${buildDir}/bundle.js`
    }
  ],
}
const dynamicConfig = {
  ...options,
  inlineDynamicImports: false,
  port: 5001,
  hotPort: 35730,
  output: [
    {
      sourcemap: true,
      name: 'app',
      format: 'esm',
      dir: buildDir
    },
  ]
}

function createConfig({ output, inlineDynamicImports, port, distDir, buildDir, hotPort = 35729, production }) {
  const staticDir = 'static'
  const __entryPointHtml = inlineDynamicImports ? '__bundled.html' : '__app.html'
  const transform = inlineDynamicImports ? bundledTransform : dynamicTransform

  return {
    inlineDynamicImports,
    input: `src/main.js`,
    output,
    plugins: [
      copy({
        targets: [
          { src: staticDir + '/**/!(__index.html)', dest: distDir },
          { src: `${staticDir}/__index.html`, dest: distDir, rename: __entryPointHtml, transform },
        ], copyOnce: true
      }),
      svelte({
        // enable run-time checks when not in production
        dev: !production,
        hydratable: true,
        // we'll extract any component CSS out into
        // a separate file — better for performance
        css: css => {
          css.write(`${buildDir}/bundle.css`);
        }
      }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration —
      // consult the documentation for details:
      // https://github.com/rollup/rollup-plugin-commonjs
      resolve({
        browser: true,
        dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
      }),
      commonjs(),

      // In dev mode, call `npm run start` once
      // the bundle has been generated
      !production && serve(port, __entryPointHtml),

      // Watch the `public` directory and refresh the
      // browser on changes when not in production
      !production && livereload({ watch: distDir, port: hotPort }),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser()
    ],
    watch: {
      clearScreen: false
    }
  }
}

const configs = []
if (['hybrid', 'bundle'].includes(bundling))
  configs.push(createConfig(bundledConfig))
if (['hybrid', 'dynamic'].includes(bundling))
  configs.push(createConfig(dynamicConfig))
export default configs

function serve(port = 5000, __entryPointHtml) {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn('npm', ['run', 'start', `-- ${__entryPointHtml} --dev --port ${port}`], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        });
      }
    }
  };
}

function bundledTransform(contents) {
  return contents.toString().replace('__SCRIPT__', `	
		<script defer src="/build/bundle.js" ></script>
	`)
}

function dynamicTransform(contents) {
  return contents.toString().replace('__SCRIPT__', `	
		<script type="module" defer src="https://unpkg.com/dimport@1.0.0/dist/index.mjs?module" data-main="/build/main.js"></script>
		<script nomodule defer src="https://unpkg.com/dimport/nomodule" data-main="/build/main.js"></script>
	`)
}