import React from "react";
import { 
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
} from "../server/post";

const Post = React.createContext();

const PostProvider = ({children}) => {
    return (
        <Post.Provider value={{
            createMedia, createTweetData, createRedditData,
            getTweetsData, getRedditsData, deleteTweet, deleteReddit,
            getTweetData, getRedditData, editReddit, addTwitterMessage,
            addRedditMessage
        }}>{children}</Post.Provider>
    )
}

export {
    Post,
    PostProvider
}
