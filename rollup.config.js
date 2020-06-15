import svelte from 'rollup-plugin-svelte-hot';
import Hmr from 'rollup-plugin-hot'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy'
import del from 'del'
import replace from '@rollup/plugin-replace';
import { injectManifest } from 'rollup-plugin-workbox'
import { spassr } from 'spassr/server'

const staticDir = 'static'
const distDir = 'dist'
const buildDir = `${distDir}/build`
const production = !process.env.ROLLUP_WATCH;
const shouldPrerender = process.env.PRERENDER === "true" || !!production
const useNollup = process.env.NOLLUP
const useDynamicImports = process.env.BUNDLING === 'dynamic' || useNollup || !!production
const transform = useDynamicImports  ? dynamicTransform : bundledTransform
const browserUpdate = () => useNollup ? Hmr({ inMemory: true, public: staticDir, }) : livereload(distDir)

del.sync(distDir + '/**')

const baseConfig = () => ({
  input: `src/main.js`,
  output: {
    name: 'routify_app',
    sourcemap: true,
  },
  plugins: [
    copy({
      targets: [
        { src: [staticDir + "/*", "!*/(__index.html)"], dest: distDir },
        { src: `${staticDir}/__index.html`, dest: distDir, rename: '__app.html', transform },
      ],
      copyOnce: true,
      flatten: false
    }),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      hydratable: true, //todo set to false if possible
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write(`${buildDir}/bundle.css`);
      },
      hot: !production,
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


    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    !production && serve(),
    !production && browserUpdate(),
    shouldPrerender && prerender(), //todo fix
  ],
  watch: {
    clearScreen: false,
    buildDelay: 100,
  }
})


// this should be instantiated so serve doesn't run every time
const bundledConfig = {
  inlineDynamicImports: true,
  output: { format: 'iife', file: `${buildDir}/bundle.js` },
  plugins: []
}

const dynamicConfig = {
  output: { format: 'esm', dir: buildDir }
}

const nollupConfig = {
  ...dynamicConfig,
  plugins: []
}


const serviceWorkerConfig = {
  input: `src/sw.js`,
  output: {
    name: 'service_worker',
    sourcemap: true,
    format: 'iife',
    file: `${distDir}/sw.js`
  },
  plugins: [
    {
      name: 'watch-app',
      buildStart() { this.addWatchFile("dist/build") }
    },
    commonjs(),
    resolve({ browser: true }),
    injectManifest({
      swSrc: `${distDir}/sw.js`,
      swDest: `${distDir}/sw.js`,
      globDirectory: distDir,
      globPatterns: ['**/*.{js,css,svg}', '__app.html'],
      maximumFileSizeToCacheInBytes: 10000000, // 10 MB
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production'), }),
    production && terser(),
  ]
}



const configs = [
  !useNollup && createConfig(bundledConfig),
  useNollup && createConfig(nollupConfig),
  !useNollup && useDynamicImports && createConfig(dynamicConfig),
  !useNollup && serviceWorkerConfig
].filter(Boolean)

export default configs


function serve() {
  let started = false
  return {
    generateBundle() {
      if (!started) {
        console.log('STARTING SERVE')
        started = true
        spassr({ serveSpa: true, serveSsr: true })
      }
    }
  };
}


function prerender() {
  return {
    writeBundle() {
      require('child_process').spawn('npm', ['run', 'export'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });
    }
  }
}

function bundledTransform(contents) {
  return contents.toString().replace('__SCRIPT__', `
	<script defer src="/build/bundle.js" ></script>
	`)
}

function dynamicTransform(contents) {
  return contents.toString().replace('__SCRIPT__', `
  <script type="module" defer src="/build/main.js"></script>	
	`)
}

function createConfig(extend) {
  return mergeRollupConfigs(baseConfig(), extend)
}

function mergeRollupConfigs(base, extend) {
  Object.entries(extend).forEach(([key, value]) => {
    if (Array.isArray(value)) base[key].push(...value)
    else if (typeof value === 'object') Object.assign(base[key], value)
    else base[key] = value
  })
  return base
}
