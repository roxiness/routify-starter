import { writable } from 'svelte/store'
import createAuth0Client from "@auth0/auth0-spa-js"

const AUTH_CONFIG = {
    domain: "routify.eu.auth0.com",
    client_id: "4oyhQ6l7yH3S0IReAz7HRrNSPfgtMqdg",
    cacheLocation: 'localstorage'
}

export const authStore = createAuthStore()

function createAuthStore() {
    const loading = writable(true)
    const authenticated = writable(false)
    const user = writable(null)
    let auth0 = null

    
    async function init(){
        auth0 = await createAuth0Client(AUTH_CONFIG)

        // update store
        user.set(await auth0.getUser())        
        loading.set(false)
        authenticated.set(true)
    }

    async function signin() {
        //display popup
        await auth0.loginWithPopup()

        //update store
        user.set(await auth0.getUser())
        authenticated.set(true)
    }

    async function signout() {
        // logout
        await auth0.logout()

        // update store
        user.set(await auth0.getUser())
        authenticated.set(false)
    }

    return { loading, authenticated, user, auth0, signin, signout, init }
}