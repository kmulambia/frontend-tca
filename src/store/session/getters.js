import { SessionStorage } from 'quasar'

//Add Encryption and decryption of values stored in store

export function getToken(state) {

        if (state.token != null) {
                // state
                return state.token
        }
        else {
                // session 
                let token = SessionStorage.getItem(process.env.SERIAL + "-JWT")
                return token
        }
}

export function getUser(state) {
        if (state.user != null) {
                // state
                return state.user
        }
        else {
                // session 
                let user = SessionStorage.getItem(process.env.SERIAL + "-USER")
                return user
        }
}

export function getRole(state) {
        // state
        if (state.role != null) {
                return state.role
        }
        else {
                // session 
                let role = SessionStorage.getItem(process.env.SERIAL + "-ROLE");
                return role

        }
}