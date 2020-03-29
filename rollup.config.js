import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { getConfig } from '@sveltech/routify'
import copy from 'rollup-plugin-copy'
import del from 'del'

export default (async () => {
	const config = await getConfig({ unreadOnly: true })
	const buildDir = `${config.distDir}/build`
	const options = { ...config, port: 5000, buildDir }

	const distDir = 'dist'

	console.log({config})
	del.sync(config.distDir + '/**')


	const bundledConfig = {
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
		output: [
			{
				sourcemap: true,
				name: 'app',
				format: 'esm',
				dir: buildDir
			},
		]
	}

	return [
		configFactory(bundledConfig, options),
		configFactory(dynamicConfig, { ...options, port: 5001, hotPort: 35730, dynamic: true })
	]
})()


function configFactory(config = {}, { port, distDir, buildDir, sourceDir, staticDir, hotPort = 35729, dynamic }) {
	const production = !process.env.ROLLUP_WATCH;
	const defaultConfig = {
		input: `${sourceDir}/main.js`,
		plugins: [
			copy({
				targets: [
					{ src: staticDir + '/**/!(__index.html)', dest: distDir },
					{ src: `${staticDir}/__index.html`, dest: distDir, rename: '__dynamic.html', transform: dynamicTransform },
					{ src: `${staticDir}/__index.html`, dest: distDir, rename: '__bundled.html', transform: bundledTransform },
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
			!production && serve(port, distDir, dynamic),

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
	return { ...defaultConfig, ...config }
}

function serve(port = 5000, distDir, dynamic) {
	let started = false;
	const file = dynamic ? '__dynamic.html' : '__bundled.html'
	// const path = `${distDir}/${file}`
	console.log('path', file)

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', `-- ${file} --dev --port ${port}`], {
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