import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "views/registration/Auth";
import memoryUtils from "./userInfo/memoryUtil"
import storageUtils from "./userInfo/storageUtils"

const user = JSON.parse(storageUtils.getUser())
memoryUtils.user = user

function ProtectedRoute({isLogin, component: Component, ...rest}){
    return (
        <Route
            {...rest}
            render={(props)=>{
                 if(user.isLogin){
                    return <Component {...props}/>;
                 }
                 else{
                     console.log("Fail to login")
                     return <Redirect to={{pathname: "/login", state: {from: props.location}}} />;
                 }
            }}
        />
    );
}
export default ProtectedRoute;