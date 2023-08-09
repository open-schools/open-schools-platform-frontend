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

## Testing

We use Jest and Cypress as our primarily test runner. To launch tests in `apps/schools` - use this command:

- `yarn workspace @app/schools test` -- Launch all tests.

## Linting

We use [prettier](https://prettier.io/) as our linter. It enforces code-style and best-practices

We don't allow bad code into the repo. To ensure this we run [prettier](https://prettier.io/) on pre-hooks.

The configuration for the [prettier](https://prettier.io/) is found under `package.json`

**Available CLI-commands:**

- `yarn prettier` lint whole project <- this command runs on pre-hooks

**Editor integrations:**

[Webstorm integration:](https://plugins.jetbrains.com/plugin/10456-prettier)

[VSCode integration:](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

[Other editors](https://prettier.io/docs/en/editors.html)
