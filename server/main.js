/**
 * Minimal boilerplate for SSR
 * Edit to your needs! :)
 */

const express = require('express');
const ssr = require('@sveltech/routify/ssr')

// config
const PORT = 3000

/** boostrap */
const app = express();

/** setup */
app.use(ssr({}))

/** run */
app.listen(PORT)

console.log('Server listening on http://localhost:' + PORT)