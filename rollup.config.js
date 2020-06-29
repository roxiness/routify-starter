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
import { spassr } from 'spassr'

const isNollup = !!process.env.NOLLUP
const production = !process.env.ROLLUP_WATCH;

/**
 * User config
 */
const staticDir = 'static'
const distDir = 'dist'
const buildDir = `${distDir}/build`
const buildStaticExports = process.env.PRERENDER !== "false" && !!production
const useDynamicImports = process.env.BUNDLING === 'dynamic' || isNollup || !!production


del.sync(distDir + '/**') // clear previous builds

/**
 * Base config extended by dynamicConfig and baseConfig
 */
const baseConfig = () => ({
  input: `src/main.js`,
  output: {
    name: 'routify_app',
    sourcemap: true,
  },
  plugins: [
    copy({
      targets: [
        { src: [`${staticDir}/*`, "!*/(__index.html)"], dest: distDir },
        { src: [`${staticDir}/__index.html`], dest: distDir, rename: '__app.html', transform },
      ],
      copyOnce: true,
      flatten: false
    }),
    svelte({
      dev: !production, // run-time checks      
      // Extract component CSS — better performance
      css: css => {
        css.write(`${buildDir}/bundle.css`);
      },
      hot: isNollup,
    }),

    // resolve matching modules from current working directory
    resolve({
      browser: true,
      dedupe: importee => !!importee.match(/svelte(\/|$)/)
    }),
    commonjs(),

    buildStaticExports && prerender(),

    production && terser(), // minify
    !production && isNollup && Hmr({ inMemory: true, public: staticDir, }), // refresh only updated code
    !production && !isNollup && livereload(distDir), // refresh entire window when code is updated
    !production && !isNollup && serve()
  ],
  watch: {
    clearScreen: false,
    buildDelay: 100,
  }
})

// extends baseConfig
const bundledConfig = extendBase({
  inlineDynamicImports: true,
  output: { format: 'iife', file: `${buildDir}/bundle.js` }
})

// extends baseConfig
const dynamicConfig = extendBase({ output: { format: 'esm', dir: buildDir } })


/**
 * Can be deleted if service workers aren't used
 */
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


// Combine configs as needed
const configs = [
  useDynamicImports && dynamicConfig,
  !isNollup && bundledConfig,
  !isNollup && serviceWorkerConfig
].filter(Boolean)

export default configs


/**
 * Config helper functions
 */

function serve() {
  return {
    generateBundle() {
      if (!serve['started']) {
        serve['started'] = true
        return spassr({
          serveSpa: true, // serve app
          serveSsr: !isNollup, // Nollup doesn't need SSR
          silent: isNollup // Nollup needs Spassr internally
        })
      }
    }
  }

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

function transform(contents) {
  return contents.toString().replace('__SCRIPT__', useDynamicImports
    ? '<script type="module" defer src="/build/main.js"></script>'
    : '<script defer src="/build/bundle.js"></script>')
}

function extendBase(extend) { return mergeRollupConfigs(baseConfig(), extend) }

function mergeRollupConfigs(base, extend) {
  Object.entries(extend).forEach(([key, value]) => {
    if (Array.isArray(value)) base[key].push(...value)
    else if (typeof value === 'object') Object.assign(base[key], value)
    else base[key] = value
  })
  return base
}
