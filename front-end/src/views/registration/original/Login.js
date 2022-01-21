import React, { useState, useEffect } from "react";
import APIService from '../ApiService'
import { useHistory } from 'react-router-dom';

function Login (){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory();
    
      useEffect(() => {
        fetch("/login",{
          headers : { 
            
            'Accept': 'application/json'
           }
        }).then(response=>{
            if(response.ok){
                return response.json()
                }
            }
            
        ).then(
            data=>{
                if(data["isLogin"]===1){
                  console.log(data)
                  history.push("/Main")
                }
                

            }
        )
      });
      const handleSubmit = (e) => {
        e.preventDefault()
        console.log(username)
        console.log(password)
        APIService.InsertData({username,password})
        
        setUsername('')
        setPassword('')
       

      }
    
    return (
      <div>
        
        <form className="form" onSubmit={handleSubmit}>
          
            <label htmlFor="username">UserName</label>
            <input type="text" name="username" placeholder="Enter your username:" value={username} onChange={(e)=>setUsername(e.target.value)}/>
       
          
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Enter your password:" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          
            <button type="submit" >Login</button>
        </form>


      </div>
    );
  }


export default Login;



