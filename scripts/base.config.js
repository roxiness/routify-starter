import svelte from 'rollup-plugin-svelte-hot';
import Hmr from 'rollup-plugin-hot'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy'
import del from 'del'
import replace from '@rollup/plugin-replace';
import { spassr } from 'spassr'

const isNollup = !!process.env.NOLLUP

export function createRollupConfigs(config) {
    const { production, serve, distDir } = config
    const useDynamicImports = process.env.BUNDLING === 'dynamic' || isNollup || !!production

    del.sync(distDir + '/**') // clear previous builds

    if (serve && !isNollup)
        spassr({
            serveSpa: true, // serve app
            serveSsr: !isNollup, // Nollup doesn't need SSR
            silent: isNollup // Nollup needs Spassr internally
        })

    // Combine configs as needed
    return [
        !isNollup && baseConfig(config, { dynamicImports: false }),
        useDynamicImports && baseConfig(config, { dynamicImports: true }),
        !isNollup && serviceWorkerConfig(config)
    ].filter(Boolean)
}


/**
 * Base config extended by dynamicConfig and baseConfig
 */
function baseConfig(config, ctx) {
    const { dynamicImports } = ctx
    const { staticDir, distDir, production, buildDir, svelteWrapper, rollupWrapper } = config

    const outputConfig = !!dynamicImports
        ? { format: 'esm', dir: buildDir }
        : { format: 'iife', file: `${buildDir}/bundle.js` }

    const svelteConfig = {
        dev: !production, // run-time checks      
        // Extract component CSS — better performance
        css: css => css.write(`${buildDir}/bundle.css`),
        hot: isNollup,
    }

    const rollupConfig = {
        inlineDynamicImports: !dynamicImports,
        input: `src/main.js`,
        output: {
            name: 'routify_app',
            sourcemap: true,
            ...outputConfig
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
            svelte(svelteWrapper(svelteConfig, ctx)),

            // resolve matching modules from current working directory
            resolve({
                browser: true,
                dedupe: importee => !!importee.match(/svelte(\/|$)/)
            }),
            commonjs(),

            production && terser(), // minify
            !production && isNollup && Hmr({ inMemory: true, public: staticDir, }), // refresh only updated code
            !production && !isNollup && livereload(distDir), // refresh entire window when code is updated
        ],
        watch: {
            clearScreen: false,
            buildDelay: 100,
        }
    }

    return rollupWrapper(rollupConfig, ctx)

    function transform(contents) {
        return contents.toString().replace('__SCRIPT__', dynamicImports
            ? '<script type="module" defer src="/build/main.js"></script>'
            : '<script defer src="/build/bundle.js"></script>')
    }
}


/**
 * Can be deleted if service workers aren't used
 */
function serviceWorkerConfig(config) {
    const { distDir, production, swWrapper } = config
    const rollupConfig = {
        input: `src/sw.js`,
        output: {
            name: 'service_worker',
            sourcemap: true,
            format: 'iife',
            file: `${distDir}/sw.js`
        },
        plugins: [
            commonjs(),
            resolve({ browser: true }),
            production && terser(),
            replace({ 'process.env.NODE_ENV': "'production'" })
        ]
    }
    return swWrapper(rollupConfig, {})
}