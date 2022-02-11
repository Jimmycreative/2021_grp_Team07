import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "views/registration/Auth";


function ProtectedRoute({isLogin, component: Component, ...rest}){
    return (
        <Route
            {...rest}
            render={(props)=>{
                console.log(isLogin)
                 if(Auth.isLogin){
                     console.log("jiji")
                    return <Component {...props}/>;
                 }
                 else{
                     console.log("llll")
                     return <Redirect to={{pathname: "/login", state: {from: props.location}}} />;
                 }
            }}
        />
    );
}
export default ProtectedRoute;