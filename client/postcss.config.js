const postcssPresetEnv = require('postcss-preset-env');
const assets  = require('postcss-assets');
const webpInCssPlugin = require('webp-in-css/plugin');
// const doiuse = require('doiuse');

module.exports = {
    plugins: [
        postcssPresetEnv({
            autoprefixer: {
                grid: 'autoplace'
            },
            stage: false,
            features: {
                "custom-media-queries": true,
                "custom-properties": true,
                "custom-selectors": true,
                "gap-properties": true,
                "media-query-ranges": true,
                "nesting-rules": true,                
            }
        }),
        assets({
            relative: "public/assets"
        }),
        webpInCssPlugin({
            modules: true,
        }),
        // doiuse({
        //     browsers: browserslist,
        // }),
    ]
};