import "./LoginSignup.css";
import {Button} from "reactstrap";
import {useState} from "react"; 
import Registration from "./RegTemp";
import Login from "./LogTemp";

function LoginSignup() {

let [click,setClick] =useState(true);
const handleLogin = () => setClick(true);
const handleReg = () => setClick(false);
let [userName,setUserName] =useState('');




    return (
    <>
        <div class="hero-background">
        <div className={click ? "login-container" : "signup-container"}>
                    <div className="btn-box">
                        <div className={click ? "btn-login" : "btn-register"}/> 
                        <button className={click? "toggle-btn-light": "toggle-btn-dark"} onClick={handleLogin} >LOG IN</button>
                        <button className={!click? "toggle-btn-light": "toggle-btn-dark"}  onClick={handleReg}> SIGNUP</button>
                    </div>
                {click && <form className="input-group">
                <Login />
                </form>}
                {!click && <form className="input-group">
                <Registration/>
                </form>}
            </div>  
        </div>
        </>
    )
}

export default LoginSignup; 
