import React, { useState} from "react";

import { useHistory } from 'react-router-dom';
import "./LogTemp.css";

function LogTemp (){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory();
  const domain = "http://127.0.0.1:5000"
    
    const insertData= (body)=>{
      return fetch(domain+"/login", {
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
          history.push("/main")
        }
        
      }
    )
    .catch(error => console.log(error))
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(username)
      console.log(password)
      insertData({username,password})
      
      setUsername('')
      setPassword('')
    
    }
    
    return (
      <div className="log-container">
        <form className="form" onSubmit={handleSubmit}>
          
            <label htmlFor="username">USERNAME</label>
            <input type="text" name="username" placeholder="Enter your username:" value={username} onChange={(e)=>setUsername(e.target.value)}/>
       
          
            <label htmlFor="password">PASSWORD</label>
            <input type="password" name="password" placeholder="Enter your password:" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          
            <button type="submit" className="login-btn" >LOGIN </button>
        </form>
        </div>
    );
  }


export default LogTemp;



