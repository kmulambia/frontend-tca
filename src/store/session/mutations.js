import { LocalStorage, SessionStorage, Platform } from 'quasar'


export const setToken = (state, val) => {
    // state
    state.token = val
    // session 
    SessionStorage.set(process.env.SERIAL + "-JWT", val)
    // localstorage
    if ((Platform.is.electron === true) || (Platform.is.android === true)) {
        LocalStorage.set(process.env.SERIAL + "-JWT", val)
    }
}


export const setRole = (state, val) => {
    // state
    state.role = val
    // session
    SessionStorage.set(process.env.SERIAL + "-ROLE", val)
    // localstorage
    if ((Platform.is.electron === true) || (Platform.is.android === true)) {
        LocalStorage.set(process.env.SERIAL + "-ROLE", val)
    }
}

export const setUser = (state, val) => {
    // state
    state.user = val
    // session 
    SessionStorage.set(process.env.SERIAL + "-USER", val)
    // localstorage
    if ((Platform.is.electron === true) || (Platform.is.android === true)) {
        LocalStorage.set(process.env.SERIAL + "-USER", val)
    }
}
