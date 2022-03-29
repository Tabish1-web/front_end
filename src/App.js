import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Container from "./components/Container";
import Login from "./components/Login/login";
import NewPassword from "./components/Login/newpassword";
import Register from "./components/Login/register";
import PasswordReset from "./components/Login/reset";
import Terms from "./components/Login/terms";

import { ContextProvider } from "./context/context";
import { PostProvider } from "./context/post";

import { ReactNotifications } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css';

function App() {
  return (
    <>
    <ReactNotifications/>
    <ContextProvider>
    <PostProvider>
        <Router>
            <Switch>
                <Route exact path={"/login"} component={Login}/>
                <Route exact path={"/register"} component={Register}/>
                <Route exact path={"/reset"} component={PasswordReset}/>
                <Route exact path={"/set-password"} component={NewPassword}/>
                <Route exact path={"/terms"} component={Terms}/>
                <Route component={Container}/>
            </Switch>
        </Router>
    </PostProvider>
    </ContextProvider>
    </>
  );
}

export default App;