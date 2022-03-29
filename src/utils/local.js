

const Local = {
    setToken : (tokens, local=true) => {
        tokens = JSON.stringify(tokens || {})
        local ? localStorage.setItem("tokens", tokens) : 
            sessionStorage.setItem("tokens", tokens);
    },
    getToken : () => {
        let tokens = localStorage.getItem("tokens") ||
            sessionStorage.getItem("tokens");
        tokens = JSON.parse(tokens);
        return tokens;
    },
    removeToken : () => {
        localStorage.removeItem("tokens") || 
            sessionStorage.removeItem("tokens");
    },
    logout : () => {
        Local.removeToken();
    }
}

export default Local;