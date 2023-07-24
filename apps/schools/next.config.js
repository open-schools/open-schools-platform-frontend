const withPlugins = require('next-compose-plugins')
const { getObjectFromEnv } = require('./env.config')

const HelpRequisites = getObjectFromEnv('HELP_REQUISITES')

module.exports = withPlugins([], {
    publicRuntimeConfig: {
        HelpRequisites,
    },
})
