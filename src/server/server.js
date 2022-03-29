import axios from "axios";

async function refreshAccessToken (data) {
    let response = await axios.post("api/auth/token/refresh", data)
        .catch(e => ({ data : e?.response }));
    return response?.data;
}

async function googleOAuth (data) {
    let auth_token = data?.tokenId
    let response = await axios.post("api/auth/google", {auth_token})
        .catch(e => ({data : e?.response}));
    return response?.data;
}

async function loginUser (data) {
    let response = await axios.post("api/auth/login", data)
        .catch(e => ({data : e?.response}))
    return response?.data;
}

async function passwordReset (data) {
    let response = await axios.post("api/auth/reset-password", data)
        .catch(e => ({data : e?.response}))
    return response?.data;
}

async function setNewPassword (data) {
    let response = await axios.patch("api/auth/set-password", data)
        .catch(e => ({data : e?.response}))
    return response?.data;
}

async function logoutUser (refresh, access) {
    let config = {headers: {Authorization : `Bearer ${access}`}}
    let data = {refresh}
    let response = await axios.post("api/auth/logout", data, config)
        .catch(e => ({data : e?.response}))
    return response?.status;
}

async function registerUser (data) {
    let response = await axios.post("api/auth/register", data)
        .catch(e => ({data : e?.response}));
    return response?.data;
}

async function getTwitterUrl (access) {
    let config = {headers: {Authorization : `Bearer ${access}`}}
    let response = await axios.post("api/social/twitter/url", null, config)
        .catch(e => ({data : e?.response}));
    return response?.data;
}

async function saveTwitterUser (data, access) {
    let config = {headers: {Authorization : `Bearer ${access}`}}
    let response = await axios.post("api/social/save/twitter/user", data, config)
        .catch(e => ({data : e?.response}));
    return response?.data;
}

async function deleteTwitterUser (access) {
    let config = {headers: {Authorization : `Bearer ${access}`}}
    let response = await axios.delete("api/social/delete/twitter/user", config)
        .catch(e => ({data : e?.response}));
    return response?.data;
}

async function getUserFromToken (access) {
    let config = {headers: {Authorization : `Bearer ${access}`}}
    let response = await axios.post("api/auth/user-lookups", null, config)
        .catch(e => ({data : e?.response}));
    return response?.data;
}

async function getRedditUrl (access) {
    let config = {headers: {Authorization : `Bearer ${access}`}}
    let response = await axios.post("api/social/reddit/url", null, config)
        .catch(e => ({data : e?.response}));
    return response?.data;
}

async function saveRedditUser (data, access) {
    let config = {headers: {Authorization : `Bearer ${access}`}}
    let response = await axios.post("api/social/save/reddit/user", data, config)
        .catch(e => ({data : e?.response}));
    return response?.data;
}

async function deleteRedditUser(access) {
    let config = {headers: {Authorization : `Bearer ${access}`}}
    let response = await axios.delete("api/social/delete/reddit/user",config)
        .catch(e => ({data : e?.response}));
    return response?.data;
}

export {
    refreshAccessToken,
    googleOAuth,
    loginUser,
    getUserFromToken,
    passwordReset,
    setNewPassword,
    logoutUser,
    registerUser,
    getTwitterUrl,
    saveTwitterUser,
    deleteTwitterUser,
    getRedditUrl,
    saveRedditUser,
    deleteRedditUser
}