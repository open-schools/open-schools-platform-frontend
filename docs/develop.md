# Development #

This page would be helpful if you want to change something in open-schools. It contains core concepts and general knowledge.


## Quick start for development

To launch open-schools, or any other React, TypeScript, Next app in development mode, use this:

`yarn workspace @app/schools dev`

You can change code of the app and inspect changes in `localhost:3000`


## Apps and packages

This project is a monorepo, which is split to apps and packages.

Apps are independent applications and cannot use code from each other.

For example: If you need to create a chat app for your residents - you can create new app `apps/chat`

Good example of application is `apps/schools` - it is React, TypeScript, Next based web application that allows you to manage circles, employees, students and teachers

Packages, on the other hand, are internal libraries and can be used in any app

Good example of package is `packages/webhooks` it allows you to add webhooks feature to any of your `apps`


## Tech stack

Our primary tech stack is:
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [NextJS](https://nextjs.org)
- [rtk-query](https://redux-toolkit.js.org/rtk-query/overview)

All our apps and packages use this tech stack.

## External packages

If you need to add new external package, such as `lodash` to your `app` or `package` use these commands:

### yarn add:

- `yarn add <package> -W` -- add package for all apps (`yarn add react react-dom -W`)
- `yarn workspace @app/<name> add <package>` -- add package for app (`yarn workspace @app/schools add react react-dom`)

If you need to run command inside of any package or app, use these commands:

### yarn run:

- `yarn <command>` -- run command (`yarn dev`)
- `yarn workspace @app/<name> <command>` -- run command inside workspace (`yarn workspace @app/schools dev`)
- `yarn --cwd <app-path-name> <command>` -- run command inside app (`yarn --cwd apps/schools dev`)

### Upgrade packages versions

```bash
# just run the command, and select packages for update (this command will fix the package.json files) 
yarn upgrade-interactive --latest
```

## Env

In the env file, the keys must be in the object, this is done in order to use nextConfig.

- ` YANDEX_MAP_apiKey='{ "key": "YANDEX_MAP_KEY" }'` -- Env variable.

```
const YandexMapApiKey = getObjectFromEnv('YANDEX_MAP_apiKey')

module.exports = withPlugins([], {
    publicRuntimeConfig: {
        YandexMapApiKey,
    },
})
```

```
const {
    publicRuntimeConfig: {
        YandexMapApiKey: { key: YandexApiKey },
    },
} = getConfig()
```

```
<YMaps query={{ apikey: YandexApiKey }}>
```

## Env example

```
NEXT_PUBLIC_BASE_URL = YOUR_NEXT_PUBLIC_BASE_URL
NEXT_PUBLIC_apiKey = YOUR_NEXT_PUBLIC_apiKey
NEXT_PUBLIC_authDomain = YOUR_NEXT_PUBLIC_authDomain
NEXT_PUBLIC_projectId = YOUR_NEXT_PUBLIC_projectId
NEXT_PUBLIC_storageBucket = YOUR_NEXT_PUBLIC_storageBucket
NEXT_PUBLIC_messagingSenderId = YOUR_NEXT_PUBLIC_messagingSenderId
NEXT_PUBLIC_appId = YOUR_NEXT_PUBLIC_appId
NEXT_PUBLIC_measurementId = YOUR_NEXT_PUBLIC_measurementId

HELP_REQUISITES='{ "support_email": "index@gmail.com", "support_phone": "+7 999 999-99-99" }'

YANDEX_MAP_apiKey='{ "key": "YOUR_YANDEX_MAP_apiKey" }'
```

## Testing

We use Jest and Cypress as our primarily test runner. To launch tests in `apps/schools` - use this command:

- `yarn workspace @app/schools test` -- Launch all tests in app.

## Linting

We use [prettier](https://prettier.io/) as our linter. It enforces code-style and best-practices

We don't allow bad code into the repo. To ensure this we run [prettier](https://prettier.io/) on pre-hooks.

The configuration for the [prettier](https://prettier.io/) is found under `package.json`

**Available CLI-commands:**

- `yarn workspace @app/schools prettier` lint whole project <- this command runs on pre-hooks

**Editor integrations:**

[Webstorm integration:](https://plugins.jetbrains.com/plugin/10456-prettier)

[VSCode integration:](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

[Other editors](https://prettier.io/docs/en/editors.html)
