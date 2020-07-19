import { writable } from 'svelte/store'
import createAuth0Client from "@auth0/auth0-spa-js";

const AUTH_CONFIG = {
    domain: "routify.eu.auth0.com",
    client_id: "4oyhQ6l7yH3S0IReAz7HRrNSPfgtMqdg",
    cacheLocation: 'localstorage'
}

export const authStore = {
    loading: writable(true),
    authenticated: writable(false),
    user: writable(null),
    auth0: null,
    async signin() {
        const { authenticated, user, auth0 } = authStore
        await auth0.loginWithPopup()
        user.set(await auth0.getUser())
        authenticated.set(true)
    },
    async signout() {
        const { authenticated, user, auth0 } = authStore
        authenticated.set(false)
        await auth0.logout()
        user.set(await authStore.auth0.getUser())
        authenticated.set(true)
    },
    async init() {
        const { user, authenticated, loading } = authStore
        authStore.auth0 = await createAuth0Client(AUTH_CONFIG)
        loading.set(false)
        user.set(await authStore.auth0.getUser())
        authenticated.set(true)
    }
}