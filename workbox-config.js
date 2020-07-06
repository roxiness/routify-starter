const distDir = 'dist'

module.exports = {
    globDirectory: distDir,
    globPatterns: ['**/*.{js,css,svg}', '__app.html'],
    swSrc: `${distDir}/sw.js`,
    swDest: `${distDir}/sw.js`,
    maximumFileSizeToCacheInBytes: 10000000, // 10 MB
};