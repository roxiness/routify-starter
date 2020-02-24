import svelte from 'rollup-plugin-svelte-hot';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { config } from '@sveltech/routify'
import copy from 'rollup-plugin-copy'
import del from 'del'
import ppidChanged from 'ppid-changed'
import hmr from 'rollup-plugin-hot'


const production = !process.env.ROLLUP_WATCH;
const { distDir, staticDir, sourceDir, dynamicImports: split } = config
const buildDir = `${distDir}/build`
const template = staticDir + (split ? '/__dynamic.html' : '/__bundled.html')
const hot = !production

// Delete the dist folder, but not between build steps
// ("build": "build-step-1 && build-step-2 && etc")
if (ppidChanged()) del.sync(distDir + '/**')

export default {
	input: `${sourceDir}/main.js`,
	output: [{
		sourcemap: true,
		name: 'app',
		...split ? {
			format: 'esm',
			dir: buildDir,
		} : {
			format: 'iife',
			file: `${buildDir}/bundle.js`
		}
	}],
	plugins: [
		copy({ targets: [{ src: staticDir + '/*', dest: distDir }] }),
		copy({ targets: [{ src: template, dest: distDir, rename: '__app.html' }] }),
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			hydratable: true,
			// NOTE CSS file extraction is not supported with HMR
			...hot ? {
				hot: {
					// optimistic will try to recover from runtime
					// errors during component init
					optimistic: true,
					// turn on to disable preservation of local component
					// state -- i.e. non exported `let` variables
					noPreserveState: false,
				},
			} : {
				// we'll extract any component CSS out into
				// a separate file — better for performance
				css: css => {
					css.write(`${buildDir}/bundle.css`);
				},
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
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && !hot && livereload(distDir),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

    hmr({
      public: distDir,
      inMemory: false,
      // This is needed, otherwise Terser (in npm run build) chokes
      // on import.meta. With this option, the plugin will replace
      // import.meta.hot in your code with module.hot, and will do
      // nothing else.
      compatModuleHot: !hot,
    }),
	],
	watch: {
		clearScreen: false
	}
}

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
