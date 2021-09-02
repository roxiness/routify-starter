const preprocess = require('svelte-preprocess');

module.exports = {
    disableDependencyReinclusion: ['@roxi/routify'],

    preprocess: [
        preprocess(),
    ],
};
