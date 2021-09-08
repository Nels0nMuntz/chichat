const postcssPresetEnv = require('postcss-preset-env');
const assets  = require('postcss-assets');
const webpInCssPlugin = require('webp-in-css/plugin');
const pxtorem = require('postcss-pxtorem');

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
        // webpInCssPlugin({
        //     modules: true,
        // }),
        pxtorem({
            propList: [
                'font', 
                'font-size', 
                'line-height', 
                'letter-spacing',
                'border-radius',
                'width',
                'height',
                'padding',
                'margin',
            ],
        })
    ]
};