# Open schools platform frontend

## Getting started

> **Node should be > 16.14.0** You can check node version using `node -v` command in your terminal.

> **You need a raised [backend](https://github.com/open-schools/open-schools-platform/tree/dev) server nearby**

```bash
# 1) Clone the repo
git clone git@github.com:open-schools/open-schools-platform-frontend.git
cd open-schools-platform-frontend

# 2) Install dependencies for all project
yarn install

# 3) Install dependencies for open-schools app
yarn workspace @app/schools install

# 4) create base .env file

# 5) launch app
yarn workspace @app/schools dev
```

Now open your browser and head to http://localhost:3000 - you should see open schools app

## Developing

Check [developing.md](docs/develop.md)
