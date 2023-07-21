const dotenv = require('dotenv')
dotenv.config()

function getObjectFromEnv (objectName) {
    const jsonString = process.env[objectName]

    if (!jsonString) {
        console.log(`Object with name "${objectName}" not found in environment.`)
    }

    try {
        const jsonObject = JSON.parse(jsonString)
        return jsonObject
    } catch (error) {
        console.log(`Failed to parse JSON for object "${objectName}". Error: ${error.message}`)
    }
}

module.exports = { getObjectFromEnv }
