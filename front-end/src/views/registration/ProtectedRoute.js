import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "views/registration/Auth";
import memoryUtils from "./userInfo/memoryUtil"
import storageUtils from "./userInfo/storageUtils"
import { jsonParse } from "../../variables/util/util"

//const user = jsonParse(storageUtils.getUser())
const user = storageUtils.getUser()
memoryUtils.user = user
console.log("line 10",user)

function ProtectedRoute({isLogin, component: Component, ...rest}){
    return (
        <Route
            {...rest}
            render={(props)=>{
                 if(user.isLogin){
                    return <Component {...props}/>;
                 }
                 else{
                    console.log("line 22",user) 
                    console.log("Fail to login")
                     return <Redirect to={{pathname: "/login", state: {from: props.location}}} />;
                 }
            }}
        />
    );
}
export default ProtectedRoute;