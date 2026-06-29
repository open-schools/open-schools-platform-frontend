const path = require('path');
const withPlugins = require('next-compose-plugins')
const { getObjectFromEnv } = require('./env.config')

const HelpRequisites = getObjectFromEnv('HELP_REQUISITES')
const YandexMapApiKey = getObjectFromEnv('YANDEX_MAP_apiKey')

module.exports = withPlugins([], {
    transpilePackages: ['next-usequerystate'],
    webpack: (config) => {
        config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');
        config.resolve.alias['react-dom'] = path.resolve(__dirname, '.', 'node_modules', 'react-dom');
        return config;
    },
    publicRuntimeConfig: {
        HelpRequisites,
        YandexMapApiKey,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
})
