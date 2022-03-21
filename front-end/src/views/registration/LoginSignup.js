import "./LoginSignup.css";
import {Button} from "reactstrap";
import React, { useState, useEffect, Redirect } from "react";
import Auth from "./Auth";
import { useHistory } from 'react-router-dom';
import { domain } from "../../global"
import memoryUtils from "./userInfo/memoryUtil"
import storageUtils from "./userInfo/storageUtils"
// import Registration from "./RegTemp";
// import Login from "./LogTemp";

function LoginSignup() {
    let [click,setClick] =useState(false);
    const handleLogin = () => {
        setUsername('')
        setPassword('')
        setClick(true)
    };
    const handleReg = () => {
        setUsername('')
        setPassword('')
        setClick(false)
    };

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
    const [displayname, setDisplayname] = useState('');
    const [password2, setPassword2] = useState('');
    const [token, setToken] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [displaynameError, setDisplaynameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password2Error, setPassword2Error] = useState('');
    const [tokenError, setTokenError] = useState('');

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const submitRegister = e => {
        e.preventDefault();

        let isValid = true;
        let fieldsList = ["username", "displayname", "password", "password2"];

        for (let field in fieldsList) {

            isValid = isField(fieldsList[field]) && isValid;
        }

        if (isValid) {
            setIsSubmitted(true);
            insertData2()
        } else {
            setIsSubmitted(false);
        }

        return isSubmitted;
    };

    const insertData= (body)=>{
        console.log(body)
        var mydata={
            //planner

            username:"fyyc",
            password:"123456"

            //manager
            // username:"sheldon",
            // password:"imthequeen"
            // username:username,
            // password:password

        }
        fetch(domain+"/login", {
          body: JSON.stringify(mydata),
          credentials:"include",
          headers: new Headers({
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': true,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, HEAD,PUT"
            }),
            
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // *client, no-referrer
        })
        .then(response=>{
      
        if(response.ok){
            
          return response.json()
          }
        }
        
      ).then(
        data=>{
          if(data["code"]===1){
            console.log(data)
            
            Auth.login()
            console.log(Auth.isLogin)
            const user = data.data
            memoryUtils.user = user
            storageUtils.saveUser(user)
            console.log("line 122",user)
            history.push("/admin/dashboard")
          }
          
        }
      )
    }
    const insertData2= (body)=>{
        fetch(domain+"/registration", {
          body: JSON.stringify(body),
          cache: 'no-cache',
          headers: new Headers({
              'Content-Type': 'application/json'
            }),
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // *client, no-referrer
        })
      .then(response=>{
        if(response.ok){
          return response.json()
          }
        }
        
      ).then(
        data=>{
          if(data["code"]===1){
            console.log(data)
            
            history.push("/login")
            
          }
          
        }
      )
    }
    const isField = (field) => {

        let isValid = false;

        switch (field) {
            case "username":
                isValid = usernameValidation();
                break;
            case "displayname":
                isValid = displaynameValidation();
                break;
            case "password":
                isValid = passwordValidation();
                break;
            case "password2":
                isValid = matchPassword();
                break;
            default:
        }

        return isValid;
    }



    const usernameValidation = () => {

        setUsername(username.toLowerCase());

        const usernameRegex = /^[A-Za-z][\w]{2,14}[A-Za-z0-9]$/;
        if (username.trim() === "") {
            setUsernameError('Username required!');
            return false
        } else if (!usernameRegex.test(username)) {
            setUsernameError("Username must be 4-16 characters with no space and special character!");
            return false
        }

        setUsernameError('');
        return true;
    }


    const displaynameValidation = () => {

        const replaceSpaces = displayname.replace(/\s+(?=\s)/g, '').trim();
        setDisplayname(replaceSpaces);

        if (displayname === "") {
            setDisplayname(username);
            return true;
        } else if (displayname.length > 64) {
            setDisplayname(displayname.substring(0, 64) && replaceSpaces);
        }

        setDisplaynameError('');
        return true;
    }


    const passwordValidation = () => {

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/;
        if (password.trim() === "") {
            setPasswordError("Password required!");
            return false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError("Password needs to be 8-30 characters including at least 1 digit, 1 upper and 1 lowercase!");
            return false;
        }

        setPasswordError("");
        return true;
    }

    const matchPassword = () => {

        if (password2.trim() === "") {
            setPassword2Error("Confirm Password required!");
            return false;
        } else if (password !== password2) {
            setPassword2Error("Passwords do not match!");
            return false
        }

        setPassword2Error("");
        return true;
    }

    const submitLogin = (e) => {
        e.preventDefault()
        console.log(username)
        console.log(password)
        var mydata={
            username:username,
            password:password
        }
        insertData(mydata)
        setUsername('')
        setPassword('')
    }




    return (
    <>
        <div class="hero-background">
        <div className={click ? "login-container" : "signup-container"}>
                    <div className="btn-box">
                        <div className={click ? "btn-login" : "btn-register"}/> 
                        <button className={click? "toggle-btn-light": "toggle-btn-dark"} onClick={handleLogin}>LOG IN</button>
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
                
                {!click &&
                    <div className="registration">
                        <br />
                        <br />
                        {isSubmitted?
                            <div style={{ textAlign: "center" }} className="complete">
                                <h1>Complete registration!</h1>
                                <div>Username is {username}</div>
                                <div>Displayname is {displayname}</div>
                            </div>
                            :
                            <div className="registration-form" style={{ textAlign: "center" }}>
                                <div className="container">
                                <form onSubmit={submitRegister} >
                                    <div style={{ marginTop: "80px" }}>
                                    <h5> CREATE ACCOUNT</h5>
                                    <h6>Enter every field to join us</h6>
                                    </div>
                                
                                <div className="detail-container">
                                <div className={!tokenError ? "input-box": "no-margin"}>
                                        <input
                                            type="text"
                                            placeholder="Token"
                                            name="token"
                                            value={token}
                                            onChange={(e) => setToken(e.target.value)}
                                        />
                                        {tokenError && (<div className="error">{tokenError}</div>)}
                                    </div>
                                    <div className={!usernameError ? "input-box": "no-margin"}>
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            name="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        {usernameError && (<div className="error">{usernameError}</div>)}
                                    </div>

                                    <div className={!displaynameError ? "input-box":"no-margin"}>
                                        <input
                                            type="text"
                                            placeholder="Displayname"
                                            name="displayname"
                                            value={displayname}
                                            onChange={(e) => setDisplayname(e.target.value)}
                                        />
                                        {displaynameError && (<div className="error">{displaynameError}</div>)}
                                    </div>

                                    <div className={!passwordError ? "input-box":"no-margin"}>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {passwordError && (<div className="error">{passwordError}</div>)}
                                    </div>
                                    
                                    <div className={!password2Error ? "input-box":"no-margin"}>
                                        <input
                                            type="password"
                                            placeholder="Confirm password"
                                            name="password2"
                                            value={password2}
                                            onChange={(e) => setPassword2(e.target.value)}
                                        />
                                        {password2Error && (<div className="error">{password2Error}</div>)}
                                    </div>
                                </div>
                                
                                    <button className={password2Error? "submit-btn-noMargin" : "submit-btn"} type="submit" >Register</button>
                                </form>
                                </div>
                            </div>}
                        </div>}
                    </div>
                </div>
            </>
        )
    }


export default LoginSignup; 
