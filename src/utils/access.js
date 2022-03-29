import jwt_decode from "jwt-decode";
import Local from "./local";
import {refreshAccessToken} from "../server/server"

async function checkRefreshTokenExpire (currentToken) {
    let timeNow = Date.now();
    try {
        let decodeRefresh = jwt_decode(currentToken?.refresh);
        let refreshExp = decodeRefresh?.exp * 1000;
        if( refreshExp < timeNow ){
            Local.logout();
        }
    } catch (e){
        Local.logout();
    }
}

async function checkAccessTokenExpire (currentToken) {
    let timeNow = Date.now();
    try{
        let decodeAccess = jwt_decode(currentToken?.access);
        let accessExp = decodeAccess?.exp * 1000;
        
        if (accessExp < timeNow){
            let response = await refreshAccessToken({refresh : currentToken?.refresh});
            let accessToken = response?.access
            let newToken = {refresh:currentToken?.refresh, access:accessToken}
            Local.setToken(newToken);
            return response;
        }

    } catch (e) {
        Local.logout()
    }
}

export {
    checkRefreshTokenExpire,
    checkAccessTokenExpire
}