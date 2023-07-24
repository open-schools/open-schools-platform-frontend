const withPlugins = require('next-compose-plugins')
const { getObjectFromEnv } = require('../../packages/@core.config/env.config')

const HelpRequisites = getObjectFromEnv('HELP_REQUISITES')

module.exports = withPlugins([], {
    publicRuntimeConfig: {
        HelpRequisites,
    },
})
