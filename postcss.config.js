module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: ['defaults and last 4 versions'],
        }),
        require('postcss-import')(),
    ],
};
