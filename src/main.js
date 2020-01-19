import HMR from  '@sveltech/routify/hmr'
import App from './App.svelte';

HMR(App, { target: document.body }, 'routify-app')

export default app;
