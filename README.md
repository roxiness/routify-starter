# routify-starter
Starter template for [Routify](https://github.com/sveltech/routify)

### Get started
##### To use this starter run ``npx @sveltech/routify init`` in an empty folder.

Alternatively, you can git clone this repo instead.

--------------------------------------------------

### Npm tasks
``dev`` **Development** 

``dev:split`` **Development (with code splitting)** 

``build`` **Build a bundled app for SSR + prerendering and a dynamic app for code splitting**

``export`` **Export static pages (with app fallback)** 

``preview-build`` **Run after build to preview app**

``deploy:*`` **Deploy to netlify or now**

--------------------------------------------------

### SSR and prerendering
SSR and prerendering are in included in the default build process.
Npm run deploy:(now|netlify) will deploy the app with SSR and prerendering included.
To render async data, call the $ready() helper whenever your data is ready.
If $ready() is present, rendering will be delayed till the function has been called.
Otherwise it will be rendered instantly.

See [src/pages/example/api/[showId].svelte](https://github.com/sveltech/routify-starter/blob/master/src/pages/example/api/%5BshowId%5D.svelte) for an example.

### Production
For SPA or SSR apps please make sure that url rewrite is enabled on the server.
For SPA redirect to __app.html.
For SSR redirect to the lambda function or express server. 

--------------------------------------------------

### Todo
Improve documentation (feedback much appreciated).
