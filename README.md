# routify-starter

### Get started
##### To use this starter run ``npx @sveltech/routify init`` in an empty folder.

Alternatively, you can git clone this repo instead.

--------------------------------------------------

### Usage
**Development** ``npm run dev``

**Dev + codesplitting** ``npm run dev:split``

**Build** ``npm run build``

--------------------------------------------------

### Production
Please make sure that url rewrite is enabled on our server.
- For apps without code splitting redirect to index.html
- For apps with code splitting redirect to dynamic.html

###### [Important] Routes are currently not regenerated on build scripts, so make sure you've generated the routes first before you run the build script.
