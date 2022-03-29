import axios from "axios";

async function createMedia (media, access) {
    let data = new FormData();
    data.append("media", media);
    let config = {headers: {
        Authorization : `Bearer ${access}`,
        'Content-Type' : 'multipart/form-data'
    }}
    let response = await axios.post("api/post/save/media", data, config)
        .catch(e => ({data : e?.response}));
    return response.data;
}

async function createTweetData (data, access) {
    let config = {headers: {Authorization : `Bearer ${access}`}}
    let response = await axios.post("api/post/twitter/tweet", data, config)
        .catch(e => ({data : e?.response}));
    return response;
}

async function createRedditData (data, access) {
    let config = {headers: {Authorization : `Bearer ${access}`}}
    let response = await axios.post("api/post/reddit/post", data, config)
        .catch(e => ({data : e?.response}));
    return response;
}

async function getTweetsData (url, access) {
    let config = {headers: {Authorization : `Bearer ${access}`}}
    let response = await axios.get(url, config)
    .catch(e => ({data : e?.response}));
    return response?.data;
}

async function getRedditsData (url,access) {
    let config = {headers: {Authorization : `Bearer ${access}`}};
    let response = await axios.get(url, config)
    .catch(e => ({data : e?.response}));
    return response?.data;
}

async function deleteTweet (id, access) {
    let config = {headers: {Authorization : `Bearer ${access}`}};
    let response = await axios.delete(`api/post/get/twitter/tweets?tweet_id=${id}`, config)
    .catch(e => ({data : e?.response}));
    return response;
}

async function deleteReddit (id, access) {
    let config = {headers: {Authorization : `Bearer ${access}`}}
    let response = await axios.delete(`api/post/get/reddit/posts?reddit_id=${id}`, config)
    .catch(e => ({data : e?.response}));
    return response;
}

async function getTweetData (id, access) {
    let config = {headers: {Authorization : `Bearer ${access}`}};
    let response = await axios.get(`api/post/get/twitter/tweets?tweet_id=${id}`, config)
    .catch(e => ({data : e?.response}));
    return response;
}

async function getRedditData (id, access) {
    let config = {headers: {Authorization : `Bearer ${access}`}}
    let response = await axios.get(`api/post/get/reddit/posts?reddit_id=${id}`, config)
    .catch(e => ({data : e?.response}));
    return response;
}

async function editReddit (id, data, access){
    let config = {headers: {Authorization : `Bearer ${access}`}};
    let response = await axios.put(`api/post/get/reddit/posts?reddit_id=${id}`, data, config)
    .catch(e => ({data : e?.response}));
    return response;
}

async function addTwitterMessage(data, access){
    let config = {headers: {Authorization : `Bearer ${access}`}};
    let response = await axios.post("api/social/save/twitter/message", data, config)
    .catch(e => ({data : e?.response}));
    return response?.data;
}

async function addRedditMessage(data, access){
    let config = {headers: {Authorization : `Bearer ${access}`}};
    let response = await axios.post("api/social/save/reddit/message", data, config)
    .catch(e => ({data : e?.response}));
    return response?.data;
}

export {
    createMedia,
    createTweetData,
    createRedditData,
    getTweetsData,
    getRedditsData,
    deleteTweet,
    deleteReddit,
    getTweetData,
    getRedditData,
    editReddit,
    addTwitterMessage,
    addRedditMessage
}