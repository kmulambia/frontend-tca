import axios from "axios";
import { LocalStorage, SessionStorage } from "quasar";

const resource = process.env.API + "/users";


export const ping = async (context, data) => {
    if (context.rootGetters["session/getToken"]) {
        return await axios
            .get(resource + "/ping", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json",
                    Authorization: `Bearer ${context.rootGetters["session/getToken"]}`
                }
            })
            .then(response => {
                var result = response.data;
                context.commit("setUser", response.data);
                return result;
            })
            .catch(error => {
                if (error.response) {
                    throw error.response.data.error;
                }
            });
    }
};

export const signin = async (context, data) => {
    return await axios
        .post(resource + "/sign-in", { email: data.email, password: data.password })
        .then(response => {
            var result = response.data;
            context.commit("setToken", result.token.id);
            context.commit("setUser", {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email
            });
            context.commit("setRole", result.user.role);
            return result.user;
        })
        .catch(error => {
            if (error.response) {
                throw error.response.data.error;
            }
        });
};

export const signup = async (context, data) => {
    return await axios
        .post(resource + "/sign-up", data)
        .then(response => {
            var result = response.data;
            return result;
        })
        .catch(error => {
            if (error.response) {
                throw error.response.data.error;
            }
        });
};

export const signout = async (context, data) => {
    context.commit("setToken", null);
    context.commit("setUser", null);
    context.commit("setRole", null);
    SessionStorage.clear();
    LocalStorage.clear();
};

export const forgotPassowrd = async (context, data) => {
    return await axios
        .post(resource + "/forgot-password", data)
        .then(response => {
            var result = response.data;
            return result;
        })
        .catch(error => {
            if (error.response) {
                throw error.response.data.error;
            }
        });
};

export const resetPassowrd = async (context, data) => {
    return await axios
        .post(resource + "/reset-password", data)
        .then(response => {
            var result = response.data;
            return result;
        })
        .catch(error => {
            if (error.response) {
                throw error.response.data.error;
            }
        });
};

export const changePassword = async (context, data) => {
    return await axios
        .patch(resource + "/change-password", data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                Authorization: `Bearer ${context.rootGetters["session/getToken"]}`
            }
        })
        .then(response => {
            var result = response.data;
            return result;
        })
        .catch(error => {
            if (error.response) {
                throw error.response.data.error;
            }
        });
};