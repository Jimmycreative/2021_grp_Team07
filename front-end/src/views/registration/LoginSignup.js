import "./LoginSignup.css";
import {Button} from "reactstrap";
import React, { useState, useEffect } from "react";
import APIService from './ApiService'
import { useHistory } from 'react-router-dom';
// import Registration from "./RegTemp";
// import Login from "./LogTemp";

function LoginSignup() {
    let [click,setClick] =useState(true);
    const handleLogin = () => setClick(true);
    const handleReg = () => setClick(false);

    const history = useHistory();

    // const validateLogin= () => {
    //     fetch("/login",{
    //       headers : { 
            
    //         'Accept': 'application/json'
    //        }
    //     }).then(response=>{
    //         if(response.ok){
    //             return response.json()
    //             }
    //         }
            
    //     ).then(
    //         data=>{
    //             if(data["isLogin"]===1){
    //               console.log(data)
    //               history.push("/Main")
    //             }
                

    //         }
    //     )
    //   };

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitLogin = (e) => {
        e.preventDefault()
        console.log(username)
        console.log(password)
        APIService.InsertData({username,password})
        setUsername('')
        setPassword('')
    }




    return (
    <>
        <div class="hero-background">
        <div className={click ? "login-container" : "signup-container"}>
                    <div className="btn-box">
                        <div className={click ? "btn-login" : "btn-register"}/> 
                        <button className={click? "toggle-btn-light": "toggle-btn-dark"} onClick={handleLogin} >LOG IN</button>
                        <button className={!click? "toggle-btn-light": "toggle-btn-dark"}  onClick={handleReg}> SIGNUP</button>
                    </div>
                {click &&
                    <div className="log-container">
                        <form className="form" onSubmit={submitLogin}>
                            <label htmlFor="username">USERNAME</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username:"
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                            />
                            <label htmlFor="password">PASSWORD</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password:"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            
                            <button type="submit" className="login-btn" >LOGIN </button>
                        </form>
                    </div>}
                
                {!click && <form className="input-group">
                {/* <Registration/> */}
                </form>}
            </div>  
        </div>
        </>
    )
}

export default LoginSignup; 
