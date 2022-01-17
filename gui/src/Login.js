import React, { useState} from "react";
import { useHistory } from "react-router-dom";

function Login (){
      const [username, setUsername] = useState('')
      const [password, setPassword] = useState('')
      const history = useHistory()

      const insertData= (body)=>{
        return fetch("/login",{
              'method':'POST',
              cache: "no-cache",
              headers : { 
                'Content-Type': 'application/json'
          
          },
          body:JSON.stringify(body)
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



