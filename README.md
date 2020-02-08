# routify-starter

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

### Production
For SPA or SSR apps please make sure that url rewrite is enabled on the server.
For SPA redirect to __app.html.
For SSR redirect to the lambda function or express server. 

--------------------------------------------------

### Todo
Improve documentation.