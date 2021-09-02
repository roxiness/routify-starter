### Want full control over everything in this template?
We've created a new project called [**stackmix**](https://github.com/roxiness/stackmix). It's an experimental CLI that let's you pick and mix all features in a Routify template! Get started with `npx stackmix`


# Routify Starter

Starter template for [Routify](https://github.com/roxiness/routify).

# Get started

To get started run:
```sh
mkdir routify-app
cd routify-app
npx @roxi/routify init
```


# Scripts

Run with `npm run <command>`, for example `npm run dev`

| Command   | Description                                   |
|-----------|-----------------------------------------------|
| `dev`     | Development (port 5000)                       |
| `build`   | Build your app for production!                |
| `preview` | Preview the built version of your app locally |

# Want a service worker?
Checkout [vite-plugin-pwa](http://npmjs.org/vite-plugin-pwa)

# Extra Configs
We include a few extra configs to help make it easy to ship a Routify project:

| Config Path        | Description                                                                                                                                                |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `netlify.toml`     | This is the [Netlify](https://www.netlify.com/) config, you need this when publishing to Netlify                                                           |
| `vercel.json`      | This is the [Vercel](https://vercel.com/) config, you need this when publishing to Vercel                                                                  |
| `public/.htaccess` | If you build your site to static using [spank](https://www.npmjs.com/package/spank) you will need this when putting your site on an apache based webserver |