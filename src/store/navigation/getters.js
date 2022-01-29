
export const getAdmin = (state, getters, context) => () => {
        return state.admin;
}

export const getUser = (state, getters, context) => () => {
    return state.user;
}

export const getOptions = (state, getters, context) => () => {
    return state.options;
}