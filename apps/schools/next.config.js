const withPlugins = require('next-compose-plugins')
const { getObjectFromEnv } = require('./env.config')

const HelpRequisites = getObjectFromEnv('HELP_REQUISITES')
const YandexMapApiKey = getObjectFromEnv('YANDEX_MAP_apiKey')

module.exports = withPlugins([], {
    publicRuntimeConfig: {
        HelpRequisites,
        YandexMapApiKey,
    },
})
